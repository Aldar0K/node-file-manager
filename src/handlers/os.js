import { createRequire } from 'module';
import { INVALID_INPUT_ERROR } from '../constants/index.js';

const require = createRequire(import.meta.url);

export const handleOs = async ([ flag ]) => {
  if (!flag) throw new Error(INVALID_INPUT_ERROR);

  switch (flag) {
    case '--EOL':
      await printEOL();
      break;
    case '--cpus':
      await printCpus();
      break;
    case '--homedir':
      await printHomedir();
      break;
    case '--username':
      await printUsername();
      break;
    case '--architecture':
      await printArchitecture();
      break;
    default:
      throw new Error(INVALID_INPUT_ERROR);
  }
}

const printEOL = async () => {
  const { EOL } = require('os');
  const EOLStingified = JSON.stringify(EOL);
  console.log(EOLStingified);
}

const printCpus = async () => {
  const { cpus } = require('os');
  const rawCpus = cpus();
  const processedCpus = [...rawCpus].map(({ model, speed }) => ({
    model: model.trim(),
    speed: `${speed / 1000}GHz`
  }));

  console.log(`Overall amount of CPUS ${processedCpus.length}`);
  processedCpus.forEach(({ model, speed }, index) => {
    console.log(`${index + 1}. Model: ${model}, Speed: ${speed}`);
  });
}

const printHomedir = async () => {
  const { homedir } = require('os');
  console.log(homedir());
}

const printUsername = async () => {
  const { userInfo } = require('os');
  const { username } = userInfo();
  console.log(username);
}

const printArchitecture = async () => {
  const { arch } = require('os');
  console.log(arch());
}
