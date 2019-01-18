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
  [...modules, _modules]
    .reduce((mem, val) => (
      // accept also module definition as array with submodules
      val.constructor === Array ? [...mem, ...val] : [...mem, val]
    ), [])
    .forEach(({ execute, check }) => {
      // check if module is valid
      isValidInput(execute, check);

      // check selectors are all available
      const shouldExecute = (check || [])
        .map(c => document.querySelector(c))
        .find(el => !el) !== null;

      // call execute
      if (shouldExecute && execute) {
        execute();
      }
  });
}
