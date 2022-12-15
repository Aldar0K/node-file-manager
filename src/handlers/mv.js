import { cwd } from 'process';
import { createReadStream, createWriteStream } from 'fs';
import { rm } from 'fs/promises';
import { resolve, basename } from 'path';
import { pipeline } from 'stream/promises';

import { OPERATION_FAILED_ERROR, INVALID_INPUT_ERROR } from '../constants/index.js';
import { removeQuotes } from '../utils/index.js';

export const handleMv = async (payload) => {
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
    
    let newDirectoryPath = rawNewDirectoryPath.match(/['|"]/)
      ? removeQuotes(rawNewDirectoryPath)
      : rawNewDirectoryPath;
    newDirectoryPath = resolve(currentDirectory, newDirectoryPath);
    
    const fileName = basename(oldFilePath);
    const newFilePath = resolve(newDirectoryPath, fileName);

    const readStream = createReadStream(oldFilePath);
    const writeStream = createWriteStream(newFilePath);
    await pipeline(readStream, writeStream);

    await rm(oldFilePath);

    console.log('File moved!');
  } catch (_error) {
    throw new Error(OPERATION_FAILED_ERROR);
  }
}
