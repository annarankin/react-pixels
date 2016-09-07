# Pixelectronica :fire:

Electron/React/Redux application for creating pixel art!

![Example Image](./pixelling.gif)

## Installation

1. Clone the repo!
1. `npm run install`!
1. `npm start`!
1. Doodle!!

Work in progress. Right now, save/load don't work.

## Tools

- [Electron](http://electron.atom.io/) - awesomely simple tool for building cross-platform apps! SO EXCITE
- [React](https://facebook.github.io/react/) - for building HTML components and managing UI
- [Redux](http://redux.js.org/) - for retaining and managing app-wide state
- [lodash](https://lodash.com/) - for workin' with data structures more easily

# Features

## Done!

### Pencil & Fill tools
  - Need to implement decent flood-fill ✅
  - Add new "modes" - pencil/fill ✅
  - Allow user to choose using UI ✅

### Palette Customization
  - Create interface to allow users to change/save/export/whatnot their own color palettes. ✅
  - How to persist? Shareable? **(Using presets for now.)**

### Save/Load
  - Allow users to save/load JSON objects representing image.

## Next:

### Export
  - Save png to user's comp

### Layers
  - Allow multiple layers! _(Note: Abstract the grid to layer)_
  - Allow users to move individual layers

### Resize Canvas
  - Allow user to use slider/input/whatever to choose resolution of image.
  - What happens when they resize after drawing? New canvas? Lose info?

## Later:

### Replay
  - Allow user to "replay" the creation of their image.
  - Possibly add ability to export this as a gif!! That would be cooooool.

### Gradient Tool
  - Fun tool to allow patterned fill! Maybe.

### Social media sharing?
  - Meh. Maybe.