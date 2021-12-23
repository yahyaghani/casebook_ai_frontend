'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CancelSvg = function CancelSvg(_ref) {
	var onClick = _ref.onClick;
	return _react2.default.createElement(
		'svg',
		{
			onClick: onClick,
			alt: 'Clear',
			className: 'cancel-icon',
			xmlns: 'http://www.w3.org/2000/svg',
			height: '20px',
			viewBox: '0 0 24 24',
			width: '20px'
		},
		_react2.default.createElement(
			'title',
			null,
			'Clear'
		),
		_react2.default.createElement('path', { d: 'M0 0h24v24H0V0z', fill: 'none' }),
		_react2.default.createElement('path', { d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' })
	);
};

CancelSvg.propTypes = {
	onClick: _types2.default.func
};

exports.default = CancelSvg;