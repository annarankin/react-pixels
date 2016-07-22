export default class Square {
  constructor(ctx, size=100, center={x: 0, y: 0}, color='#000') {
    this.color = color
    this.size = size
    this.center = center
    this.ctx = ctx
    this.vertices = this.getVertices(center, size)
    this.path = this.getPath(this.vertices)
  }

  fill(){
    this.updatePath()
    const { ctx, path, color } = this

    ctx.fillStyle = color
    ctx.fill(path)
  }

  stroke(){
    this.updatePath()
    const { ctx, path, color } = this

    ctx.strokeStyle = '#eee'
    ctx.stroke(path)
  }

  // ------ private? -------

  updatePath() {
    this.vertices = this.getVertices(this.center, this.size)
    this.path = this.getPath(this.vertices)
  }

  getVertices(center, size) {
    return ([ {x: center.x, y: center.y},
      {x: center.x + size, y: center.y},
      {x: center.x + size, y: center.y + size},
      {x: center.x, y: center.y + size}
    ])
  }

  getPath(vertices){
    const path = new Path2D()

    path.moveTo(vertices[0].x, vertices[0].y);

    vertices.forEach(function(coords) {
      path.lineTo(coords.x, coords.y)
    })

    path.lineTo(vertices[0].x, vertices[0].y);

    return path
  }
}

// const Square = function Square(ctx, center, size){
//   this.ctx    = (function() { return ctx; })()
//   this.size   = (function() { return size; })()
//   this.center = (function() { return center; })()

//   this.fill = function fill() { draw() }
//   this.outline = function outline() { stroke() }

//   // Private functions
//   const stroke = function stroke() {
//     const sqr = new Path2D();
//     const sqrVertices = getVertices();

//     this.ctx.strokeStyle = 'rgb(200,200,200)';
//     sqr.moveTo(sqrVertices[0].x, sqrVertices[0].y);

//     sqrVertices.forEach(function(coords) {
//       sqr.lineTo(coords.x, coords.y)
//     })
//     this.ctx.stroke(sqr);
//   }.bind(this)

//   const draw = function draw(){

//   }.bind(this)

//   const getVertices = function getVertices() {
//     return ([ {x: center.x, y: center.y},
//       {x: center.x + size, y: center.y},
//       {x: center.x + size, y: center.y + size},
//       {x: center.x, y: center.y + size}
//     ])
//   }
// }

// module.exports = Square