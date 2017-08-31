import uniqid from 'uniqid'
import player from 'youtube-player'

const state = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5
}

export default {
  name: 'youtube',
  props: {
    height: {
      type: [Number, String],
      default: 360
    },
    width: {
      type: [Number, String],
      default: 640
    },
    videoId: {
      type: String,
      required: true
    },
    playerVars: {
      type: Object,
      default: function () {
        return { autoplay: 0 }
      }
    }
  },
  data () {
    return {
      playerId: uniqid(`player-`),
      player: {},
      events: {
        [state.UNSTARTED]: 'unstarted',
        [state.PLAYING]: 'playing',
        [state.PAUSED]: 'paused',
        [state.ENDED]: 'ended',
        [state.BUFFERING]: 'buffering',
        [state.CUED]: 'cued'
      }
    }
  },
  methods: {
    playerReady (e) {
      this.$emit('ready', e.target)
    },
    playerStateChange (e) {
      if (e.data && e.data !== state.UNSTARTED) {
        this.$emit(this.events[this.data], e.target)
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
    this.player = player(this.playerId, {
      width: this.width,
      height: this.height,
      videoId: this.videoId,
      playerVars: this.playerVars
    })

    this.player.on('ready', this.playerReady)
    this.player.on('ready', this.playerStateChange)
    this.player.on('ready', this.playerError)
  },
  render (h) {
    return h('div', {attrs: { class: 'player-youtube' }}, [
      h('div', {attrs: { id: this.playerId, class: 'player-youtube-video' }})
    ])
  }
}
