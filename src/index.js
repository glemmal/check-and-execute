let modules = [];

export function use (handler, checks) {
  isValidInput(handler, checks);

  if (checks.constructor === String) {
    checks = [checks];
  }

  modules = [
    ...modules.filter(m => m.handler !== handler),
    { handler, checks }
  ];
}

function isValidInput (handler, checks) {
  if (checks.constructor !== String && checks.constructor !== Array) {
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

  modules.forEach(({ handler, checks }) => isValidInput(handler, checks));

  modules
    .reduce((mem, val) => mem.concat(val), [])
    .forEach((usedModule) => {
      // check selectors are all available
      const selectorCheck = (usedModule.checks || [])
        .map(check => document.querySelector(check))
        .find(el => !el) !== null;

      // call handler
      if (selectorCheck && usedModule.handler) {
        usedModule.handler();
      }
  });
}
