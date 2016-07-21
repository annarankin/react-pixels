export default class Square {
  constructor(ctx, size=100, center={x: 0, y: 0}) {
    this.size = size
    this.center = center
    this.ctx = ctx
    this.vertices = this.getVertices(center, size)
    this.path = this.getPath(this.vertices)
  }

  fill(){
    const { ctx, center, size } = this
    const vertices = this.getVertices(center, size)
    const path = this.getPath(vertices)
    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.fill(path)
  }

  stroke(){
    const { ctx, center, size } = this
    const vertices = this.getVertices(center, size)
    const path = this.getPath(vertices)
    ctx.strokeStyle = 'rgb(0,0,0)'
    ctx.stroke(path)
  }

  // ------ private? -------

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