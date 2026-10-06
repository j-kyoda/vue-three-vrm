class LightModel {
  constructor() {
    this.light = null
  }

  // getter
  get type() {
    if (this.light.isAmbientLight) {
      return 'ambient'
    }
    if (this.light.isDirectionalLight) {
      return 'directional'
    }
    if (this.light.isSpotLight) {
      return 'spot'
    }
    if (this.light.isPointLight) {
      return 'point'
    }
    if (this.light.isLight) {
      return 'light'
    }
    return 'UNKNOWN'
  }

  // methods
  setModel(model) {
    this.light = model
  }

  getModel() {
    return this.light
  }

  setColor(color) {
    if (!this.light) {
      return
    }
    if (color !== null) {
      this.light.color = color
    }
  }

  setIntensity(intensity) {
    if (!this.light) {
      return
    }
    if (intensity !== null) {
      this.light.intensity = intensity
    }
  }

  setPosition(pos) {
    if (!this.light) {
      return
    }
    if (pos) {
      this.light.position.set(pos.x, pos.y, pos.z)
    } else {
      this.light.position.set(0, 0, 0)
    }
  }

  getPosition() {
    if (!this.light) {
      return null
    }
    return {
      x: this.light.position.x,
      y: this.light.position.y,
      z: this.light.position.z,
    }
  }

  setTarget(pos) {
    if (!this.light) {
      return
    }
    if (!this.light.target) {
      return
    }
    if (pos) {
      this.light.target.position.set(pos.x, pos.y, pos.z)
    }
  }

  getTarget() {
    if (!this.light) {
      return null
    }
    if (!this.light.target) {
      return null
    }
    return {
      x: this.light.target.position.x,
      y: this.light.target.position.y,
      z: this.light.target.position.z,
    }
  }

}

export {
  LightModel
}
