# Stroke-by-stroke history

- [ ] Create a Stroke History reducer that tracks groups of pixels that changed at the same time - ie: a line drawn while holding the mouse key down.
  - Possibly just modify the pixelData reducer to accept arrays of data.
- [ ] Modify `combineReducers` so that only stroke history is undoable
- [ ] Modify `GameBoard` so that it tracks strokes and adds them to history
  - Separate pixel-fill logic from action-dispatch-related logic