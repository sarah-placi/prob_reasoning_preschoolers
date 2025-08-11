class Scene {
  constructor(canvasId1, canvasId2, width, height, shape, ballRadius, bgCol, borderCol,
    borderSize, scale, intervalRate, intervalRateAdaptive) {
    this.canvas1 = document.getElementById(canvasId1);
    this.canvas1.width = width || 500;
    this.canvas1.height = height || 500;
    this.shape = shape || 'rect';
    this.ballRadius = ballRadius;
    this.bgCol = bgCol || 'PaleTurquoise';
    this.borderCol = borderCol || 'Black'; //'Turquoise'
    this.borderSize = borderSize || 2;
    this.scale = scale || 100;
    this.intervalRate = intervalRate || 60; // Hz
    this.intervalRateAdaptive = intervalRateAdaptive || false;
    this.ctx1 = this.canvas1.getContext('2d');

    this.canvas2 = document.getElementById(canvasId2);
    this.canvas2.width = this.canvas1.width * 0.4;
    this.canvas2.height = this.canvas1.height * 0.2;
    this.ctx2 = this.canvas2.getContext('2d');

    this.scenePhysics1 = new ScenePhysics(this.intervalRate, this.intervalRateAdaptive,
      this.canvas1.width, this.canvas1.height, this.scale);
    this.world1 = [];
    //this.world1 = new Set();
    this.bullet = false;
    this.urnSpecs1 = new Set();
    this.ballSpecs1 = new Set();
    this.bodiesState1 = new Set();

    this.scenePhysics2 = new ScenePhysics(this.intervalRate, this.intervalRateAdaptive,
      this.canvas2.width, this.canvas2.height, this.scale);
    this.world2 = [];
    this.urnSpecs2 = new Set();
    this.ballSpecs2 = new Set();
    this.bodiesState2 = new Set();

    this.canvas1.style.backgroundColor = this.bgCol;
    //this.canvas1.style.border = this.borderSize + 'px solid ' + this.borderCol;
    this.canvas1.radius = Math.min(this.canvas1.width, this.canvas1.height) / 2;
    if (shape == 'circle') {
      this.canvas1.style.borderRadius = this.canvas1.radius + 'px';
    } else {
      this.canvas1.style.borderRadius = '1px';
    }

    this.canvas2.style.backgroundColor = this.bgCol;
    //this.canvas2.style.border = this.borderSize + 'px solid ' + this.borderCol;
    this.canvas2.style.borderRadius = '1px';

    const w = this.canvas1.width,
      h = this.canvas1.height,
      s = this.scale,
      bC = this.borderCol,
      bS = this.borderSize,
      w2 = this.canvas2.width,
      h2 = this.canvas2.height,
      d = this.ballRadius * 2;
    if (shape == 'circle') {
      let nEdges = 72,
        r = this.canvas1.radius,
        hL = Math.abs(r * Math.cos(Math.PI / nEdges)),
        v = [],
        m = [];
      for (let i = 0; i < nEdges; i++) {
        v.push({
          x: w / 2 + r * Math.cos(2 * Math.PI * i / nEdges),
          y: h / 2 + r * Math.sin(2 * Math.PI * i / nEdges)
        });
      }
      for (let i = 0; i < nEdges; i++) {
        if (i + 1 == nEdges) {
          m.push({ x: (v[i].x + v[0].x) / 2, y: (v[i].y + v[0].y) / 2 });
        } else {
          m.push({ x: (v[i].x + v[i + 1].x) / 2, y: (v[i].y + v[i + 1].y) / 2 });
        }
      }
      for (let i = 0; i < nEdges; i++) {
        this.urnSpecs1.add({
          id: 'urnEdge' + i, x: m[i].x / s, y: m[i].y / s,
          halfWidth: hL / s, halfHeight: bS / s,
          angle: Math.PI / 2 + 2 * Math.PI * i / nEdges + Math.PI / nEdges,
          color: bC
        });
      }
    } else {
      this.urnSpecs1.add({
        id: 'urnBottom', x: w * 0.5 / s, y: h * (1 - bS) / s,
        halfWidth: w * 0.5 / s, halfHeight: h * bS / s, color: bC
      });
      this.urnSpecs1.add({
        id: 'urnTop', x: w * 0.5 / s, y: h * bS / s,
        halfWidth: w * 0.5 / s, halfHeight: h * bS / s, color: bC
      });
      this.urnSpecs1.add({
        id: 'urnLeft', x: w * bS / s, y: h * 0.5 / s,
        halfWidth: w * bS / s, halfHeight: h * 0.5 / s, color: bC
      });
      this.urnSpecs1.add({
        id: 'urnRight', x: w * (1 - bS) / s, y: h * 0.5 / s,
        halfWidth: w * bS / s, halfHeight: h * 0.5 / s, color: bC
      });
    }
    /* this.urnSpecs2.add({
      id: 'urnTop2', x: w2 * 0.5 / s, y: bS * 0.5 / s,
      halfWidth: w2 * 0.5 / s, halfHeight: bS * 0.5 / s, color: bC
    }); */
    this.urnSpecs2.add({
      id: 'urnTop2a', x: (w2 - d * 1.1) * 0.25 / s, y: bS * 0.5 / s,
      halfWidth: (w2 - d * 1.1) * 0.25 / s, halfHeight: bS * 0.5 / s, color: bC
    });
    this.urnSpecs2.add({
      id: 'urnTop2b', x: (w2 * 0.5 - d * 1.1 * 0.25) / s, y: bS * 0.5 / s,
      halfWidth: d * 1.1 * 0.25 / s, halfHeight: bS * 0.5 / s, color: bC
    });
    this.urnSpecs2.add({
      id: 'urnTop2c', x: (w2 * 0.5 + d * 1.1 * 0.25) / s, y: bS * 0.5 / s,
      halfWidth: d * 1.1 * 0.25 / s, halfHeight: bS * 0.5 / s, color: bC
    });
    this.urnSpecs2.add({
      id: 'urnTop2d', x: (w2 - (w2 - d * 1.1) * 0.25) / s, y: bS * 0.5 / s,
      halfWidth: (w2 - d * 1.1) * 0.25 / s, halfHeight: bS * 0.5 / s, color: bC
    });
    this.urnSpecs2.add({
      id: 'urnBottom2', x: w2 * 0.5 / s, y: (h2 - bS * 0.5) / s,
      halfWidth: w2 * 0.5 / s, halfHeight: bS * 0.5 / s, color: bC
    });
    this.urnSpecs2.add({
      id: 'urnLeft2', x: bS * 0.5 / s, y: h2 * 0.5 / s,
      halfWidth: bS * 0.5 / s, halfHeight: h2 * 0.5 / s, color: bC
    });
    this.urnSpecs2.add({
      id: 'urnRight2', x: (w2 - bS * 0.5) / s, y: h2 * 0.5 / s,
      halfWidth: bS * 0.5 / s, halfHeight: h2 * 0.5 / s, color: bC
    });
  }

  setBodiesCanvas1(n1, color1, n2, color2, r) {
    let { canvas1, scale, scenePhysics1, world1, bullet, urnSpecs1, ballSpecs1, bodiesSpecs1 } = this;
    const shuffleArray = array => { // Fisher-Yates shuffle algorithm
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        // swap array[i] and array[j] by destructuring assignment
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    let tmpArray1 = Array(n1).fill(1),
      tmpArray2 = Array(n2).fill(2),
      tmpArray = [...tmpArray1, ...tmpArray2],
      shuffledArray = shuffleArray(tmpArray);
    for (let i = 0; i < n1 + n2; i++) {
      let max = canvas1.radius * 0.7,
        rnd1 = Math.floor(Math.random() * (2 * max + 1)) - max, // random between max and -max (both included)
        rnd2 = Math.floor(Math.random() * (2 * max + 1)) - max,
        id = 'ball' + (i + 1),
        //x = canvas1.width * 0.5 / scale,
        //y = canvas1.height * 0.5 / scale,
        x = (canvas1.width * 0.5 + rnd1) / scale,
        y = (canvas1.height * 0.5 + rnd2) / scale,
        color = null,
        radius = r / scale;
      //if (i < n1) color = color1
      if (shuffledArray[i] == 1) color = color1
      else color = color2
      let b = { id: id, x: x, y: y, color: color, radius: radius };
      ballSpecs1.add(b);
    }
    bodiesSpecs1 = new Set([...urnSpecs1, ...ballSpecs1]);

    for (let item of bodiesSpecs1) {
      const nullCenter = { x: null, y: null };
      if (item.radius) {
        world1[item.id] = new CircleTh(item.id, item.x, item.y, item.angle, nullCenter,
          item.color, item.colCenter, item.colBorder, item.radius);
        //world1.add(new CircleTh(item.id, item.x, item.y, item.angle, nullCenter, item.color, item.radius));
      } else if (item.polys) {
        world1[item.id] = new PolygonTh(item.id, item.x, item.y, item.angle, nullCenter,
          item.color, item.colCenter, item.colBorder, item.polys);
        //world1.add(new PolygonTh(item.id, item.x, item.y, item.angle, nullCenter, item.color, item.polys));
      } else {
        world1[item.id] = new RectangleTh(item.id, item.x, item.y, item.angle, nullCenter,
          item.color, item.colCenter, item.colBorder, item.halfWidth, item.halfHeight);
        //world1.add(new RectangleTh(item.id, item.x, item.y, item.angle, nullCenter, item.color, 
        //  item.halfWidth, item.halfHeight));
      }
    }
    scenePhysics1.setBodies(world1, bullet);
  }

  setBodiesCanvas2(n1, color1, n2, color2, r) {
    let { canvas2, scale, scenePhysics2, world2, bullet, urnSpecs2, ballSpecs2, bodiesSpecs2 } = this;
    for (let i = 0; i < n1 + n2; i++) {
      let id = 'ball' + (i + 1),
        x = canvas2.width * 0.5 / scale,
        y = r / scale,
        color = null,
        radius = r / scale;
      if (i < n1) color = color1
      else color = color2
      let b = { id: id, x: x, y: y, color: color, radius: radius };
      ballSpecs2.add(b);
    }
    bodiesSpecs2 = new Set([...urnSpecs2, ...ballSpecs2]);

    for (let item of bodiesSpecs2) {
      const nullCenter = { x: null, y: null };
      if (item.radius) {
        world2[item.id] = new CircleTh(item.id, item.x, item.y, item.angle, nullCenter,
          item.color, item.colCenter, item.colBorder, item.radius);
        //world1.add(new CircleTh(item.id, item.x, item.y, item.angle, nullCenter, item.color, item.radius));
      } else if (item.polys) {
        world2[item.id] = new PolygonTh(item.id, item.x, item.y, item.angle, nullCenter,
          item.color, item.colCenter, item.colBorder, item.polys);
        //world1.add(new PolygonTh(item.id, item.x, item.y, item.angle, nullCenter, item.color, item.polys));
      } else {
        world2[item.id] = new RectangleTh(item.id, item.x, item.y, item.angle, nullCenter,
          item.color, item.colCenter, item.colBorder, item.halfWidth, item.halfHeight);
        //world1.add(new RectangleTh(item.id, item.x, item.y, item.angle, nullCenter, item.color, 
        //  item.halfWidth, item.halfHeight));
      }
    }
    scenePhysics2.setBodies(world2, bullet);
  }

  openDoorCanvas2(angle) {
    let { scenePhysics2 } = this;
    scenePhysics2.openDoor(angle);
  }

  setImpulseCanvas1(angle, power) {
    let { ballSpecs1, scenePhysics1 } = this;
    for (let item of ballSpecs1) {
      scenePhysics1.applyImpulse(item.id, parseInt(angle), parseInt(power));
    }
  }

  setImpulseCanvas2(angle, power) {
    let { ballSpecs2, scenePhysics2 } = this;
    for (let item of ballSpecs2) {
      scenePhysics2.applyImpulse(item.id, parseInt(angle), parseInt(power));
    }
  }

  updateCanvas1() {
    let { scenePhysics1, bodiesState1, world1 } = this;
    scenePhysics1.update();
    bodiesState1 = scenePhysics1.getState();
    for (let id in bodiesState1) {
      let body = world1[id];
      if (body) body.update(bodiesState1[id]);
    }
    /* let i = 0;
    for (let body of world1) {
      console.log('i = ' + i)
      console.log('bodiesState1[i] = ' + bodiesState1[i])
      if (body) body.update(bodiesState1[i])
      i++;
    } */
  }

  updateCanvas2() {
    let { scenePhysics2, bodiesState2, world2 } = this;
    scenePhysics2.update();
    bodiesState2 = scenePhysics2.getState();
    for (let id in bodiesState2) {
      let body = world2[id];
      if (body) body.update(bodiesState2[id]);
    }
    /* let i = 0;
    for (let body of world2) {
      console.log('i = ' + i)
      console.log('bodiesState2[i] = ' + bodiesState2[i])
      if (body) body.update(bodiesState2[i])
      i++;
    } */
  }

  drawCanvas1() {
    let { canvas1, ctx1, scale, world1 } = this;
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    for (let id in world1) {
      let body = world1[id];
      body.draw(ctx1, scale);
    }
    /* for (let body in world1) {
      body.draw(ctx1, scale);
    } */
  }

  drawCanvas2() {
    let { canvas2, ctx2, scale, world2 } = this;
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    for (let id in world2) {
      let body = world2[id];
      body.draw(ctx2, scale);
    }
    /* for (let body in world2) {
      body.draw(ctx2, scale);
    } */
  }

  maskCanvas1(k, color) {
    const { canvas1, ctx1 } = this;
    let draw = false;
    const kMin = 0;
    const wMin = -0.5;
    if (k < wMin) {
      draw = true;
    }
    if (k < kMin) {
      k = kMin;
    }
    ctx1.fillStyle = color;
    ctx1.fillRect(0, canvas1.height * k, canvas1.width, canvas1.height);
    return draw;
  }

  unmaskCanvas1(k, color) {
    const { canvas1, ctx1 } = this;
    let unmask = true;
    const kMax = 1;
    if (k > kMax) {
      k = kMax;
      unmask = false;
    }
    ctx1.fillStyle = color;
    ctx1.fillRect(0, canvas1.height * k, canvas1.width, canvas1.height);
    return unmask;
  }

}
