class VrmModel {
  constructor() {
    this.vrm = null
  }
  // getter
  get scene() {
    if (this.vrm) {
      return this.vrm.scene
    }
    return null
  }

  // methods
  setModel(vrm_) {
    this.vrm = vrm_
  }

  setPosition(pos) {
    this.vrm.scene.position.x = pos.x
    this.vrm.scene.position.y = pos.y
    this.vrm.scene.position.z = pos.z
  }

  getPosition() {
    return {
      x: this.vrm.scene.position.x,
      y: this.vrm.scene.position.y,
      z: this.vrm.scene.position.z,
    }
  }

  setPose(pose) {
    if (this.vrm) {
      this.vrm.humanoid.setNormalizedPose(pose)
    }
  }

  getPose() {
    if (this.vrm) {
      return this.vrm.humanoid.getNormalizedPose()
    }
    return null
  }

  updatePose() {
    if (this.vrm) {
      this.vrm.humanoid.update()
    }
  }

  resetPose() {
    if (this.vrm) {
      this.vrm.humanoid.resetNormalizedPose()
    }
  }

  getBoneNode(bone) {
    if (this.vrm) {
      return this.vrm.humanoid.getNormalizedBoneNode(bone)
    }
    return null
  }

  isValid() {
    if (this.vrm) {
      return true
    }
    return false
  }

  getBoneRotate(bone) {
    const node = this.getBoneNode(bone)
    if (node) {
      return {
        'x': node.rotation.x,
        'y': node.rotation.y,
        'z': node.rotation.z
      }
    }
    return null
  }

  setBoneRotate(bone, x, y, z) {
    const node = this.getBoneNode(bone)
    if (node) {
      node.rotation.x = x
      node.rotation.y = y
      node.rotation.z = z
    }
  }

  getBonePosition(bone) {
    const node = this.getBoneNode(bone)
    if (node) {
      return {
        'x': node.position.x,
        'y': node.position.y,
        'z': node.position.z
      }
    }
    return null
  }

  setBonePosition(bone, x, y, z) {
    const node = this.getBoneNode(bone)
    if (node) {
      node.position.x = x
      node.position.y = y
      node.position.z = z
    }
  }

  getMetaVersion() {
    if (this.vrm) {
      return this.vrm.meta.metaVersion
    }
    return null
  }

  setExpression(name, value) {
    if (this.vrm) {
      this.vrm.expressionManager.setValue(name, value)
    }
  }

  getExpression(name) {
    if (this.vrm) {
      return this.vrm.expressionManager.getValue(name)
    }
    return null
  }

  updateExpression() {
    if (this.vrm) {
      return this.vrm.expressionManager.update()
    }
    return null
  }

  getExpressionNames() {
    if (this.vrm) {
      let names = []
      for (const name in this.vrm.expressionManager.expressionMap) {
        names.push(name)
      }
      return names
    }
    return null
  }

  importExpression(data) {
    if (this.vrm) {
      for (const name in data) {
        this.vrm.expressionManager.setValue(name, data[name])
      }
    }
  }

  exportExpression() {
    if (this.vrm) {
      let data = {}
      const names = this.getExpressionNames()
      for (const name in names) {
        data[name] = this.getExpression(name)
      }
      return data
    }
    return null
  }

}

export {
  VrmModel
}
