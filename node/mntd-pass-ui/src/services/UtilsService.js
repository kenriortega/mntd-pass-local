class UtilsService {
  saveLocalStorage(key, value) {
    return window.localStorage.setItem(key, JSON.stringify(value))
  }
  getItemStorage(key) {
    return JSON.parse(window.localStorage.getItem(key))
  }
}

export default new UtilsService()
