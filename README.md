# Check and Execute
Execute given functions when a given query selector exists inside the DOM.

## Install
```bash
npm i check-and-execute --save
```

## Usage
You use the "use" function in order to add a handler to the execution chain:

```javascript
 import checkAndExecute from 'check-and-execute';

 // accepts Array of selectors or String
 const check = ['.example', '.example-two'];

 function execute () {
   console.log('load me when class .example and .example-two is available');
 }

 checkAndExecute.use(check, execute);

 checkAndExecute();
```

You can also add all modules you wanna load to the constructor:

```javascript
import checkAndExecute from 'check-and-execute';

checkAndExecute([
  {
    // Also takes a string
    check: '.example',
    execute () {
      console.log('load me when class .example is available');
    }
  }
]);
```
## MIT License
