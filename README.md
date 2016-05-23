# doctool

Tool for editing Valence UI-themed sites generated from Markdown

## Setup

Clone this repository,

```sh
git clone git://github.com/Brightspace/doctool.git
cd doctool
```

Install dependencies with `npm`,

```sh
npm install
```

## Running a build server

To run the build server, using the example project,

```sh
./src/cli.js example`
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

## CLI options

```sh
Usage: ./src/index.js DIR
Options:
arg             default    description
--wport         8080       web server port
--rport         8081       web-socket page refresh port
--out           .dist      output directory (relative to DIR if applicable)
--verbose       -          verbose output
--notify        -          send notifications of changes to the OS
```
