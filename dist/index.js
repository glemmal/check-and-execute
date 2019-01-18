'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.use = use;
exports.default = create;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var modules = [];

function use(execute, check) {
  isValidInput(execute, check);

  if (check.constructor === String) {
    check = [check];
  }

  modules = [].concat(_toConsumableArray(modules.filter(function (m) {
    return m.execute !== execute;
  })), [{ execute: execute, check: check }]);
}

function isValidInput(execute, check) {
  if (!check || check.constructor !== String && check.constructor !== Array) {
    throw new Error('check-and-execute accepts only array and string as check');
    console.error(execute, check);
  }

  if (!execute || execute.constructor !== Function) {
    throw new Error('check-and-execute accepts only functions as executes');
    console.error(execute, check);
  }
}

function create() {
  var _modules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  modules = [].concat(_toConsumableArray(modules), [_modules]);

  modules.forEach(function (_ref) {
    var execute = _ref.execute,
        check = _ref.check;
    return isValidInput(execute, check);
  });

  modules.reduce(function (mem, val) {
    return mem.concat(val);
  }, []).forEach(function (usedModule) {
    // check selectors are all available
    var selectorCheck = (usedModule.check || []).map(function (check) {
      return document.querySelector(check);
    }).find(function (el) {
      return !el;
    }) !== null;

    // call execute
    if (selectorCheck && usedModule.execute) {
      usedModule.execute();
    }
  });
}