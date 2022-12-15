import { cwd } from 'process';
import { copyFile } from 'fs/promises';
import { resolve, basename } from 'path';

import { OPERATION_FAILED_ERROR, INVALID_INPUT_ERROR } from '../constants/index.js';
import { removeQuotes } from '../utils/index.js';

export const handleCp = async (payload) => {
  if (payload.length < 2) throw new Error(INVALID_INPUT_ERROR);

  try {
    const payloadString = payload.join(' ');
    let rawFilePath = '';
    let rawNewDirectoryPath = '';

    if (payloadString.match(/['|"]/)) {
      if (payloadString.match(/ ['|"]/)) {
        [rawFilePath, rawNewDirectoryPath] = payloadString.split(/ ['|"]/);
      }
      else if (payloadString.match(/['|"] /)) {
        [rawFilePath, rawNewDirectoryPath] = payloadString.split(/['|"] /);
      } else {
        [rawFilePath, rawNewDirectoryPath] = payloadString.split(/['|"] ['|"]/);
      }
    } else {
      if (payload.length > 2) throw new Error(INVALID_INPUT_ERROR);
      [rawFilePath, rawNewDirectoryPath] = payloadString.split(' ');
    }

    const currentDirectory = cwd();

    let oldFilePath = rawFilePath.match(/['|"]/) ? removeQuotes(rawFilePath) : rawFilePath;
    oldFilePath = resolve(currentDirectory, oldFilePath);
    // console.log(oldFilePath);
    
    let newDirectoryPath = rawNewDirectoryPath.match(/['|"]/)
      ? removeQuotes(rawNewDirectoryPath)
      : rawNewDirectoryPath;
    newDirectoryPath = resolve(currentDirectory, newDirectoryPath);
    // console.log(newDirectoryPath);
    
    const fileName = basename(oldFilePath);
    const newFilePath = resolve(newDirectoryPath, fileName);
    // console.log(newFilePath);

    await copyFile(oldFilePath, newFilePath);
    // console.log('File copied!');
  } catch (_error) {
    throw new Error(OPERATION_FAILED_ERROR);
  }
}
