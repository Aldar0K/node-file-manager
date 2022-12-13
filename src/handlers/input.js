import { INVALID_INPUT_ERROR } from '../constants/index.js';
import { printCurrentDirectory } from '../utils/index.js';

import { handleCd, handleUp, handleLs } from './index.js';

export const handleInput = async (readline, input) => {
  const [command, ...payload] = input.trim().split(' ');
  let isExit = false;

  // TODO validate args (payload) and throw 'Invalid input' error here?

  try {
    switch (command) {
      case '.exit':
        readline.close();
        isExit = true;
        break;
      case 'cd':
        await handleCd(payload);
        break;
      case 'up':
        await handleUp();
        break;
      case 'ls':
        await handleLs();
        break;
      case 'console':
        console.log('Command console!');
        break;
      case 'console-timeout':
        const promise = new Promise(resolve => {
          setTimeout(() => resolve(console.log('Command console timeout!')), 500);
        });
        await promise;
        break;
      default:
        throw new Error(INVALID_INPUT_ERROR);
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    // TODO should be printed AFTER each end of input/operation.
    if (!isExit) printCurrentDirectory();
  }
}
