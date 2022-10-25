# @voxasoftworks/envi

A simple library to traverse configuration files and produce environment files.

Replace your `.env` file with an easier to read `config.json`.

The `@voxasoftworks/envi` command will load `config.json` from the current working directory, and output a `.env` file in the same directory.

`envi` converts

```json
{
  "SERVICE_A": {
    "API": {
      "API_TOKEN": "1234567890",
      "API_ENDPOINT": "https://api-a.example.com",
      "VERSION": "v2"
    }
  },
  "SERVICE_B": {
    "API": {
      "TOKEN": "0987654321",
      "ENDPOINT": "https://api-b.example.com",
      "VERSION": "v1"
    }
  },
  "WEBSITE": {
    "API": {
      "CONSUMER_KEY": "1234567890",
      "CONSUMER_SECRET": "0987654321",
      "API_ENDPOINT": "https://api-website.example.com",
      "API_VERSION": "v1"
    },
    "EMAIL": {
      "HOST": "smtp.example.com",
      "PORT": "587",
      "USERNAME": "hello@example.com",
      "PASSWORD": "example"
    }
  }
}
```

into this...

```env
SERVICE_A_API_API_TOKEN="1234567890"
SERVICE_A_API_API_ENDPOINT="https://api-a.example.com"
SERVICE_A_API_VERSION="v2"
SERVICE_B_API_TOKEN="0987654321"
SERVICE_B_API_ENDPOINT="https://api-b.example.com"
SERVICE_B_API_VERSION="v1"
WEBSITE_API_CONSUMER_KEY="1234567890"
WEBSITE_API_CONSUMER_SECRET="0987654321"
WEBSITE_API_API_ENDPOINT="https://api-website.example.com"
WEBSITE_API_API_VERSION="v1"
WEBSITE_EMAIL_HOST="smtp.example.com"
WEBSITE_EMAIL_PORT="587"
WEBSITE_EMAIL_USERNAME="hello@example.com"
WEBSITE_EMAIL_PASSWORD="example"
```

## Installation

When installing to a project, simply use `yarn` or `npm`.

```bash
yarn add -D @voxasoftworks/envi
```

or 

```bash
npm install --save-dev @voxasoftworks/envi
```

You can also use `npx` to execute the package immediately.

```bash
npx @voxasoftworks/envi
```

## Usage

In your `package.json`, simply add `envi` to get started.

```json
{
    "scripts": {
        "setenv": "envi"
    }
}
```

By default, the command will load `config.json` from the current working directory, and output a `.env` file in the same directory.

### Generating an environment file

Using the `--configInput` and `--envOutput`, you can specify the path to the configuration file and the path to the environment file.

```bash
npx @voxasoftworks/envi generate --config ./env.json --output ./env/.env
```

### Generating example files

Using the `--configExample` and `--envExample` flags, you can generate example configuration and environment files.

```bash
npx @voxasoftworks/envi --configExample ./config.example.json
npx @voxasoftworks/envi --envExample ./config.example.json
```
