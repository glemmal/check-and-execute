let modules = [];

export function use (handler, checks) {
  if (checks.constructor !== Array) {
    checks = [checks];
  }

  modules = [
    ...modules.filter(m => m.handler !== handler),
    { handler, checks }
  ];
}

export default function create (_modules = []) {
  _modules || modules
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
