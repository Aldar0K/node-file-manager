import { chdir } from 'process';
import { OPERATION_FAILED_ERROR } from '../constants/index.js';

export const handleUp = async () => {
  try {
    chdir('..');
  } catch (_error) {
    throw new Error(OPERATION_FAILED_ERROR);
  }
}
