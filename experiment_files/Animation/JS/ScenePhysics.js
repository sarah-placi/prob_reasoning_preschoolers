class ScenePhysics {
  constructor(intervalRate, adaptive, width, height, scale) {
    this.intervalRate = parseInt(intervalRate);
    this.adaptive = adaptive;
    this.lastTimestamp = Date.now();
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.bodiesMap = {};
    this.world = new Box2D.Dynamics.b2World(
      new Box2D.Common.Math.b2Vec2(0, 10), // gravity
      true  // allow sleep
    );
    this.fixDef = new Box2D.Dynamics.b2FixtureDef;
    this.fixDef.density = 1.0;
    this.fixDef.friction = 0.5;
    this.fixDef.restitution = 0.7;
  }
  update() {
    let start = Date.now();
    let stepRate = (this.adaptive) ? (start - this.lastTimestamp) / 1000 : (1 / this.intervalRate);
    this.lastTimestamp = start;
    this.world.Step(
      stepRate, // frame-rate
      10,       // velocity iterations
      10        // position iterations
    );
    this.world.ClearForces();
    return (Date.now() - start);
  }

  getState() {
    let state = {};
    for (var b = this.world.GetBodyList(); b; b = b.m_next) {
      if (b.IsActive() && typeof b.GetUserData() !== 'undefined' && b.GetUserData() != null) {
        state[b.GetUserData()] = this.getBodySpec(b);
      }
    }
    return state;
  }

  getBodySpec(b) {
    return {
      x: b.GetPosition().x, y: b.GetPosition().y, a: b.GetAngle(),
      c: { x: b.GetWorldCenter().x, y: b.GetWorldCenter().y }
    };
  }

  setBodies(bodies, enableBullet) {
    let bodyDef = new Box2D.Dynamics.b2BodyDef;
    for (let id in bodies) {
      let b = bodies[id];
      if (b.id.includes('urn')) {
        //bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_kinematicBody;
      } else {
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
      }
      bodyDef.position.x = b.x;
      bodyDef.position.y = b.y;
      bodyDef.userData = b.id;
      bodyDef.angle = b.angle;
      if (enableBullet && b.radius) bodyDef.bullet = true;
      let body = this.registerBody(bodyDef);
      if (b.radius) {
        this.fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(b.radius);
        body.CreateFixture(this.fixDef);
      } else if (b.polys) {
        for (let j = 0; j < b.polys.length; j++) {
          let points = b.polys[j];
          let vecs = [];
          for (let i = 0; i < points.length; i++) {
            let vec = new Box2D.Common.Math.b2Vec2();
            vec.Set(points[i].x, points[i].y);
            vecs[i] = vec;
          }
          this.fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
          this.fixDef.shape.SetAsArray(vecs, vecs.length);
          body.CreateFixture(this.fixDef);
        }
      } else {
        this.fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
        this.fixDef.shape.SetAsBox(b.halfWidth, b.halfHeight);
        body.CreateFixture(this.fixDef);
      }
    }
  }

  registerBody(bodyDef) {
    let body = this.world.CreateBody(bodyDef);
    this.bodiesMap[body.GetUserData()] = body;
    return body;
  }

  addRevoluteJoint(body1Id, body2Id, params) {
    let body1 = this.bodiesMap[body1Id];
    let body2 = this.bodiesMap[body2Id];
    let joint = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
    joint.Initialize(body1, body2, body1.GetWorldCenter());
    if (params && params.motorSpeed) {
      joint.motorSpeed = params.motorSpeed;
      joint.maxMotorTorque = params.maxMotorTorque;
      joint.enableMotor = true;
    }
    this.world.CreateJoint(joint);
  }

  applyImpulse(bodyId, angle, power) {
    let body = this.bodiesMap[bodyId];
    body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(
      Math.cos(angle * (Math.PI / 180)) * power,
      Math.sin(angle * (Math.PI / 180)) * power),
      body.GetWorldCenter()
    );
  }

  openDoor(angle) {
    let x1, y1, l1, x2, y2, l2, shape, r, angleRad, newX, newY;
    for (let b = this.world.GetBodyList(); b; b = b.m_next) {
      if (b.GetUserData() == 'urnTop2a') {
        x1 = b.GetPosition().x;
        y1 = b.GetPosition().y;
        shape = b.GetFixtureList().GetShape().GetVertices();
        l1 = Math.abs(shape[0].x);
      }
      if (b.GetUserData() == 'urnTop2d') {
        x2 = b.GetPosition().x;
        y2 = b.GetPosition().y;
        shape = b.GetFixtureList().GetShape().GetVertices();
        l2 = Math.abs(shape[0].x);
      }
    }
    for (let b = this.world.GetBodyList(); b; b = b.m_next) {
      if (b.GetUserData() == 'urnTop2b') {
        shape = b.GetFixtureList().GetShape().GetVertices();
        r = Math.abs(shape[0].x);
        angleRad = angle * Math.PI / 180;
        newX = x1 + l1 + r * Math.cos(angleRad);
        newY = y1 + r * Math.sin(angleRad);
        b.SetPositionAndAngle(new Box2D.Common.Math.b2Vec2(newX, newY), angleRad);
        b.SetAwake(true);
      }
      if (b.GetUserData() == 'urnTop2c') {
        shape = b.GetFixtureList().GetShape().GetVertices();
        r = Math.abs(shape[0].x);
        angleRad = (180 - angle) * Math.PI / 180;
        newX = x2 - l2 + r * Math.cos(angleRad);
        newY = y2 + r * Math.sin(angleRad);
        b.SetPositionAndAngle(new Box2D.Common.Math.b2Vec2(newX, newY), angleRad);
        b.SetAwake(true);
      }
    }
  }
}
