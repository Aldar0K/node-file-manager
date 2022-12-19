import { writeFile } from 'fs/promises';
import { OPERATION_FAILED_ERROR, INVALID_INPUT_ERROR } from '../constants/index.js';

export const handleAdd = async (payload) => {
  if (!payload.length) throw new Error(INVALID_INPUT_ERROR);

  try {
    const rawNewFileName = payload.join(' ');
    const newFileName = rawNewFileName.match(/['|"]/) ? removeQuotes(rawNewFileName) : rawNewFileName;

    await writeFile(newFileName, '', { flag: 'wx' });
    console.log('File created!');
  } catch (_error) {
    throw new Error(OPERATION_FAILED_ERROR);
  }
};
