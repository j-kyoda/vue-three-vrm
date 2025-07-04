class ResourceLoader {
  constructor() {
  }

  async fetchJSON(url) {
    const res = await fetch(url)
    if (!res.ok) {
      return null
    }
    return await res.json()
  }

  normalizePose(data) {
    if (data == null) {
      return null
    }
    if ("pose" in data) {
      // pose 1.0
      return data.pose
    }
    // pose 0.0
    return data
  }

  async fetchPose(url) {
    const data = await this.fetchJSON(url)
    return this.normalizePose(data)
  }

  async fetchExpression(url) {
    const data = await this.fetchJSON(url)
    if (data == null) {
      return null
    }
    if ("expressions" in data) {
      return data.expressions
    }
    return data
  }

}

export {
  ResourceLoader
}
