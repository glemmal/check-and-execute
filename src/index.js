let modules = [];

export function use (handler, check) {
  isValidInput(handler, check);

  if (check.constructor === String) {
    check = [check];
  }

  modules = [
    ...modules.filter(m => m.handler !== handler),
    { handler, check }
  ];
}

function isValidInput (handler, check) {
  if (check.constructor !== String && check.constructor !== Array) {
    throw new Error('check-and-execute accepts only array and string as check');
  }

  if (handler.constructor !== Function) {
    throw new Error('check-and-execute accepts only functions as handlers');
  }
}

export default function create (_modules = []) {
  modules = [
    ...modules,
    _modules
  ];

  modules.forEach(({ handler, check }) => isValidInput(handler, check));

  modules
    .reduce((mem, val) => mem.concat(val), [])
    .forEach((usedModule) => {
      // check selectors are all available
      const selectorCheck = (usedModule.check || [])
        .map(check => document.querySelector(check))
        .find(el => !el) !== null;

      // call handler
      if (selectorCheck && usedModule.execute) {
        usedModule.execute();
      }
  });
}
