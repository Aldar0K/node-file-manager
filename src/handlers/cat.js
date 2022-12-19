import { createReadStream } from 'fs';
import { Writable } from 'stream';
import { pipeline } from 'stream/promises';

import { OPERATION_FAILED_ERROR, INVALID_INPUT_ERROR } from '../constants/index.js';
import { removeQuotes } from '../utils/index.js';

export const handleCat = async (payload) => {
  if (!payload.length) throw new Error(INVALID_INPUT_ERROR);
  
  try {
    const rawPath = payload.join(' ');
    const path = rawPath.match(/['|"]/) ? removeQuotes(rawPath) : rawPath;

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
