# doctool

Tool for editing Valence UI-themed sites generated from Markdown

## Setup

You'll probably want to install this globally with `-g`. Run this:

```sh
npm install -g https://github.com/j3parker/doctool
```

## Running a build server

Well run the tool on the example project in this repo. First, clone the repo

```sh
git clone git://github.com/j3parker/doctool.git
cd doctool/example
```

```sh
doctool --interactive
```

Your browser will open up a window to the rendered webpage.
You can edit files and the pages will render and reload as you save.
For maximum effect, try using [Visual Studio Code](https://code.visualstudio.com/) with the following user settings:

```json
{
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 300
}
```

## Doing a single build

Just remove the `--interactive` flag

```sh
./src/cli.js example
```

## CLI options

```
Usage: /Users/jparker/src/d2l-doc/src/cli.js [inputDir] [outputDir] OPTIONS

Arguments       Default    Description
inputDir        .          input files directory
outputDir       .dist      output directory

Options         Default    Description
--interactive   -          runs a web server and automatically re-renders and reloads browsers
--wport         8080       web server port
--rport         8081       web-socket page refresh port
--verbose       -          verbose output
--notify        -          send notifications of changes to the OS
--help          -          this screen
```

## Developing
Clone this repository,

```sh
git clone git://github.com/j3parker/doctool.git
cd doctool
```

Install dependencies with `npm`,

```sh
npm install
```

