import { cwd } from 'process';
import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { pipeline } from 'stream/promises';
import { createBrotliCompress } from 'zlib';

import { OPERATION_FAILED_ERROR, INVALID_INPUT_ERROR } from '../constants/index.js';
import { removeQuotes } from '../utils/index.js';

export const handleCompress = async (payload) => {
  if (payload.length < 2) throw new Error(INVALID_INPUT_ERROR);

  try {
    const payloadString = payload.join(' ');
    let rawFilePath = '';
    let rawNewFilePath = '';

    if (payloadString.match(/['|"]/)) {
      if (payloadString.match(/ ['|"]/)) {
        [rawFilePath, rawNewFilePath] = payloadString.split(/ ['|"]/);
      }
      else if (payloadString.match(/['|"] /)) {
        [rawFilePath, rawNewFilePath] = payloadString.split(/['|"] /);
      } else {
        [rawFilePath, rawNewFilePath] = payloadString.split(/['|"] ['|"]/);
      }
    } else {
      if (payload.length > 2) throw new Error(INVALID_INPUT_ERROR);
      [rawFilePath, rawNewFilePath] = payloadString.split(' ');
    }

    const currentDirectory = cwd();

    let oldFilePath = rawFilePath.match(/['|"]/) ? removeQuotes(rawFilePath) : rawFilePath;
    oldFilePath = resolve(currentDirectory, oldFilePath);
    
    let newFilePath = rawNewFilePath.match(/['|"]/)
    ? removeQuotes(rawNewFilePath)
    : rawNewFilePath;
    newFilePath = resolve(currentDirectory, newFilePath);

    const readStream = createReadStream(oldFilePath);
    const brotliCompress = createBrotliCompress();
    const writeStream = createWriteStream(newFilePath);
    await pipeline(readStream, brotliCompress, writeStream);

    console.log('File compressed!');
  } catch (_error) {
    throw new Error(OPERATION_FAILED_ERROR);
  }
}
