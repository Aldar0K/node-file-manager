import { cwd } from 'process';
import { rm } from 'fs/promises';
import { resolve, basename } from 'path';

import { OPERATION_FAILED_ERROR, INVALID_INPUT_ERROR } from '../constants/index.js';
import { removeQuotes } from '../utils/index.js';

export const handleRm = async (payload) => {
  if (!payload.length) throw new Error(INVALID_INPUT_ERROR);

  const rawFilePath = payload.join(' ');
  const filePath = rawFilePath.match(/['|"]/) ? removeQuotes(rawFilePath) : rawFilePath;

  try {
    await rm(filePath);
    // console.log('File removed!');
  } catch (_error) {
    throw new Error(OPERATION_FAILED_ERROR);
  }
}
