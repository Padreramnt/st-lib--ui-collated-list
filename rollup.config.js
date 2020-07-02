const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve').default
const { terser } = require('rollup-plugin-terser')

function makeDist(input, file, name, min = false) {
	return {
		input,
		output: {
			file,
			format: 'iife',
			name,
		},
		plugins: [
			commonjs(),
			resolve(),
			min ? terser({
				mangle: {
					keep_classnames: true,
				}
			}) : null
		],
	}
}

module.exports = [
	makeDist('lib/dist.js', 'dist/index.js', 'UICollatedListElement'),
	makeDist('lib/dist.js', 'dist/index.min.js', 'UICollatedListElement', true),
	makeDist('lib/dist.dl.js', 'dist/dl.js', 'UICollatedDListElement'),
	makeDist('lib/dist.dl.js', 'dist/dl.min.js', 'UICollatedDListElement', true),
	makeDist('lib/dist.ol.js', 'dist/ol.js', 'UICollatedOListElement'),
	makeDist('lib/dist.ol.js', 'dist/ol.min.js', 'UICollatedOListElement', true),
	makeDist('lib/dist.ul.js', 'dist/ul.js', 'UICollatedUListElement'),
	makeDist('lib/dist.ul.js', 'dist/ul.min.js', 'UICollatedUListElement', true),
]
