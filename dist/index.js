'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
	(typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.interfaceRepair = factory();
})(window, function () {
	function interfaceRepair(defs) {
		var rs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
		var notFirstCall = arguments[3];

		if (notFirstCall) {
			var defaultOptions = {
				stringEmptyToDef: true
			};
			for (var attr in defaultOptions) {
				if (typeof options[attr] != 'undefined') {
					defaultOptions[attr] = options[attr];
				}
			}
			options = deepCopy(defaultOptions);
		}
		function deepCopy(p, c) {
			var c = c || {};
			for (var i in p) {
				if (!p.hasOwnProperty(i)) {
					continue;
				}
				if (_typeof(p[i]) === 'object') {
					c[i] = p[i].constructor === Array ? [] : {};
					deepCopy(p[i], c[i]);
				} else {
					c[i] = p[i];
				}
			}
			return c;
		}
		defs = deepCopy(defs);
		for (var attr in defs) {
			if (attr == '*') {
				for (var attr2 in rs) {
					defs[attr2] = deepCopy(defs[attr]);
				}
			}
		}
		delete defs['*'];
		for (var attr in defs) {
			if (_typeof(defs[attr]) == "object" && Object.prototype.toString.call(defs[attr]).toLowerCase() == "[object object]" && !defs[attr].length) {
				defs[attr] = interfaceRepair(defs[attr], rs[attr] || {}, options, true);
			} else if (typeof defs[attr] == 'number') {
				defs[attr] = isNaN(Number(rs[attr])) || _typeof(rs[attr]) == 'object' ? defs[attr] : rs[attr] == '' ? defs[attr] : Number(rs[attr]);
			} else if (typeof defs[attr] == 'string') {
				defs[attr] = typeof rs[attr] == 'undefined' || rs[attr] == 'undefined' || rs[attr] == 'null' || options.stringEmptyToDef && !rs[attr] ? defs[attr] : String(rs[attr]);
			} else if (_typeof(defs[attr]) == 'object') {
				if (typeof rs[attr] == 'undefined' || !Array.isArray(rs[attr])) {
					defs[attr] = [];
				} else {
					if (rs[attr].length != 0) {
						var def = deepCopy(defs[attr][0]);
						rs[attr].forEach(function (item, index) {
							if (index != 0) {
								defs[attr].push(def);
							}
							defs[attr][index] = interfaceRepair(defs[attr][index], item, options, true);
						});
					} else {
						defs[attr] = [];
					}
				}
			}
		}
		return defs;
	}
	return interfaceRepair;
});
