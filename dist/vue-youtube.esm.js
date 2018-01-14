/*!
 * vue-youtube v1.2.4
 * (c) 2018 Antério Vieira
 * Released under the MIT License.
 */

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var getYoutubeId = createCommonjsModule(function (module, exports) {
(function (root, factory) {
  {
    module.exports = factory();
  }
}(commonjsGlobal, function (exports) {

  return function (url, opts) {
    if (opts == undefined) {
      opts = {fuzzy: true};
    }

    if (/youtu\.?be/.test(url)) {

      // Look first for known patterns
      var i;
      var patterns = [
        /youtu\.be\/([^#\&\?]{11})/,  // youtu.be/<id>
        /\?v=([^#\&\?]{11})/,         // ?v=<id>
        /\&v=([^#\&\?]{11})/,         // &v=<id>
        /embed\/([^#\&\?]{11})/,      // embed/<id>
        /\/v\/([^#\&\?]{11})/         // /v/<id>
      ];

      // If any pattern matches, return the ID
      for (i = 0; i < patterns.length; ++i) {
        if (patterns[i].test(url)) {
          return patterns[i].exec(url)[1];
        }
      }

      if (opts.fuzzy) {
        // If that fails, break it apart by certain characters and look
        // for the 11 character key
        var tokens = url.split(/[\/\&\?=#\.\s]/g);
        for (i = 0; i < tokens.length; ++i) {
          if (/^[^#\&\?]{11}$/.test(tokens[i])) {
            return tokens[i];
          }
        }
      }
    }

    return null;
  };

}));
});

var player = require('youtube-player');

var UNSTARTED = -1;
var ENDED = 0;
var PLAYING = 1;
var PAUSED = 2;
var BUFFERING = 3;
var CUED = 5;

var Youtube = {
  name: 'Youtube',
  props: {
    videoId: String,
    playerVars: {
      type: Object,
      default: function () { return ({}); }
    },
    height: {
      type: [Number, String],
      default: 360
    },
    width: {
      type: [Number, String],
      default: 640
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
  Vue.prototype.$youtube = {
    getIdFromUrl: getYoutubeId
  };

  Vue.component('youtube', Youtube);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

var version = '1.2.4';

export { Youtube, version };export default plugin;
