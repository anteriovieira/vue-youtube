import Youtube from './components/Youtube.js'

function plugin (Vue, options = {}) {

  let tag = document.createElement('script')
  tag.src = 'https://www.youtube.com/iframe_api'
  let firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

  console.log(tag)

  window.onYouTubeIframeAPIReady = function () {
    //Vue.component('Youtube', Youtube)

    Vue.nextTick()
  }
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  Youtube,
  version
}
