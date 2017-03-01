# react-build-dist
A simple utility for compiling your React components to standalone modules.

> Ideally, you should never need to touch Webpack and Babel if all you want to do is to make and publish React components.

The idea behind this tool is similar to [React-Build-Lib](https://github.com/adrianmcli/react-build-lib), but since this tool deals with Webpack, it still does not work quite well. PRs and suggestions are welcome.

# The Problem

Traditionally, in order to compile React components to standalone modules, you'll need to install and setup Webpack and Babel with the appropriate presets. This is a huge hassle if we want (React component) library authors to focus on creating their wonderful components.

We want library authors to never need to touch Webpack and Babel if all they want to do is make and share React components.

# The Goal

Ideally, we want the following workflow for React component library authors:

1. Install the package:

  ```bash
  yarn add --dev react-build-dist
  ```

2. Add a script to their `package.json` file:

  ```json
  "scripts": {
    "build:dist": "react-build-dist"
  }
  ```
3. Now, everytime `npm run build:dist` is run, Webpack will compile the user's React components from the `src` folder into a bundled javascript file inside the `dist` folder (along with a minified version) for standalone usage.


## API

### `--bundle-name [filename]`

Output bundle filename.

```bash
react-build-dist --bundle-name MyCoolComponent.js
```

### `--stage-0`

Turn on stage-0 for experimental features.

```bash
react-build-dist --stage-0
```

### `--package-json [dirPath]`

Path to package.json directory with react-build-dist config override.

We will try to guess your projects root directory, but depending on your installation configuration
we might not be able to reliably find it. This param allows you to manually pass it in.

```bash
react-build-dist --package-json $(pwd)
```

## Config Overrides

In your `package.json` you can override some of the default build settings. This is useful if your
project uses more than just React as an external.

In your package json add a key of `react-build-dist` and you can override any of the following:
  - resolveLoader
  - entry
  - output
  - externals
  - module
  - plugins

Example:

```json
  "react-build-dist": {
    "externals": {
      "react": "react",
      "react-dom": "react-dom"
    }
  }
```
