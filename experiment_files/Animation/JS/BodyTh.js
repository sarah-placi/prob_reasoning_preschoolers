class BodyTh {
  constructor(id, x, y, angle, center, color, colCenter, colBorder) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.angle = angle || 0;
    this.center = center;
    this.color = color || 'green';
    this.colCenter = colCenter || 'firebrick';
    this.colBorder = colBorder || 'black';
  }
  
  update(state) {
    this.x = state.x;
    this.y = state.y;
    this.angle = state.a;
    this.center = state.c;
  }
  
  draw(ctx, scale) {
    ctx.fillStyle = this.colCenter;
    ctx.strokeStyle = this.colBorder;
    ctx.beginPath();
    ctx.arc(this.center.x * scale, this.center.y * scale, 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}

class CircleTh extends BodyTh {
  constructor(id, x, y, angle, center, color, colCenter, colBorder, radius) {
    color = color || 'aqua';
    //Pass params to super class
    super(id, x, y, angle, center, color, colCenter, colBorder);
    this.radius = radius;
  }
  
  draw(ctx, scale) {
    ctx.save();
    ctx.translate(this.x * scale, this.y * scale);
    ctx.rotate(this.angle);
    ctx.translate(-(this.x) * scale, -(this.y) * scale);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.colBorder;
    ctx.beginPath();
    ctx.arc(this.x * scale, this.y * scale, this.radius * scale, 0, Math.PI * 2, true);
    //ctx.moveTo(this.x * scale, this.y * scale);
    //ctx.lineTo((this.x) * scale, (this.y + this.radius) * scale);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    super.draw(ctx, scale);
  }
}

class RectangleTh extends BodyTh {
  constructor(id, x, y, angle, center, color, colCenter, colBorder, halfWidth, halfHeight) {
    //Pass params to super class
    super(id, x, y, angle, center, color, colCenter, colBorder);
    this.halfWidth = halfWidth;
    this.halfHeight = halfHeight;
  }

  draw(ctx, scale) {
    ctx.save();
    ctx.translate(this.x * scale, this.y * scale);
    ctx.rotate(this.angle);
    ctx.translate(-(this.x) * scale, -(this.y) * scale);
    ctx.fillStyle = this.color;
    ctx.fillRect((this.x - this.halfWidth) * scale,
                 (this.y - this.halfHeight) * scale,
                 (this.halfWidth * 2) * scale,
                 (this.halfHeight * 2) * scale);
    ctx.restore();
    //super.draw(ctx, scale);
  }
}

class PolygonTh extends BodyTh {
  constructor(id, x, y, angle, center, color, colCenter, colBorder, polys) {
    //Pass params to super class
    super(id, x, y, angle, center, color, colCenter, colBorder);
    this.polys = polys;
  }
  
  draw(ctx, scale) {
    ctx.save();
    ctx.translate(this.x * scale, this.y * scale);
    ctx.rotate(this.angle);
    ctx.translate(-(this.x) * scale, -(this.y) * scale);
    ctx.fillStyle = this.color;
    for (let i = 0; i < this.polys.length; i++) {
      let points = this.polys[i];
      ctx.beginPath();
      ctx.moveTo((this.x + points[0].x) * scale, (this.y + points[0].y) * scale);
      for (let j = 1; j < points.length; j++) {
        ctx.lineTo((points[j].x + this.x) * scale, (points[j].y + this.y) * scale);
      }
      ctx.lineTo((this.x + points[0].x) * scale, (this.y + points[0].y) * scale);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
    super.draw(ctx, scale);
  }
}
