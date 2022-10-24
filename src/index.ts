import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

import help from 'cli-meow-help';
import meow, { AnyFlag } from 'meow';

import { removeNonRecordValues, traverse } from './lib/traverse.js';

const flags: Record<
  'configInput' | 'envOutput' | 'configExample' | 'envExample',
  AnyFlag & { readonly desc: string }
> = {
  configExample: {
    type: 'string',
    desc: 'The path to write an example config file to.',
  },
  envExample: {
    type: 'string',
    desc: 'The path to write an example environment file to.',
  },
  configInput: {
    type: 'string',
    desc: `The path to the config file. Defaults to 'config.json'`,
    alias: 'c',
    default: './config.json',
  },
  envOutput: {
    type: 'string',
    desc: `The file path to write the output environment file to. Defaults to '.env'`,
    alias: 'o',
    default: './.env',
  },
};

(async () => {
  const helpText = help({
    name: 'npx @voxasoftworks/envi',
    flags,
  });

  const { flags: inputFlags } = meow(helpText, {
    importMeta: import.meta,
    flags,
  });

  const { configInput, envOutput, configExample, envExample } = inputFlags;

  try {
    const inputPath = resolve(cwd(), configInput as string);
    const inputFile = await readFile(inputPath, 'utf8');

    const runtimeConfig = JSON.parse(inputFile);
    const environment = traverse(runtimeConfig);

    try {
      const outputPath = resolve(cwd(), envOutput as string);
      await writeFile(outputPath, environment);
    } catch (error) {
      return Promise.reject(
        new Error(
          `Failed to write environment file to ${envOutput}: ${
            (error as Error).message
          }`
        )
      );
    }

    if (
      inputFlags.configExample !== undefined ||
      inputFlags.envExample !== undefined
    ) {
      const exampleConfig = removeNonRecordValues(runtimeConfig);

      if (inputFlags.configExample !== undefined) {
        try {
          const configExamplePath = resolve(
            cwd(),
            inputFlags.configExample as string
          );
          await writeFile(
            configExamplePath,
            JSON.stringify(exampleConfig, null, 4) + '\n'
          );
        } catch (error) {
          return Promise.reject(
            new Error(
              `Failed to write config example file to ${configExample}: ${
                (error as Error).message
              }`
            )
          );
        }

        if (inputFlags.envExample !== undefined) {
          const exampleEnvironment = traverse(exampleConfig);

          try {
            const envExamplePath = resolve(
              cwd(),
              inputFlags.envExample as string
            );
            await writeFile(envExamplePath, exampleEnvironment);
          } catch (error) {
            return Promise.reject(
              new Error(
                `Failed to write example environment file to ${envExample}: ${
                  (error as Error).message
                }`
              )
            );
          }
        }
      }
    }
  } catch (error) {
    return Promise.reject(
      new Error(
        `Failed to load your config file, ${configInput}: ${
          (error as Error).message
        }`
      )
    );
  }

  return undefined;
})();

export { traverse };
