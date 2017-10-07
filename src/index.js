import VueYoutube from './vue-youtube'

function plugin (Vue) {
  Vue.component('vue-youtube', VueYoutube)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'

export {
  VueYoutube,
  version
}
