"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.use = use;
exports.default = create;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var modules = [];

function use(handler, checks) {
  if (checks.constructor !== Array) {
    checks = [checks];
  }

  modules = [].concat(_toConsumableArray(modules.filter(function (m) {
    return m.handler !== handler;
  })), [{ handler: handler, checks: checks }]);
}

function create() {
  var _modules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  _modules || modules.reduce(function (mem, val) {
    return mem.concat(val);
  }, []).forEach(function (usedModule) {
    // check selectors are all available
    var selectorCheck = (usedModule.checks || []).map(function (check) {
      return document.querySelector(check);
    }).find(function (el) {
      return !el;
    }) !== null;

    // call handler
    if (selectorCheck && usedModule.handler) {
      usedModule.handler();
    }
  });
}