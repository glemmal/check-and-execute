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
    console.error('validation error', execute, check);
    throw new Error('check-and-execute accepts only array and string as check');
  }

  if (!execute || execute.constructor !== Function) {
    console.error('validation error', execute, check);
    throw new Error('check-and-execute accepts only functions as executes');
  }
}

function create() {
  var _modules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  [].concat(_toConsumableArray(modules), [_modules]).reduce(function (mem, val) {
    return (
      // accept also module definition as array with submodules
      val.constructor === Array ? [].concat(_toConsumableArray(mem), _toConsumableArray(val)) : [].concat(_toConsumableArray(mem), [val])
    );
  }, []).forEach(function (_ref) {
    var execute = _ref.execute,
        check = _ref.check;

    // check if module is valid
    isValidInput(execute, check);

    // check selectors are all available
    var shouldExecute = (check || []).map(function (c) {
      return document.querySelector(c);
    }).find(function (el) {
      return !el;
    }) !== null;

    // call execute
    if (shouldExecute && execute) {
      execute();
    }
  });
}