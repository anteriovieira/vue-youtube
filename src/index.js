import getIdFromUrl from 'get-youtube-id'
import Youtube from './vue-youtube'

function plugin (Vue) {
  Vue.prototype.$youtube = {
    getIdFromUrl
  }

  Vue.component('youtube', Youtube)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'

export {
  Youtube,
  getIdFromUrl,
  version
}
