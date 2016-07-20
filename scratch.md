App.js (wrapped in provider)
.___________________________________.
|                                   |
|  | Undo/Redo | (connected)        |
|  o-----------------------------o  |
|  | GameBoard                   |  |
|  |                             |  |
|  | (receives props)            |  |
|  |                             |  |
|  |                             |  |
|  |                             |  |
|  |                             |  |
|  o-----------------------------o  |
|  | Color Palette | Size Choice |  |
|______(connected) _________________|

Redux Store:

Colors Reducer - in charge of tracking current drawing color
Pixels Reducer - in charge of storing and updating individual pixel colors to be rendered
