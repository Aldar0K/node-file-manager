import { INVALID_INPUT_ERROR } from '../constants/index.js';
import { printCurrentDirectory } from '../utils/index.js';

import {
  handleCd,
  handleUp,
  handleLs,
  handleCat,
  handleAdd,
  handleRn,
  handleCp,
  handleMv,
  handleRm,
  handleOs,
  handleHash,
} from './index.js';

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
      case 'cat':
        await handleCat(payload);
        break;
      case 'add':
        await handleAdd(payload);
        break;
      case 'rn':
        await handleRn(payload);
        break;
      case 'cp':
        await handleCp(payload);
        break;
      case 'mv':
        await handleMv(payload);
        break;
      case 'rm':
        await handleRm(payload);
        break;
      case 'os':
        await handleOs(payload);
        break;
      case 'hash':
        await handleHash(payload);
        break
      default:
        throw new Error(INVALID_INPUT_ERROR);
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    if (!isExit) printCurrentDirectory();
  }
}
