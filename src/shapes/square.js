export default class Square {
  constructor() {
    
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
//     const sqr = new Path2D();
//     const sqrVertices = getVertices();
                        
//     this.ctx.fillStyle = `rgb(${Math.round(center.y * 0.25)},${Math.round(center.y * 0.25)},${Math.round(center.y * 0.75)})`;
//     sqr.moveTo(sqrVertices[0].x, sqrVertices[0].y);

//     sqrVertices.forEach(function(coords) {
//       sqr.lineTo(coords.x, coords.y)
//     })
//     this.ctx.fill(sqr);
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