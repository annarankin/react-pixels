export default class Square {
  constructor(ctx, size=100, center={x: 0, y: 0}, color=null) {
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
    ctx.lineWidth   = 0.25
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