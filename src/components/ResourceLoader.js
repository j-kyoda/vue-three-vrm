class ResourceLoader {
  constructor() {
    this.status = 0  // 0:init, 1:processing, 2:success, 3:failed
    this.url = null
    this.data = null
  }

  is_loaded() {
    if (this.status == 2) {
      return true
    }
    return false
  }

  is_failed() {
    if (this.status == 3) {
      return true
    }
    return false
  }

  async loadUrl(axios, url) {
    this.url = url
    this.data = null
    this.status = 1  // processing
    const res = await axios.get(url)
    if (res.status != 200) {
      this.status = 3  // failed
      return null
    }
    if (!res.data) {
      this.status = 3  // failed
      return null
    }
    this.data = res.data
    this.status = 2  // success
    return this.data
  }

  async loadPose(axios, url) {
    const data = await this.loadUrl(axios, url)
    if (data == null) {
      return null
    }
    if ("pose" in data) {
      // pose 1.0
      this.data = data.pose
      return this.data
    }
    // pose 0.0
    return this.data
  }

  async loadExpression(axios, url) {
    const data = await this.loadUrl(axios, url)
    if (data == null) {
      return null
    }
    if ("expressions" in data) {
      this.data = data.expressions
      return this.data
    }
    return this.data
  }
}

export {
  ResourceLoader
}
