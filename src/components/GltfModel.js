class GltfModel {
  constructor() {
    this.gltf = null
  }

  // getter
  get scene() {
    return this.gltf.scene
  }

  // methods
  setModel(gltf_) {
    this.gltf = gltf_
  }

  setPosition(pos) {
    if (!this.gltf) {
      return
    }
    if (pos) {
      this.gltf.scene.position.set(pos.x, pos.y, pos.z)
    } else {
      this.gltf.scene.position.set(0, 0, 0)
    }
  }

  getPosition() {
    if (!this.gltf) {
      return null
    }
    return {
      x: this.gltf.scene.position.x,
      y: this.gltf.scene.position.y,
      z: this.gltf.scene.position.z,
    }
  }

  setRotation(rot) {
    if (!this.gltf) {
      return
    }
    if (rot) {
      this.gltf.scene.rotation.set(rot.x, rot.y, rot.z)
    } else {
      this.gltf.scene.rotation.set(0, 0, 0)
    }
  }

  getRotation() {
    if (!this.gltf) {
      return null
    }
    return {
      x: this.gltf.scene.rotation.x,
      y: this.gltf.scene.rotation.y,
      z: this.gltf.scene.rotation.z,
    }
  }

  setScale(scale) {
    if (!this.gltf) {
      return
    }
    if (scale) {
      this.gltf.scene.scale.set(scale.x, scale.y, scale.z)
    } else {
      this.gltf.scene.scale.set(1, 1, 1)
    }
  }

  setTexture(wrap, repeat) {
    if (!this.gltf) {
      return
    }
    this.gltf.scene.traverse((child) => {
      if (child.isMesh && child.material.map) {
        // set Wrapping mode to Repeat
        if (wrap) {
          child.material.map.wrapS = wrap.s
          child.material.map.wrapT = wrap.t
        }

        // set Repeat count
        if (repeat) {
          child.material.map.repeat.set(repeat.u, repeat.v)
        }

        // set update flag
        child.material.map.needsUpdate = true
      }
    })
  }
}

export {
  GltfModel
}
