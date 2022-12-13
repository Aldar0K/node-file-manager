import { chdir } from 'process';

import { OPERATION_FAILED_ERROR, INVALID_INPUT_ERROR } from '../constants/index.js';
import { removeQuotes } from '../utils/index.js';

export const handleCd = async (payload) => {
  // console.log(payload);

  if (!payload.length) throw new Error(INVALID_INPUT_ERROR);
  
  const rawPath = payload.join(' ');
  const path = rawPath.match(/['|"]/) ? removeQuotes(rawPath) : rawPath;

  try {
    chdir(path);
  } catch (_error) {
    throw new Error(OPERATION_FAILED_ERROR);
  }
}
