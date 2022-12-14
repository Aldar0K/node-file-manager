import { createReadStream, createWriteStream } from 'fs';
import { readdir } from 'fs/promises';
import { Writable } from 'stream';
import { pipeline } from 'stream/promises';

import { OPERATION_FAILED_ERROR, INVALID_INPUT_ERROR } from '../constants/index.js';
import { removeQuotes } from '../utils/index.js';

export const handleCat = async (payload) => {
  // console.log(payload);

  if (!payload.length) throw new Error(INVALID_INPUT_ERROR);
  
  const rawPath = payload.join(' ');
  const path = rawPath.match(/['|"]/) ? removeQuotes(rawPath) : rawPath;

  try {
    const readStream = createReadStream(path, { encoding: 'utf-8' });
    const writable = new Writable({
      decodeStrings: false,
      write(chunk, _, callback) {
        console.log(chunk);
        callback();
      }
    });

    await pipeline(readStream, writable);
  } catch (_error) {
    throw new Error(OPERATION_FAILED_ERROR);
  }
}
