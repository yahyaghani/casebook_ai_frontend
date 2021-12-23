'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _core = require('@emotion/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return 'You have tried to stringify object returned from `css` function. It isn\'t supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).'; }

var _ref = process.env.NODE_ENV === 'production' ? {
	name: 'uhkwkp-MuteSvg',
	styles: '#el_X81iT9kZYo{stroke:none;stroke-width:1;fill:none;}#el_gMpyalCphp{-webkit-transform:translate(163px,131px);transform:translate(163px,131px);}#el_c7H-3u-D4l{fill:#d8d8d8;}#el_qhFcdAAFwo{fill:#d8d8d8;}#el_M8X8g37WOI{stroke:#e83137;stroke-width:21;};label:MuteSvg;'
} : {
	name: 'uhkwkp-MuteSvg',
	styles: '#el_X81iT9kZYo{stroke:none;stroke-width:1;fill:none;}#el_gMpyalCphp{-webkit-transform:translate(163px,131px);transform:translate(163px,131px);}#el_c7H-3u-D4l{fill:#d8d8d8;}#el_qhFcdAAFwo{fill:#d8d8d8;}#el_M8X8g37WOI{stroke:#e83137;stroke-width:21;};label:MuteSvg;',
	map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NoYXJlZC9NdXRlU3ZnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1jIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NoYXJlZC9NdXRlU3ZnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEdsb2JhbCwgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5cbmNvbnN0IE11dGVTdmcgPSBwcm9wcyA9PiAoXG5cdDxSZWFjdC5GcmFnbWVudD5cblx0XHQ8R2xvYmFsXG5cdFx0XHRzdHlsZXM9e2Nzc2Bcblx0XHRcdFx0I2VsX1g4MWlUOWtaWW8ge1xuXHRcdFx0XHRcdHN0cm9rZTogbm9uZTtcblx0XHRcdFx0XHRzdHJva2Utd2lkdGg6IDE7XG5cdFx0XHRcdFx0ZmlsbDogbm9uZTtcblx0XHRcdFx0fVxuXHRcdFx0XHQjZWxfZ01weWFsQ3BocCB7XG5cdFx0XHRcdFx0LXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgxNjNweCwgMTMxcHgpO1xuXHRcdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKDE2M3B4LCAxMzFweCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0I2VsX2M3SC0zdS1ENGwge1xuXHRcdFx0XHRcdGZpbGw6ICNkOGQ4ZDg7XG5cdFx0XHRcdH1cblx0XHRcdFx0I2VsX3FoRmNkQUFGd28ge1xuXHRcdFx0XHRcdGZpbGw6ICNkOGQ4ZDg7XG5cdFx0XHRcdH1cblx0XHRcdFx0I2VsX004WDhnMzdXT0kge1xuXHRcdFx0XHRcdHN0cm9rZTogI2U4MzEzNztcblx0XHRcdFx0XHRzdHJva2Utd2lkdGg6IDIxO1xuXHRcdFx0XHR9XG5cdFx0XHRgfVxuXHRcdC8+XG5cdFx0PHN2Z1xuXHRcdFx0dmlld0JveD1cIjAgMCA0ODAgNDgwXCJcblx0XHRcdHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuXHRcdFx0aWQ9XCJlbF9EMXJFcEgyempcIlxuXHRcdFx0d2lkdGg9ezI4fVxuXHRcdFx0aGVpZ2h0PXsyOH1cblx0XHRcdHsuLi5wcm9wc31cblx0XHRcdHN0eWxlPXt7IHRyYW5zZm9ybTogJ3NjYWxlKDEuNSknIH19XG5cdFx0PlxuXHRcdFx0PGcgaWQ9XCJlbF9YODFpVDlrWllvXCIgZmlsbFJ1bGU9XCJldmVub2RkXCI+XG5cdFx0XHRcdDxnIGlkPVwiZWxfZ01weWFsQ3BocFwiPlxuXHRcdFx0XHRcdDxwYXRoXG5cdFx0XHRcdFx0XHRkPVwiTTE0Mi43MzEyMDQsMTExIEMxMzcuMjgwNDI3LDExMSAxMzIuNzE5NTczLDExNC44NTIgMTMxLjgyOTY1LDEyMC4wOTUgQzEyNy4yNjg3OTYsMTQ1LjI0IDEwNC40NjQ1MjYsMTY0LjUgNzYuOTg4MTYxMSwxNjQuNSBDNDkuNTExNzk2NSwxNjQuNSAyNi43MDc1MjYzLDE0NS4yNCAyMi4xNDY2NzIzLDEyMC4wOTUgQzIxLjI1Njc0OTYsMTE0Ljg1MiAxNi42OTU4OTU1LDExMSAxMS4yNDUxMTg3LDExMSBDNC40NTk0NTc4NCwxMTEgLTAuODgwMDc4NTk0LDExNi43NzggMC4xMjEwODQ0ODgsMTIzLjE5OCBDNS41NzE4NjEyNywxNTUuMjk4IDMyLjI2OTU0MzUsMTgwLjQ0MyA2NS44NjQxMjY5LDE4NS4wNDQgTDY1Ljg2NDEyNjksMjA3LjMgQzY1Ljg2NDEyNjksMjEzLjE4NSA3MC44Njk5NDIzLDIxOCA3Ni45ODgxNjExLDIxOCBDODMuMTA2MzgsMjE4IDg4LjExMjE5NTQsMjEzLjE4NSA4OC4xMTIxOTU0LDIwNy4zIEw4OC4xMTIxOTU0LDE4NS4wNDQgQzEyMS43MDY3NzksMTgwLjQ0MyAxNDguNDA0NDYxLDE1NS4yOTggMTUzLjg1NTIzOCwxMjMuMTk4IEMxNTQuOTY3NjQxLDExNi43NzggMTQ5LjUxNjg2NCwxMTEgMTQyLjczMTIwNCwxMTEgWlwiXG5cdFx0XHRcdFx0XHRpZD1cImVsX2M3SC0zdS1ENGxcIlxuXHRcdFx0XHRcdFx0ZmlsbFJ1bGU9XCJub256ZXJvXCJcblx0XHRcdFx0XHRcdHN0eWxlPXt7IGZpbGw6ICcjNTk1OTU5JyB9fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0PHBhdGhcblx0XHRcdFx0XHRcdGQ9XCJNNzYuOTg2NDY5OSwxNDcuNzg5NDc0IEM5OC4wOTAzNTIsMTQ3Ljc4OTQ3NCAxMTUuMTI2MDE2LDEzMS4yODYzMTYgMTE1LjEyNjAxNiwxMTAuODQyMTA1IEwxMTUuMTI2MDE2LDM2Ljk0NzM2ODQgQzExNS4xMjYwMTYsMTYuNTAzMTU3OSA5OC4wOTAzNTIsLTIuODQyMTcwOTRlLTE0IDc2Ljk4NjQ2OTksLTIuODQyMTcwOTRlLTE0IEM1NS44ODI1ODc3LC0yLjg0MjE3MDk0ZS0xNCAzOC44NDY5MjM5LDE2LjUwMzE1NzkgMzguODQ2OTIzOSwzNi45NDczNjg0IEwzOC44NDY5MjM5LDExMC44NDIxMDUgQzM4Ljg0NjkyMzksMTMxLjI4NjMxNiA1NS44ODI1ODc3LDE0Ny43ODk0NzQgNzYuOTg2NDY5OSwxNDcuNzg5NDc0IFpcIlxuXHRcdFx0XHRcdFx0aWQ9XCJlbF9xaEZjZEFBRndvXCJcblx0XHRcdFx0XHRcdGZpbGxSdWxlPVwibm9uemVyb1wiXG5cdFx0XHRcdFx0XHRzdHlsZT17eyBmaWxsOiAnIzU5NTk1OScgfX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDxwYXRoXG5cdFx0XHRcdFx0XHRkPVwiTTExLjUsMjA2LjUgTDE0Mi41LDEyLjVcIlxuXHRcdFx0XHRcdFx0aWQ9XCJlbF9NOFg4ZzM3V09JXCJcblx0XHRcdFx0XHRcdHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG5cdFx0XHRcdFx0XHRzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L2c+XG5cdFx0PC9zdmc+XG5cdDwvUmVhY3QuRnJhZ21lbnQ+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBNdXRlU3ZnO1xuIl19 */',
	toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

var MuteSvg = function MuteSvg(props) {
	return _react2.default.createElement(
		_react2.default.Fragment,
		null,
		_react2.default.createElement(_core.Global, {
			styles: _ref
		}),
		_react2.default.createElement(
			'svg',
			_extends({
				viewBox: '0 0 480 480',
				xmlns: 'http://www.w3.org/2000/svg',
				id: 'el_D1rEpH2zj',
				width: 28,
				height: 28
			}, props, {
				style: { transform: 'scale(1.5)' }
			}),
			_react2.default.createElement(
				'g',
				{ id: 'el_X81iT9kZYo', fillRule: 'evenodd' },
				_react2.default.createElement(
					'g',
					{ id: 'el_gMpyalCphp' },
					_react2.default.createElement('path', {
						d: 'M142.731204,111 C137.280427,111 132.719573,114.852 131.82965,120.095 C127.268796,145.24 104.464526,164.5 76.9881611,164.5 C49.5117965,164.5 26.7075263,145.24 22.1466723,120.095 C21.2567496,114.852 16.6958955,111 11.2451187,111 C4.45945784,111 -0.880078594,116.778 0.121084488,123.198 C5.57186127,155.298 32.2695435,180.443 65.8641269,185.044 L65.8641269,207.3 C65.8641269,213.185 70.8699423,218 76.9881611,218 C83.10638,218 88.1121954,213.185 88.1121954,207.3 L88.1121954,185.044 C121.706779,180.443 148.404461,155.298 153.855238,123.198 C154.967641,116.778 149.516864,111 142.731204,111 Z',
						id: 'el_c7H-3u-D4l',
						fillRule: 'nonzero',
						style: { fill: '#595959' }
					}),
					_react2.default.createElement('path', {
						d: 'M76.9864699,147.789474 C98.090352,147.789474 115.126016,131.286316 115.126016,110.842105 L115.126016,36.9473684 C115.126016,16.5031579 98.090352,-2.84217094e-14 76.9864699,-2.84217094e-14 C55.8825877,-2.84217094e-14 38.8469239,16.5031579 38.8469239,36.9473684 L38.8469239,110.842105 C38.8469239,131.286316 55.8825877,147.789474 76.9864699,147.789474 Z',
						id: 'el_qhFcdAAFwo',
						fillRule: 'nonzero',
						style: { fill: '#595959' }
					}),
					_react2.default.createElement('path', {
						d: 'M11.5,206.5 L142.5,12.5',
						id: 'el_M8X8g37WOI',
						strokeLinecap: 'round',
						strokeLinejoin: 'round'
					})
				)
			)
		)
	);
};

exports.default = MuteSvg;