'use strict';

exports.__esModule = true;

var _styledBase = require('@emotion/styled-base');

var _styledBase2 = _interopRequireDefault(_styledBase);

var _core = require('@emotion/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return 'You have tried to stringify object returned from `css` function. It isn\'t supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).'; }

var right = process.env.NODE_ENV === 'production' ? {
	name: 'qkj2tw-right',
	styles: 'right:30px;;label:right;'
} : {
	name: 'qkj2tw-right',
	styles: 'right:30px;;label:right;',
	map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHlsZXMvTWljSWNvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHaUIiLCJmaWxlIjoiLi4vLi4vc3JjL3N0eWxlcy9NaWNJY29uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5cbmNvbnN0IHJpZ2h0ID0gY3NzYFxuXHRyaWdodDogMzBweDtcbmA7XG5cbmNvbnN0IE1pY0ljb24gPSBzdHlsZWQuZGl2YFxuXHRkaXNwbGF5OiBmbGV4O1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0dG9wOiA1MCU7XG5cdHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRjdXJzb3I6IHBvaW50ZXI7XG5cdHJpZ2h0OiAxNXB4O1xuXHQkeyh7IGljb25Qb3NpdGlvbiwgc2hvd0NsZWFyIH0pID0+IHtcblx0XHRpZiAoc2hvd0NsZWFyICYmIGljb25Qb3NpdGlvbiAhPT0gJ2xlZnQnKSByZXR1cm4gJ3JpZ2h0OiA1MXB4Oyc7XG5cdFx0aWYgKGljb25Qb3NpdGlvbiA9PT0gJ3JpZ2h0JyB8fCBzaG93Q2xlYXIpIHtcblx0XHRcdHJldHVybiByaWdodDtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH19XG5cdCR7KHsgc2hvd0ljb24sIHNob3dDbGVhciB9KSA9PiB7XG5cdFx0aWYgKCFzaG93SWNvbiAmJiBzaG93Q2xlYXIpIHJldHVybiAncmlnaHQ6IDMycHg7Jztcblx0XHRpZiAoIXNob3dJY29uICYmICFzaG93Q2xlYXIpIHJldHVybiAncmlnaHQ6IDE1cHg7Jztcblx0XHRyZXR1cm4gbnVsbDtcblx0fX07XG5cdD4gKiB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdG9iamVjdC1maXQ6IGNvdmVyO1xuXHR9XG5cdHdpZHRoOiAxMXB4O1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgTWljSWNvbjtcbiJdfQ== */',
	toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

var MicIcon = (0, _styledBase2.default)('div', {
	target: 'e1eg17i10',
	label: 'MicIcon'
})('display:flex;align-items:center;justify-content:center;top:50%;transform:translateY(-50%);position:absolute;cursor:pointer;right:15px;', function (_ref) {
	var iconPosition = _ref.iconPosition,
	    showClear = _ref.showClear;

	if (showClear && iconPosition !== 'left') return 'right: 51px;';
	if (iconPosition === 'right' || showClear) {
		return right;
	}
	return null;
}, ' ', function (_ref2) {
	var showIcon = _ref2.showIcon,
	    showClear = _ref2.showClear;

	if (!showIcon && showClear) return 'right: 32px;';
	if (!showIcon && !showClear) return 'right: 15px;';
	return null;
}, ';> *{position:absolute;object-fit:cover;}width:11px;' + (process.env.NODE_ENV === 'production' ? '' : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHlsZXMvTWljSWNvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPMEIiLCJmaWxlIjoiLi4vLi4vc3JjL3N0eWxlcy9NaWNJY29uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5cbmNvbnN0IHJpZ2h0ID0gY3NzYFxuXHRyaWdodDogMzBweDtcbmA7XG5cbmNvbnN0IE1pY0ljb24gPSBzdHlsZWQuZGl2YFxuXHRkaXNwbGF5OiBmbGV4O1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0dG9wOiA1MCU7XG5cdHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRjdXJzb3I6IHBvaW50ZXI7XG5cdHJpZ2h0OiAxNXB4O1xuXHQkeyh7IGljb25Qb3NpdGlvbiwgc2hvd0NsZWFyIH0pID0+IHtcblx0XHRpZiAoc2hvd0NsZWFyICYmIGljb25Qb3NpdGlvbiAhPT0gJ2xlZnQnKSByZXR1cm4gJ3JpZ2h0OiA1MXB4Oyc7XG5cdFx0aWYgKGljb25Qb3NpdGlvbiA9PT0gJ3JpZ2h0JyB8fCBzaG93Q2xlYXIpIHtcblx0XHRcdHJldHVybiByaWdodDtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH19XG5cdCR7KHsgc2hvd0ljb24sIHNob3dDbGVhciB9KSA9PiB7XG5cdFx0aWYgKCFzaG93SWNvbiAmJiBzaG93Q2xlYXIpIHJldHVybiAncmlnaHQ6IDMycHg7Jztcblx0XHRpZiAoIXNob3dJY29uICYmICFzaG93Q2xlYXIpIHJldHVybiAncmlnaHQ6IDE1cHg7Jztcblx0XHRyZXR1cm4gbnVsbDtcblx0fX07XG5cdD4gKiB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdG9iamVjdC1maXQ6IGNvdmVyO1xuXHR9XG5cdHdpZHRoOiAxMXB4O1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgTWljSWNvbjtcbiJdfQ== */'));

exports.default = MicIcon;