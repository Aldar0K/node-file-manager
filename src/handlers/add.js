import { writeFile } from 'fs/promises';

export const handleAdd = async (payload) => {
  if (!payload.length) throw new Error(INVALID_INPUT_ERROR);

  const rawNewFileName = payload.join(' ');
  const newFileName = rawNewFileName.match(/['|"]/) ? removeQuotes(rawNewFileName) : rawNewFileName;

  try {
    await writeFile(newFileName, '', { flag: 'wx' });
    console.log('File created!');
  } catch (_error) {
    throw new Error(OPERATION_FAILED_ERROR);
  }
};
