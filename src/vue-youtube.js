const player = require('youtube-player')

const UNSTARTED = -1
const ENDED = 0
const PLAYING = 1
const PAUSED = 2
const BUFFERING = 3
const CUED = 5

export default {
  name: 'Youtube',
  props: {
    videoId: String,
    playerVars: {
      type: Object,
      default: () => ({})
    },
    height: {
      type: [Number, String],
      default: 360
    },
    width: {
      type: [Number, String],
      default: 640
    },
    resize: {
      type: Boolean,
      default: true
    },
    resizeDelay: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      player: {},
      events: {
        [UNSTARTED]: 'unstarted',
        [PLAYING]: 'playing',
        [PAUSED]: 'paused',
        [ENDED]: 'ended',
        [BUFFERING]: 'buffering',
        [CUED]: 'cued'
      },
      aspectRatio: null
    }
  },
  methods: {
    playerReady (e) {
      this.$emit('ready', e.target)
    },
    playerStateChange (e) {
      if (e.data !== null && e.data !== UNSTARTED) {
        this.$emit(this.events[e.data], e.target)
      }
    },
    playerError (e) {
      this.$emit('error', e.target)
    },
    updatePlayer (videoId) {
      if (!videoId) {
        this.player.stopVideo()
        return
      }

      if (this.playerVars.autoplay === 1) {
        this.player.loadVideoById({ videoId })
        return
      }

      this.player.cueVideoById({ videoId })
    }
  },
  watch: {
    videoId: 'updatePlayer'
  },
  beforeDestroy () {
    if (this.player !== null && this.player.destroy) {
      this.player.destroy()
      delete this.player
    }
  },
  mounted () {
    window.YTConfig = {
      host: 'https://www.youtube.com'
    }

    this.aspectRatio = this.width / this.height

    this.player = player(this.$el, {
      width: this.width,
      height: this.height,
      videoId: this.videoId,
      playerVars: this.playerVars
    })

    this.player.on('ready', this.playerReady)
    this.player.on('stateChange', this.playerStateChange)
    this.player.on('error', this.playerError)

    let timeout = false

    if (this.resize) {
      window.addEventListener('resize', () => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          this.player.getIframe().then(iframe => {
            const width = iframe.parentElement.offsetWidth
            const height = width / this.aspectRatio
            this.player.setSize(width, height)
          })
        }, this.reiszeDelay)
      })
    }
  },
  render (h) {
    return h('div')
  }
}
