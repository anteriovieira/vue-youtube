import uniqid from 'uniqid'

const {PlayerYoutube} = YT

export default {
  name: 'HelloJsx',
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
      default: {}
    }
  },
  data () {
    return {
      playerId: uniqid(`player-`),
      player: {},
      events: {
        1: 'playing',
        2: 'paused',
        0: 'ended',
        3: 'buffering',
        5: 'cued'
      }
    }
  },
  beforeDestroy () {
    if (this.player !== null && this.player.destroy) {
      this.player.destroy()
      delete this.player
    }
  },
  mounted () {
    this.player = new YT.Player(this.playerId, {
      videoId: this.videoId,
      playerVars: this.playerVars,
      events: {
        onReady: e => {
          this.$emit('ready', e.target)
        },
        onStateChange: e => {
          if (e.data !== -1) {
            this.$emit(this.events[this.data], e.target)
          }
        },
        onError: e => {
          this.$emit('error', e.target)
        }
      }
    })
  },
  render (h) {
    return (
      <div class='youtube-player'>
        <div id={this.playerId}></div>
      </div>
    )
  }
}
