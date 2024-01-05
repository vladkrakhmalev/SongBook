class apiServices {

  async sendRequest(url, method, body) {
    const result = await fetch(url, {
      method: method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    return await result.json()
  }

}

module.exports = new apiServices()