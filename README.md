# @voxasoftworks/envi

A simple library to traverse configuration files and produce environment files.

Replace your `.env` file with an easier to read `config.json`.

The `@voxasoftworks/envi` command will load `config.json` from the current working directory, and output a `.env` file in the same directory.

## Installation

```bash
yarn add -D @voxasoftworks/envi
```

## Usage

By default, the command will load `config.json` from the current working directory, and output a `.env` file in the same directory.

```json
// In package.json...
{
    "scripts": {
        "config": "@voxasoftworks/envi"
    }
}
```

### Generating an environment file

Using the `--configInput` and `--envOutput`, you can specify the path to the configuration file and the path to the environment file.

```bash
@voxasoftworks/envi generate --config ./env.json --output ./env/.env
```

### Generating example files

Using the `--configExample` and `--envExample` flags, you can generate example configuration and environment files.

```bash
@voxasoftworks/envi --configExample ./config.example.json
```
