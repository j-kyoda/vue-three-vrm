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
    if (this.gltf) {
      this.gltf.scene.position.set(pos.x, pos.y, pos.z)
    }
  }

  getPosition() {
    if (this.gltf) {
      return {
        x: this.gltf.scene.position.x,
        y: this.gltf.scene.position.y,
        z: this.gltf.scene.position.z,
      }
    }
    return null
  }

  setRotation(rot) {
    if (this.gltf) {
      this.gltf.scene.rotation.set(rot.x, rot.y, rot.z)
    }
  }

  getRotation() {
    if (this.gltf) {
      return {
        x: this.gltf.scene.rotation.x,
        y: this.gltf.scene.rotation.y,
        z: this.gltf.scene.rotation.z,
      }
    }
    return null
  }
}

export {
  GltfModel
}
