import { cwd } from 'process';
import { rm } from 'fs/promises';
import { resolve, basename } from 'path';

import { OPERATION_FAILED_ERROR, INVALID_INPUT_ERROR } from '../constants/index.js';
import { removeQuotes } from '../utils/index.js';

export const handleMv = async (payload) => {
  if (payload.length < 2) throw new Error(INVALID_INPUT_ERROR);

  try {
    
  } catch (_error) {
    throw new Error(OPERATION_FAILED_ERROR);
  }
}
