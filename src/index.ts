import { createProperty } from '@st-lib/private'

enum attr {
	localeMatcher = 'localeMatcher',
	sensitivity = 'sensitivity',
	ignorePunctuation = 'ignorePunctuation',
	numeric = 'numeric',
	caseFirst = 'caseFirst',
}

enum childAttr {
	dataUiCollatedListitem = 'data-ui-collated-listitem',
	dataUiCollatedListitemindex = 'data-ui-collated-listitemindex',
}

const observedChildAttrs = Object.values(childAttr).map(toLowerCase)

function getLocales(root: Element & { lang: string }): string | string[] {
	if (root.lang) return root.lang
	if (root.parentElement) return getLocales(root.parentElement)
	return window.navigator.languages as string[]
}

const localeMatcherAttr = createEnumAttr(attr.localeMatcher, ['lookup', 'best fit'])
const sensitivityAttr = createEnumAttr(attr.sensitivity, ['base', 'accent', 'case', 'variant'])
const ignorePunctuationAttr = createBooleanAttr(attr.ignorePunctuation)
const numericAttr = createBooleanAttr(attr.numeric)
const caseFirstAttr = createEnumAttr(attr.caseFirst, ['upper', 'lower', 'false'])

const dataCollatorGroupAttr = createStringAttr(childAttr.dataUiCollatedListitem)

function getNumberAttr<F>(target: Element, name: string, fallback: F) {
	const value = target.getAttribute(name)
	if (null == value) return fallback
	const out = +value
	return isNaN(out) ? fallback : out
}

const styleContent = `
:host {
	display: block;
	min-width: 0;
	min-height: 0;
	width: 100%;
	height: auto;
}
`

function toLowerCase(inp: string | String) {
	return inp.toLowerCase()
}
function createBooleanAttr(name: string, falseValues: readonly string[] | null = null) {
	const caseInsensitiveFalseValues = null != falseValues ? falseValues.map(toLowerCase) : null
	return {
		get(target: Element, fallback: boolean = false) {
			const value = target.getAttribute(name)
			return null == value ? fallback : null == caseInsensitiveFalseValues || !caseInsensitiveFalseValues.includes(value.trim().toLowerCase())
		},
		set(target: Element, force: any) {
			target.toggleAttribute(name, force)
		}
	}
}
function createEnumAttr<T extends string>(name: string, values: readonly T[]): { get<F>(target: Element, fallback: F): T | F, set(target: Element, value: any): void } {
	const caseInsensitiveValues = values.map(toLowerCase)
	return {
		get<F>(target: Element, fallback: F): F | T {
			const value = target.getAttribute(name)
			if (null == value) return fallback
			const index = caseInsensitiveValues.indexOf(value.trim().toLowerCase())
			return ~index ? values[index] : fallback
		},
		set(target: Element, value: any) {
			if (typeof value === 'undefined') return
			if (null == value) target.removeAttribute(name)
			else target.setAttribute(name, value)
		}
	}
}

function createStringAttr<T = string>(name: string, format?: (input: string) => T) {
	return {
		get<F>(target: Element, fallback: F) {
			const value = target.getAttribute(name)
			if (null == value) return fallback
			if (typeof format === 'function') return format(value)
			return value
		},
		set(target: Element, value: any) {
			if (typeof value === 'undefined') return
			if (null == value) target.removeAttribute(name)
			else target.setAttribute(name, value)
		}
	}
}

function getOptions(inp: Record<any, any>) {
	const o: Record<any, any> = {}
	// avoid property getter recalculation
	const {
		localeMatcher,
		sensitivity,
		ignorePunctuation,
		numeric,
		caseFirst,
	} = inp
	if (null != localeMatcher) o.localeMatcher = localeMatcher
	if (null != sensitivity) o.sensitivity = sensitivity
	if (null != ignorePunctuation) o.ignorePunctuation = ignorePunctuation
	if (null != numeric) o.numeric = numeric
	if (null != caseFirst) o.caseFirst = caseFirst
	return o
}

function update(target: Element & { lang: string }) {

	const locales = getLocales(target)
	const options = getOptions(target)
	const hashCode = JSON.stringify([locales, options])
	let collator: Intl.Collator
	if (hashCode in collatorsRec) {
		collator = collatorsRec[hashCode]
	} else {
		collator = new Intl.Collator(locales, options)
		collatorsRec[hashCode] = collator
	}
	const collatorGroupsRec: Record<string, Element[]> = {}
	const collatorTextsRec: Record<string, string> = {}
	const elementIndexesMap = new WeakMap<Element, number>()
	for (let i = 0; i < target.children.length; i++) {
		const child = target.children[i]
		const dataCollatorGroup = dataCollatorGroupAttr.get(child, null)
		const groupId = null == dataCollatorGroup ? i : '_' + dataCollatorGroup
		const textContent = null == child.textContent ? '' : child.textContent
		elementIndexesMap.set(child, getNumberAttr(child, childAttr.dataUiCollatedListitemindex, i + 1))
		if (groupId in collatorGroupsRec) {
			collatorGroupsRec[groupId].push(child)
		} else {
			collatorGroupsRec[groupId] = [child]
		}
		if (groupId in collatorTextsRec) {
			collatorTextsRec[groupId] += textContent
		} else {
			collatorTextsRec[groupId] = textContent
		}
	}
	const orderedGroupIds = Object.keys(collatorGroupsRec).sort((a, b) => collator.compare(collatorTextsRec[a], collatorTextsRec[b]))
	let orderId = 0
	for (let i = 0; i < orderedGroupIds.length; i++) {
		const groupId = orderedGroupIds[i]
		for (const element of collatorGroupsRec[groupId].sort((a, b) => elementIndexesMap.get(a)! - elementIndexesMap.get(b)!)) {
			if (element !== element.children[orderId]) {
				target.insertBefore(element, element.children[orderId])
			}
			orderId++
		}
	}
}

const observedAttributes = Object.values(attr).map(toLowerCase).concat('lang')
const collatorsRec: Record<string, Intl.Collator> = {}

const [getChildrenObserver, setChildrenObserver] = createProperty<MutationObserver>()

const childrenObserverOptions = {
	childList: true,
	subtree: true,
	characterData: true,
	attributes: true,
	attributeFilter: observedChildAttrs,
}

export class UICollatedListElement extends HTMLElement {
	static get observedAttributes() {
		return observedAttributes.slice()
	}

	constructor() {
		super()
		const style = document.createElement('style')
		style.innerHTML = styleContent
		const slot = document.createElement('slot')
		const shadowRoot = this.attachShadow({ mode: 'closed' })
		shadowRoot.append(
			style,
			slot,
		)

		const childrenObserver = new MutationObserver(() => {
			childrenObserver.disconnect()
			update(this)
			childrenObserver.observe(this, childrenObserverOptions)
		})
		setChildrenObserver(this, childrenObserver)
	}

	get localeMatcher() {
		return localeMatcherAttr.get(this, null)
	}
	set localeMatcher(inp) {
		localeMatcherAttr.set(this, inp)
	}
	get sensitivity() {
		return sensitivityAttr.get(this, null)
	}
	set sensitivity(inp) {
		sensitivityAttr.set(this, inp)
	}
	get ignorePunctuation() {
		return ignorePunctuationAttr.get(this)
	}
	set ignorePunctuation(inp) {
		ignorePunctuationAttr.set(this, inp)
	}
	get numeric() {
		return numericAttr.get(this)
	}
	set numeric(inp) {
		numericAttr.set(this, inp)
	}
	get caseFirst() {
		return caseFirstAttr.get(this, null)
	}
	set caseFirst(inp) {
		caseFirstAttr.set(this, inp)
	}

	attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
		name = name.toLowerCase()
		if (observedAttributes.includes(name) && oldValue !== newValue) update(this)
	}

	connectedCallback() {
		update(this)
		getChildrenObserver(this).observe(this, childrenObserverOptions)
	}

	disconnectedCallback() {
		getChildrenObserver(this).disconnect()
	}
}

export class UICollatedOListElement extends HTMLOListElement {

	static get observedAttributes() {
		return observedAttributes.slice()
	}

	constructor() {
		super()

		const childrenObserver = new MutationObserver(() => {
			childrenObserver.disconnect()
			update(this)
			childrenObserver.observe(this, childrenObserverOptions)
		})
		setChildrenObserver(this, childrenObserver)
	}

	get localeMatcher() {
		return localeMatcherAttr.get(this, null)
	}
	set localeMatcher(inp) {
		localeMatcherAttr.set(this, inp)
	}
	get sensitivity() {
		return sensitivityAttr.get(this, null)
	}
	set sensitivity(inp) {
		sensitivityAttr.set(this, inp)
	}
	get ignorePunctuation() {
		return ignorePunctuationAttr.get(this)
	}
	set ignorePunctuation(inp) {
		ignorePunctuationAttr.set(this, inp)
	}
	get numeric() {
		return numericAttr.get(this)
	}
	set numeric(inp) {
		numericAttr.set(this, inp)
	}
	get caseFirst() {
		return caseFirstAttr.get(this, null)
	}
	set caseFirst(inp) {
		caseFirstAttr.set(this, inp)
	}

	attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
		name = name.toLowerCase()
		if (observedAttributes.includes(name) && oldValue !== newValue) update(this)
	}

	connectedCallback() {
		update(this)
		getChildrenObserver(this).observe(this, childrenObserverOptions)
	}

	disconnectedCallback() {
		getChildrenObserver(this).disconnect()
	}
}



export class UICollatedUListElement extends HTMLUListElement {

	static get observedAttributes() {
		return observedAttributes.slice()
	}

	constructor() {
		super()

		const childrenObserver = new MutationObserver(() => {
			childrenObserver.disconnect()
			update(this)
			childrenObserver.observe(this, childrenObserverOptions)
		})
		setChildrenObserver(this, childrenObserver)
	}

	get localeMatcher() {
		return localeMatcherAttr.get(this, null)
	}
	set localeMatcher(inp) {
		localeMatcherAttr.set(this, inp)
	}
	get sensitivity() {
		return sensitivityAttr.get(this, null)
	}
	set sensitivity(inp) {
		sensitivityAttr.set(this, inp)
	}
	get ignorePunctuation() {
		return ignorePunctuationAttr.get(this)
	}
	set ignorePunctuation(inp) {
		ignorePunctuationAttr.set(this, inp)
	}
	get numeric() {
		return numericAttr.get(this)
	}
	set numeric(inp) {
		numericAttr.set(this, inp)
	}
	get caseFirst() {
		return caseFirstAttr.get(this, null)
	}
	set caseFirst(inp) {
		caseFirstAttr.set(this, inp)
	}

	attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
		name = name.toLowerCase()
		if (observedAttributes.includes(name) && oldValue !== newValue) update(this)
	}

	connectedCallback() {
		update(this)
		getChildrenObserver(this).observe(this, childrenObserverOptions)
	}

	disconnectedCallback() {
		getChildrenObserver(this).disconnect()
	}
}



export class UICollatedDListElement extends HTMLDListElement {

	static get observedAttributes() {
		return observedAttributes.slice()
	}

	constructor() {
		super()
		const childrenObserver = new MutationObserver(() => {
			childrenObserver.disconnect()
			update(this)
			childrenObserver.observe(this, childrenObserverOptions)
		})
		setChildrenObserver(this, childrenObserver)
	}

	get localeMatcher() {
		return localeMatcherAttr.get(this, null)
	}
	set localeMatcher(inp) {
		localeMatcherAttr.set(this, inp)
	}
	get sensitivity() {
		return sensitivityAttr.get(this, null)
	}
	set sensitivity(inp) {
		sensitivityAttr.set(this, inp)
	}
	get ignorePunctuation() {
		return ignorePunctuationAttr.get(this)
	}
	set ignorePunctuation(inp) {
		ignorePunctuationAttr.set(this, inp)
	}
	get numeric() {
		return numericAttr.get(this)
	}
	set numeric(inp) {
		numericAttr.set(this, inp)
	}
	get caseFirst() {
		return caseFirstAttr.get(this, null)
	}
	set caseFirst(inp) {
		caseFirstAttr.set(this, inp)
	}

	attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
		name = name.toLowerCase()
		if (observedAttributes.includes(name) && oldValue !== newValue) update(this)
	}

	connectedCallback() {
		update(this)
		getChildrenObserver(this).observe(this, childrenObserverOptions)
	}

	disconnectedCallback() {
		getChildrenObserver(this).disconnect()
	}
}



export default UICollatedListElement
