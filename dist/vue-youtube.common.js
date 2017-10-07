/*!
 * vue-youtube v1.1.3
 * (c) 2017 Antério Vieira
 * Released under the MIT License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var player = require('youtube-player');

var UNSTARTED = -1;
var ENDED = 0;
var PLAYING = 1;
var PAUSED = 2;
var BUFFERING = 3;
var CUED = 5;

var Youtube = {
  name: 'vue-youtube',
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
  data: function data () {
    return {
      player: {},
      events: ( obj = {}, obj[UNSTARTED] = 'unstarted', obj[PLAYING] = 'playing', obj[PAUSED] = 'paused', obj[ENDED] = 'ended', obj[BUFFERING] = 'buffering', obj[CUED] = 'cued', obj )
    }
    var obj;
  },
  methods: {
    playerReady: function playerReady (e) {
      this.$emit('ready', e.target);
    },
    playerStateChange: function playerStateChange (e) {
      if (e.data !== null && e.data !== UNSTARTED) {
        this.$emit(this.events[e.data], e.target);
      }
    },
    playerError: function playerError (e) {
      this.$emit('error', e.target);
    },
    updatePlayer: function updatePlayer (videoId) {
      if (!videoId) {
        this.player.stopVideo();
        return
      }

      if (this.playerVars.autoplay === 1) {
        this.player.loadVideoById({ videoId: videoId });
        return
      }

      this.player.cueVideoById({ videoId: videoId });
    }
  },
  watch: {
    videoId: 'updatePlayer'
  },
  beforeDestroy: function beforeDestroy () {
    if (this.player !== null && this.player.destroy) {
      this.player.destroy();
      delete this.player;
    }
  },
  mounted: function mounted () {
    window.YTConfig = {
      host: 'https://www.youtube.com'
    };

    this.player = player(this.$el, {
      width: this.width,
      height: this.height,
      videoId: this.videoId,
      playerVars: this.playerVars
    });

    this.player.on('ready', this.playerReady);
    this.player.on('stateChange', this.playerStateChange);
    this.player.on('error', this.playerError);
  },
  render: function render (h) {
    return h('div')
  }
};

function plugin (Vue) {
  Vue.component('youtube', Youtube);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

var version = '1.1.3';

exports['default'] = plugin;
exports.Youtube = Youtube;
exports.version = version;
