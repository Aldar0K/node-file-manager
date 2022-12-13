import {
  argv,
  chdir,
  nextTick,
  exit,
  stdin as input,
  stdout as output
} from 'process';
import readlinePromises from 'readline/promises';

import { DEFAULT_USERNAME } from './constants/index.js';
import { parseEnvArguments, printCurrentDirectory } from './utils/index.js';

import { handleInput } from './handlers/index.js';
import { getHomeDir } from './os/index.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const packageJson = require('../package.json');
const { name, version, description, author } = packageJson;

const envArgs = parseEnvArguments(argv);

let userName = envArgs['username'] ? envArgs['username'] : DEFAULT_USERNAME;
console.log(`Welcome to the File Manager, ${userName}!`);

let currentDirectory = getHomeDir();
chdir(currentDirectory);
printCurrentDirectory();

const rl = readlinePromises.createInterface({ input, output });
rl.on('line', input => handleInput(rl, input));
// TODO is it necessary to handle SIGINT event?
// rl.on('SIGINT', () => rl.close());
rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  nextTick(() => exit());
});
