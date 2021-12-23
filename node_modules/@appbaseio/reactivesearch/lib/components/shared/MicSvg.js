'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _core = require('@emotion/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return 'You have tried to stringify object returned from `css` function. It isn\'t supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).'; }

var _ref = process.env.NODE_ENV === 'production' ? {
	name: 'rv9i9t-MicSvg',
	styles: '#el_TvxDfTAtKp{stroke:none;stroke-width:1;fill:none;}#el_D93PK3GbmJ{-webkit-transform:translate(163px,131px);transform:translate(163px,131px);fill:#d8d8d8;};label:MicSvg;'
} : {
	name: 'rv9i9t-MicSvg',
	styles: '#el_TvxDfTAtKp{stroke:none;stroke-width:1;fill:none;}#el_D93PK3GbmJ{-webkit-transform:translate(163px,131px);transform:translate(163px,131px);fill:#d8d8d8;};label:MicSvg;',
	map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NoYXJlZC9NaWNTdmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTWMiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvc2hhcmVkL01pY1N2Zy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBHbG9iYWwsIGNzcyB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuXG5jb25zdCBNaWNTdmcgPSBwcm9wcyA9PiAoXG5cdDxSZWFjdC5GcmFnbWVudD5cblx0XHQ8R2xvYmFsXG5cdFx0XHRzdHlsZXM9e2Nzc2Bcblx0XHRcdFx0I2VsX1R2eERmVEF0S3Age1xuXHRcdFx0XHRcdHN0cm9rZTogbm9uZTtcblx0XHRcdFx0XHRzdHJva2Utd2lkdGg6IDE7XG5cdFx0XHRcdFx0ZmlsbDogbm9uZTtcblx0XHRcdFx0fVxuXHRcdFx0XHQjZWxfRDkzUEszR2JtSiB7XG5cdFx0XHRcdFx0LXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgxNjNweCwgMTMxcHgpO1xuXHRcdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKDE2M3B4LCAxMzFweCk7XG5cdFx0XHRcdFx0ZmlsbDogI2Q4ZDhkODtcblx0XHRcdFx0fVxuXHRcdFx0YH1cblx0XHQvPlxuXHRcdDxzdmdcblx0XHRcdHZpZXdCb3g9XCIwIDAgNDgwIDQ4MFwiXG5cdFx0XHR4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcblx0XHRcdGlkPVwiZWxfeFMwRlJ6UWpKXCJcblx0XHRcdHdpZHRoPXsyOH1cblx0XHRcdGhlaWdodD17Mjh9XG5cdFx0XHR7Li4ucHJvcHN9XG5cdFx0XHRzdHlsZT17eyB0cmFuc2Zvcm06ICdzY2FsZSgxLjUpJyB9fVxuXHRcdD5cblx0XHRcdDxnIGlkPVwiZWxfVHZ4RGZUQXRLcFwiIGZpbGxSdWxlPVwiZXZlbm9kZFwiPlxuXHRcdFx0XHQ8ZyBpZD1cImVsX0Q5M1BLM0dibUpcIiBmaWxsUnVsZT1cIm5vbnplcm9cIiBzdHlsZT17eyBmaWxsOiAnIzU5NTk1OScgfX0+XG5cdFx0XHRcdFx0PHBhdGhcblx0XHRcdFx0XHRcdGQ9XCJNMTQyLjczMTIwNCwxMTEgQzEzNy4yODA0MjcsMTExIDEzMi43MTk1NzMsMTE0Ljg1MiAxMzEuODI5NjUsMTIwLjA5NSBDMTI3LjI2ODc5NiwxNDUuMjQgMTA0LjQ2NDUyNiwxNjQuNSA3Ni45ODgxNjExLDE2NC41IEM0OS41MTE3OTY1LDE2NC41IDI2LjcwNzUyNjMsMTQ1LjI0IDIyLjE0NjY3MjMsMTIwLjA5NSBDMjEuMjU2NzQ5NiwxMTQuODUyIDE2LjY5NTg5NTUsMTExIDExLjI0NTExODcsMTExIEM0LjQ1OTQ1Nzg0LDExMSAtMC44ODAwNzg1OTQsMTE2Ljc3OCAwLjEyMTA4NDQ4OCwxMjMuMTk4IEM1LjU3MTg2MTI3LDE1NS4yOTggMzIuMjY5NTQzNSwxODAuNDQzIDY1Ljg2NDEyNjksMTg1LjA0NCBMNjUuODY0MTI2OSwyMDcuMyBDNjUuODY0MTI2OSwyMTMuMTg1IDcwLjg2OTk0MjMsMjE4IDc2Ljk4ODE2MTEsMjE4IEM4My4xMDYzOCwyMTggODguMTEyMTk1NCwyMTMuMTg1IDg4LjExMjE5NTQsMjA3LjMgTDg4LjExMjE5NTQsMTg1LjA0NCBDMTIxLjcwNjc3OSwxODAuNDQzIDE0OC40MDQ0NjEsMTU1LjI5OCAxNTMuODU1MjM4LDEyMy4xOTggQzE1NC45Njc2NDEsMTE2Ljc3OCAxNDkuNTE2ODY0LDExMSAxNDIuNzMxMjA0LDExMSBaXCJcblx0XHRcdFx0XHRcdGlkPVwiZWxfdWx5M0V3QTJPM1wiXG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHQ8cGF0aFxuXHRcdFx0XHRcdFx0ZD1cIk03Ni45ODY0Njk5LDE0Ny43ODk0NzQgQzk4LjA5MDM1MiwxNDcuNzg5NDc0IDExNS4xMjYwMTYsMTMxLjI4NjMxNiAxMTUuMTI2MDE2LDExMC44NDIxMDUgTDExNS4xMjYwMTYsMzYuOTQ3MzY4NCBDMTE1LjEyNjAxNiwxNi41MDMxNTc5IDk4LjA5MDM1MiwtMi44NDIxNzA5NGUtMTQgNzYuOTg2NDY5OSwtMi44NDIxNzA5NGUtMTQgQzU1Ljg4MjU4NzcsLTIuODQyMTcwOTRlLTE0IDM4Ljg0NjkyMzksMTYuNTAzMTU3OSAzOC44NDY5MjM5LDM2Ljk0NzM2ODQgTDM4Ljg0NjkyMzksMTEwLjg0MjEwNSBDMzguODQ2OTIzOSwxMzEuMjg2MzE2IDU1Ljg4MjU4NzcsMTQ3Ljc4OTQ3NCA3Ni45ODY0Njk5LDE0Ny43ODk0NzQgWlwiXG5cdFx0XHRcdFx0XHRpZD1cImVsX3RuRGJSNHl0dTRcIlxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvZz5cblx0XHQ8L3N2Zz5cblx0PC9SZWFjdC5GcmFnbWVudD5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IE1pY1N2ZztcbiJdfQ== */',
	toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

var MicSvg = function MicSvg(props) {
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
				id: 'el_xS0FRzQjJ',
				width: 28,
				height: 28
			}, props, {
				style: { transform: 'scale(1.5)' }
			}),
			_react2.default.createElement(
				'g',
				{ id: 'el_TvxDfTAtKp', fillRule: 'evenodd' },
				_react2.default.createElement(
					'g',
					{ id: 'el_D93PK3GbmJ', fillRule: 'nonzero', style: { fill: '#595959' } },
					_react2.default.createElement('path', {
						d: 'M142.731204,111 C137.280427,111 132.719573,114.852 131.82965,120.095 C127.268796,145.24 104.464526,164.5 76.9881611,164.5 C49.5117965,164.5 26.7075263,145.24 22.1466723,120.095 C21.2567496,114.852 16.6958955,111 11.2451187,111 C4.45945784,111 -0.880078594,116.778 0.121084488,123.198 C5.57186127,155.298 32.2695435,180.443 65.8641269,185.044 L65.8641269,207.3 C65.8641269,213.185 70.8699423,218 76.9881611,218 C83.10638,218 88.1121954,213.185 88.1121954,207.3 L88.1121954,185.044 C121.706779,180.443 148.404461,155.298 153.855238,123.198 C154.967641,116.778 149.516864,111 142.731204,111 Z',
						id: 'el_uly3EwA2O3'
					}),
					_react2.default.createElement('path', {
						d: 'M76.9864699,147.789474 C98.090352,147.789474 115.126016,131.286316 115.126016,110.842105 L115.126016,36.9473684 C115.126016,16.5031579 98.090352,-2.84217094e-14 76.9864699,-2.84217094e-14 C55.8825877,-2.84217094e-14 38.8469239,16.5031579 38.8469239,36.9473684 L38.8469239,110.842105 C38.8469239,131.286316 55.8825877,147.789474 76.9864699,147.789474 Z',
						id: 'el_tnDbR4ytu4'
					})
				)
			)
		)
	);
};

exports.default = MicSvg;