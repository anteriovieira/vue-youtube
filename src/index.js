import getIdFromUrl from 'get-youtube-id'
import Youtube from './vue-youtube'

function plugin (app) {
  app.config.globalProperties.$youtube = {
    getIdFromUrl
  }

  app.component('youtube', Youtube)
}

export default plugin
const version = '__VERSION__'

export {
  Youtube,
  getIdFromUrl,
  version
}
