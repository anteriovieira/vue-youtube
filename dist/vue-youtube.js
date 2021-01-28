/*!
 * vue-youtube v1.4.0
 * (c) 2021 Antério Vieira
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.VueYoutube = global.VueYoutube || {})));
}(this, (function (exports) { 'use strict';

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
    },
    resize: {
      type: Boolean,
      default: false
    },
    resizeDelay: {
      type: Number,
      default: 100
    },
    nocookie: {
      type: Boolean,
      default: false
    },
    fitParent: {
      type: Boolean,
      default: false
    }
  },
  data: function data () {
    return {
      player: {},
      events: ( obj = {}, obj[UNSTARTED] = 'unstarted', obj[PLAYING] = 'playing', obj[PAUSED] = 'paused', obj[ENDED] = 'ended', obj[BUFFERING] = 'buffering', obj[CUED] = 'cued', obj ),
      resizeTimeout: null
    }
    var obj;
  },
  computed: {
    aspectRatio: function aspectRatio () {
      return this.width / this.height
    }
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

      var params = { videoId: videoId };

      if (typeof this.playerVars.start === 'number') {
        params.startSeconds = this.playerVars.start;
      }

      if (typeof this.playerVars.end === 'number') {
        params.endSeconds = this.playerVars.end;
      }

      if (this.playerVars.autoplay === 1) {
        this.player.loadVideoById(params);
        return
      }

      this.player.cueVideoById(params);
    },
    resizeProportionally: function resizeProportionally () {
      var this$1 = this;

      this.player.getIframe().then(function (iframe) {
        var width = this$1.fitParent
          ? iframe.parentElement.offsetWidth
          : iframe.offsetWidth;
        var height = width / this$1.aspectRatio;
        this$1.player.setSize(width, height);
      });
    },
    onResize: function onResize () {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(
        this.resizeProportionally,
        this.resizeDelay
      );
    }
  },
  watch: {
    videoId: 'updatePlayer',
    resize: function resize (val) {
      if (val) {
        window.addEventListener('resize', this.onResize);
        this.resizeProportionally();
      } else {
        window.removeEventListener('resize', this.onResize);
        this.player.setSize(this.width, this.height);
      }
    },
    width: function width (val) {
      this.player.setSize(val, this.height);
    },
    height: function height (val) {
      this.player.setSize(this.width, val);
    }
  },
  beforeDestroy: function beforeDestroy () {
    if (this.player !== null && this.player.destroy) {
      this.player.destroy();
      delete this.player;
    }

    if (this.resize) {
      window.removeEventListener('resize', this.onResize);
    }
  },
  mounted: function mounted () {
    window.YTConfig = {
      host: 'https://www.youtube.com/iframe_api'
    };

    var host = this.nocookie ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com';

    this.player = player(this.$el, {
      host: host,
      width: this.width,
      height: this.height,
      videoId: this.videoId,
      playerVars: this.playerVars
    });

    this.player.on('ready', this.playerReady);
    this.player.on('stateChange', this.playerStateChange);
    this.player.on('error', this.playerError);

    if (this.resize) {
      window.addEventListener('resize', this.onResize);
    }

    if (this.fitParent) {
      this.resizeProportionally();
    }
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

var version = '1.4.0';

exports['default'] = plugin;
exports.Youtube = Youtube;
exports.getIdFromUrl = getYoutubeId;
exports.version = version;

Object.defineProperty(exports, '__esModule', { value: true });

})));
