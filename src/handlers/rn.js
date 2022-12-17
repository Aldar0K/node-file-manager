import { cwd } from 'process';
import { rename } from 'fs/promises';
import { resolve, dirname } from 'path';

import { OPERATION_FAILED_ERROR, INVALID_INPUT_ERROR } from '../constants/index.js';
import { removeQuotes } from '../utils/index.js';

export const handleRn = async (payload) => {
  if (payload.length < 2) throw new Error(INVALID_INPUT_ERROR);

  try {
    const payloadString = payload.join(' ');
    let rawOldPath = '';
    let rawNewFileName = '';

    if (payloadString.match(/['|"]/)) {
      if (payloadString.match(/ ['|"]/)) {
        [rawOldPath, rawNewFileName] = payloadString.split(/ ['|"]/);
      }
      else if (payloadString.match(/['|"] /)) {
        [rawOldPath, rawNewFileName] = payloadString.split(/['|"] /);
      } else {
        [rawOldPath, rawNewFileName] = payloadString.split(/['|"] ['|"]/);
      }
    } else {
      if (payload.length > 2) throw new Error(INVALID_INPUT_ERROR);
      [rawOldPath, rawNewFileName] = payloadString.split(' ');
    }

    let oldPath = rawOldPath.match(/['|"]/) ? removeQuotes(rawOldPath) : rawOldPath;
    const currentDirectory = cwd();
    oldPath = resolve(currentDirectory, oldPath);
    
    const oldDirectoryPath = dirname(oldPath);
    let newFileName = rawNewFileName.match(/['|"]/) ? removeQuotes(rawNewFileName) : rawNewFileName;
    const newPath = resolve(oldDirectoryPath, newFileName);

    await rename(oldPath, newPath);
    console.log('File renamed!');
  } catch (_error) {
    throw new Error(OPERATION_FAILED_ERROR);
  }
}
