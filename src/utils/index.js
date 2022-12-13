import { cwd } from 'process';

export const parseEnvArguments = (args) => {
  const parsedArgs = Object.fromEntries(
    args.slice(2).map((arg) => {
      const [key, value] = arg.split('=');
      return [key.slice(2), value];
    })
  );

  return parsedArgs;
}

export const printCurrentDirectory = () => {
  const currentDirectory = cwd();

  console.log(`You are currently in ${currentDirectory}`);
};

export const parseArguments = (args) => {

}

export const removeQuotes = (str) => {
  const result = str
    .split('')
    .map((char) => char.match(/['|"]/) ? '' : char)
    .join('');

  return result;
}
