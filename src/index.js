let modules = [];

export function use (execute, check) {
  isValidInput(execute, check);

  if (check.constructor === String) {
    check = [check];
  }

  modules = [
    ...modules.filter(m => m.execute !== execute),
    { execute, check }
  ];
}

function isValidInput (execute, check) {
  if (!check || check.constructor !== String && check.constructor !== Array) {
    console.error('validation error', execute, check);
    throw new Error(`check-and-execute accepts only array and string as check`);
  }

  if (!execute || execute.constructor !== Function) {
    console.error('validation error', execute, check);
    throw new Error('check-and-execute accepts only functions as executes');
  }
}

export default function create (_modules = []) {
  modules = [
    ...modules,
    _modules
  ];

  modules.forEach(({ execute, check }) => isValidInput(execute, check));

  modules
    .reduce((mem, val) => mem.concat(val), [])
    .forEach((usedModule) => {
      // check selectors are all available
      const selectorCheck = (usedModule.check || [])
        .map(check => document.querySelector(check))
        .find(el => !el) !== null;

      // call execute
      if (selectorCheck && usedModule.execute) {
        usedModule.execute();
      }
  });
}
