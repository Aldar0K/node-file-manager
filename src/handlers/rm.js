import { rm } from 'fs/promises';

import { OPERATION_FAILED_ERROR, INVALID_INPUT_ERROR } from '../constants/index.js';
import { removeQuotes } from '../utils/index.js';

export const handleRm = async (payload) => {
  if (!payload.length) throw new Error(INVALID_INPUT_ERROR);

  try {
    const rawFilePath = payload.join(' ');
    const filePath = rawFilePath.match(/['|"]/) ? removeQuotes(rawFilePath) : rawFilePath;

    await rm(filePath);

    console.log('File removed!');
  } catch (_error) {
    throw new Error(OPERATION_FAILED_ERROR);
  }
}
