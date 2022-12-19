import { cwd } from 'process';
import { readdir } from 'fs/promises';

import { OPERATION_FAILED_ERROR, EMPTY_DIRECTORY_ERROR } from '../constants/index.js';

export const handleLs = async () => {
  try {
    const currentDirectoryPath = cwd();
    const currentDirectoryContent = await readdir(currentDirectoryPath, { withFileTypes: true });

    if (!currentDirectoryContent.length) {
      console.log(EMPTY_DIRECTORY_ERROR);
      return;
    }

    const processedDirectoryContent = [...currentDirectoryContent].map((dirent) => {
      let type;

      if (dirent.isDirectory()) type = 'direcitory';
      if (dirent.isFile()) type = 'file';
      if (dirent.isSymbolicLink()) type = 'symbolic link';

      return {
        Name: dirent.name,
        Type: type,
      }
    });

    const direcitories = processedDirectoryContent.filter(({ Type }) => Type === 'direcitory');
    const sortedDirecitories = direcitories.sort();
    
    const files = processedDirectoryContent.filter(({ Type }) => Type === 'file');
    const sortedFiles = files.sort();

    const symbolicLinks = processedDirectoryContent.filter(({ Type }) => Type === 'symbolic link');
    const sortedSymbolicLinks = symbolicLinks.sort();

    const data = [...sortedDirecitories, ...sortedFiles, ...sortedSymbolicLinks];
    const columnNames = ['Name', 'Type'];

    console.table(data, columnNames);
  } catch (_error) {
    throw new Error(OPERATION_FAILED_ERROR);
  }
}
