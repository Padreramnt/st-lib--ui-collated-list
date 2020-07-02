# Custom element for language sensitive ordering child elements.

See [Intl.Collator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator).

> Note: the item will manipulate DOM directly. Do not use with React / Angular / Vue / anything else.

```ts
// client.js
import UICollatedListElement, {
	UICollatedUListElement,
	UICollatedOListElement,
	UICollatedDListElement,
} from '@st-lib/ui-collated-list-element'

window.customElements.define('ui-collated-list', UICollatedListElement)
window.customElements.define('ui-collated-ulist', UICollatedUListElement, {
	extends: 'ul',
})
window.customElements.define('ui-collated-olist', UICollatedOListElement, {
	extends: 'ol',
})
window.customElements.define('ui-collated-dlist', UICollatedDListElement, {
	extends: 'dl',
})
```

CDN links:
* `https://unpkg.com/@st-lib/ui-collated-list-element/dist/index.js`
	```html
	<script crossorigin src='https://unpkg.com/@st-lib/ui-collated-list-element/dist/index.js'></script>
	```
* `https://unpkg.com/@st-lib/ui-collated-list-element/dist/index.min.js`
	```html
	<script crossorigin src='https://unpkg.com/@st-lib/ui-collated-list-element/dist/index.min.js'></script>
	```
* `https://unpkg.com/@st-lib/ui-collated-list-element/dist/ul.js`
	```html
	<script crossorigin src='https://unpkg.com/@st-lib/ui-collated-list-element/dist/ul.js'></script>
	```
* `https://unpkg.com/@st-lib/ui-collated-list-element/dist/ul.min.js`
	```html
	<script crossorigin src='https://unpkg.com/@st-lib/ui-collated-list-element/dist/ul.min.js'></script>
	```
* `https://unpkg.com/@st-lib/ui-collated-list-element/dist/ol.js`
	```html
	<script crossorigin src='https://unpkg.com/@st-lib/ui-collated-list-element/dist/ol.js'></script>
	```
* `https://unpkg.com/@st-lib/ui-collated-list-element/dist/ol.min.js`
	```html
	<script crossorigin src='https://unpkg.com/@st-lib/ui-collated-list-element/dist/ol.min.js'></script>
	```
* `https://unpkg.com/@st-lib/ui-collated-list-element/dist/dl.js`
	```html
	<script crossorigin src='https://unpkg.com/@st-lib/ui-collated-list-element/dist/dl.js'></script>
	```
* `https://unpkg.com/@st-lib/ui-collated-list-element/dist/dl.min.js`
	```html
	<script crossorigin src='https://unpkg.com/@st-lib/ui-collated-list-element/dist/dl.min.js'></script>
	```


```html
<ui-collated-list role='list'>
	<div role='listitem'>q<!-- 27 --></div>
	<div role='listitem'>w<!-- 33 --></div>
	<div role='listitem'>e<!-- 15 --></div>
	<div role='listitem'>r<!-- 28 --></div>
	<div role='listitem'>t<!-- 30 --></div>
	<div role='listitem'>y<!-- 35 --></div>
	<div role='listitem'>u<!-- 31 --></div>
	<div role='listitem'>i<!-- 19 --></div>
	<div role='listitem'>o<!-- 25 --></div>
	<div role='listitem'>p<!-- 26 --></div>
	<div role='listitem'>a<!-- 11 --></div>
	<div role='listitem'>s<!-- 29 --></div>
	<div role='listitem'>d<!-- 14 --></div>
	<div role='listitem'>f<!-- 16 --></div>
	<div role='listitem'>g<!-- 17 --></div>
	<div role='listitem'>h<!-- 18 --></div>
	<div role='listitem'>j<!-- 20 --></div>
	<div role='listitem'>k<!-- 21 --></div>
	<div role='listitem'>l<!-- 22 --></div>
	<div role='listitem'>z<!-- 36 --></div>
	<div role='listitem'>x<!-- 34 --></div>
	<div role='listitem'>c<!-- 13 --></div>
	<div role='listitem'>v<!-- 32 --></div>
	<div role='listitem'>b<!-- 12 --></div>
	<div role='listitem'>n<!-- 24 --></div>
	<div role='listitem'>m<!-- 23 --></div>
	<div role='listitem'>1<!-- 2 --></div>
	<div role='listitem'>2<!-- 3 --></div>
	<div role='listitem'>3<!-- 4 --></div>
	<div role='listitem'>4<!-- 5 --></div>
	<div role='listitem'>5<!-- 6 --></div>
	<div role='listitem'>6<!-- 7 --></div>
	<div role='listitem'>7<!-- 8 --></div>
	<div role='listitem'>8<!-- 9 --></div>
	<div role='listitem'>9<!-- 10 --></div>
	<div role='listitem'>0<!-- 1 --></div>
</ui-collated-list>
```

### Customized builtin element usage:

#### `ul`

```html
<ul is='ui-collated-ulist'>
	<li role='listitem'>q<!-- 27 --></li>
	<li role='listitem'>w<!-- 33 --></li>
	<li role='listitem'>e<!-- 15 --></li>
	<li role='listitem'>r<!-- 28 --></li>
	<li role='listitem'>t<!-- 30 --></li>
	<li role='listitem'>y<!-- 35 --></li>
	<li role='listitem'>u<!-- 31 --></li>
	<li role='listitem'>i<!-- 19 --></li>
	<li role='listitem'>o<!-- 25 --></li>
	<li role='listitem'>p<!-- 26 --></li>
	<li role='listitem'>a<!-- 11 --></li>
	<li role='listitem'>s<!-- 29 --></li>
	<li role='listitem'>d<!-- 14 --></li>
	<li role='listitem'>f<!-- 16 --></li>
	<li role='listitem'>g<!-- 17 --></li>
	<li role='listitem'>h<!-- 18 --></li>
	<li role='listitem'>j<!-- 20 --></li>
	<li role='listitem'>k<!-- 21 --></li>
	<li role='listitem'>l<!-- 22 --></li>
	<li role='listitem'>z<!-- 36 --></li>
	<li role='listitem'>x<!-- 34 --></li>
	<li role='listitem'>c<!-- 13 --></li>
	<li role='listitem'>v<!-- 32 --></li>
	<li role='listitem'>b<!-- 12 --></li>
	<li role='listitem'>n<!-- 24 --></li>
	<li role='listitem'>m<!-- 23 --></li>
	<li role='listitem'>1<!-- 2 --></li>
	<li role='listitem'>2<!-- 3 --></li>
	<li role='listitem'>3<!-- 4 --></li>
	<li role='listitem'>4<!-- 5 --></li>
	<li role='listitem'>5<!-- 6 --></li>
	<li role='listitem'>6<!-- 7 --></li>
	<li role='listitem'>7<!-- 8 --></li>
	<li role='listitem'>8<!-- 9 --></li>
	<li role='listitem'>9<!-- 10 --></li>
	<li role='listitem'>0<!-- 1 --></li>
</ul>
```

#### `ol`

```html
<ol is='ui-collated-olist'>
	<li role='listitem'>q<!-- 27 --></li>
	<li role='listitem'>w<!-- 33 --></li>
	<li role='listitem'>e<!-- 15 --></li>
	<li role='listitem'>r<!-- 28 --></li>
	<li role='listitem'>t<!-- 30 --></li>
	<li role='listitem'>y<!-- 35 --></li>
	<li role='listitem'>u<!-- 31 --></li>
	<li role='listitem'>i<!-- 19 --></li>
	<li role='listitem'>o<!-- 25 --></li>
	<li role='listitem'>p<!-- 26 --></li>
	<li role='listitem'>a<!-- 11 --></li>
	<li role='listitem'>s<!-- 29 --></li>
	<li role='listitem'>d<!-- 14 --></li>
	<li role='listitem'>f<!-- 16 --></li>
	<li role='listitem'>g<!-- 17 --></li>
	<li role='listitem'>h<!-- 18 --></li>
	<li role='listitem'>j<!-- 20 --></li>
	<li role='listitem'>k<!-- 21 --></li>
	<li role='listitem'>l<!-- 22 --></li>
	<li role='listitem'>z<!-- 36 --></li>
	<li role='listitem'>x<!-- 34 --></li>
	<li role='listitem'>c<!-- 13 --></li>
	<li role='listitem'>v<!-- 32 --></li>
	<li role='listitem'>b<!-- 12 --></li>
	<li role='listitem'>n<!-- 24 --></li>
	<li role='listitem'>m<!-- 23 --></li>
	<li role='listitem'>1<!-- 2 --></li>
	<li role='listitem'>2<!-- 3 --></li>
	<li role='listitem'>3<!-- 4 --></li>
	<li role='listitem'>4<!-- 5 --></li>
	<li role='listitem'>5<!-- 6 --></li>
	<li role='listitem'>6<!-- 7 --></li>
	<li role='listitem'>7<!-- 8 --></li>
	<li role='listitem'>8<!-- 9 --></li>
	<li role='listitem'>9<!-- 10 --></li>
	<li role='listitem'>0<!-- 1 --></li>
</ol>
```

#### `dl`

Use the `data-ui-collated-listitem` attribute to combine multiple children into one group.

Use the `data-ui-collated-listitemindex` attribute to specify the order of elements in a group.

```html
<dl is='ui-collated-dlist'>
	<dt data-ui-collated-listitem='1'>1<!-- 1 --></dt>
	<dd data-ui-collated-listitem='1'>one<!-- 2 --></dd>
	<dt data-ui-collated-listitem='3'>3<!-- 5 --></dt>
	<dd data-ui-collated-listitem='3'>three<!-- 6 --></dd>
	<dt data-ui-collated-listitem='cake' data-ui-collated-listitemindex='2'>the order is (2)<!-- 8 --></dt>
	<dt data-ui-collated-listitem='cake' data-ui-collated-listitemindex='1'>the order is (1)<!-- 7 --></dt>
	<dt data-ui-collated-listitem='cake' data-ui-collated-listitemindex='4'>the order is (4)<!-- 10 --></dt>
	<dt data-ui-collated-listitem='cake' data-ui-collated-listitemindex='3'>the order is (3)<!-- 9 --></dt>
	<dd data-ui-collated-listitem='cake'>lie<!-- 11 --></dd>
	<dt data-ui-collated-listitem='2'>2<!-- 3 --></dt>
	<dd data-ui-collated-listitem='2'>two<!-- 4 --></dd>
</dl>
```
