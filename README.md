# doctool

Tool for editing Valence UI-themed sites generated from Markdown

## Setup

You'll probably want to install this globally with `-g`. Run this:

```sh
npm install -g git+ssh://github.com/Brightspace/doctool
```

## Running a build server

Well run the tool on the example project in this repo. First, clone the repo

```sh
git clone git+ssh://github.com/Brightspace/doctool
cd doctool
```

Next, start doctool in interactive mode:

```sh
doctool --interactive example
```

Your browser will open up a window to the rendered webpage.
You can edit files in your favourite editor and the pages will render and reload when you save.

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
doctool example
```

## CLI options

```
Usage: doctool <inputDir> [<outputDir>] OPTIONS

Arguments       Default    Description
inputDir        -          input files directory
outputDir       .dist      output directory

Options         Default    Description
--interactive   -          runs a web server and automatically re-renders and reloads browsers
--browser       true       open a browser
--wport         8080       web server port
--rport         8081       web-socket page refresh port
--verbose       -          verbose output
--notify        -          send notifications of changes to the OS
--help          -          this screen
```

## Developing
Clone this repository,

```sh
git clone git+ssh://github.com/Brightspace/doctool
cd doctool
```

Install dependencies with `npm`,

```sh
npm install
```

To stop yourself from going insane, you'll probably want the `--no-browser` argument when using `--interactive` to avoid spamming your tab bar.

```sh
./src/cli.js --interactive --no-browser example
```
