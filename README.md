# VueYoutube

<p align="center">
  <img alt="vue-youtube" src="https://raw.githubusercontent.com/anteriovieira/vue-youtube/master/media/logo.png" /> <br />
  <a href="https://www.npmjs.com/package/vue-youtube"><img src="https://camo.githubusercontent.com/404a8346e5a003dd53c51896015852e3093e10ce/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f7675652d796f75747562652e737667" alt="npm" data-canonical-src="https://img.shields.io/npm/v/vue-youtube.svg" style="max-width:100%;"></a> <a href="https://vuejs.org/"><img src="https://camo.githubusercontent.com/0c34e7fdf42ec7923543c5624d6b818af7377aa2/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f7675652d322e782d627269676874677265656e2e737667" alt="vue2" data-canonical-src="https://img.shields.io/badge/vue-2.x-brightgreen.svg" style="max-width:100%;"></a>
  <a href="https://www.npmjs.com/package/vue-youtube"><img src="https://camo.githubusercontent.com/9a140a4c68e7c178bc660bee7675f4f25ff7ade3/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f7675652e737667" alt="License" data-canonical-src="https://img.shields.io/npm/l/vue-youtube.svg" style="max-width:100%;"></a>
</p>

## Intro

[vue-youtube](https://www.npmjs.com/package/vue-youtube) is an wrapper of [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference) (YIPA).

__What is the difference between other plugins?__ The difference is that the function body is wrapped in a promise. This promise is resolved only when the player has finished loading and is ready to begin receiving API calls (onReady). Therefore, all function calls are queued and replayed only when player is ready.

You can do something like:

```js
export default {
  // ...
  computed: {
    player () {
      return this.$refs.youtube.player
    }
  },
  methods: {
    async playVideo() {
      await this.player.playVideo()
      // Do something after the playVideo command
    }
  }
}
```

[Live demo](https://codesandbox.io/s/oll3o58xvy) built on top of the awesome [codesandbox](https://codesandbox.io).

## Installation

```bash
npm install vue-youtube
# or
yarn add vue-youtube
```

## Usage

### Bundler (Webpack, Rollup)

```js
import Vue from 'vue'
import VueYoutube from 'vue-youtube'

Vue.use(VueYoutube)
```

### Browser

```html
<!-- Include after Vue -->
<!-- Local files -->
<script src="vue-youtube/dist/vue-youtube.js"></script>
```

### Example


```html
<youtube :video-id="videoId" ref="youtube" @playing="playing"></youtube>
<button @click="playVideo">play</button>
```

```js
export default {
  data() {
    return {
      videoId: 'lG0Ys-2d4MA'
    }
  },
  methods: {
    playVideo() {
      this.player.playVideo()
    },
    playing() {
      console.log('\o/ we are watching!!!')
    }
  },
  computed: {
    player () {
      return this.$refs.youtube.player
    }
  }
}
```
or 

```html
<youtube :video-id="videoId" :player-vars="playerVars" @playing="playing"></youtube>
```

```js
export default {
  data() {
    return {
      videoId: 'lG0Ys-2d4MA',
      playerVars: {
        autoplay: 1
      }
    }
  },
  methods: {
    playing() {
      console.log('\o/ we are watching!!!')
    }
  }
}
```

[Live demo](http://vue-youtube.herokuapp.com/)

### Events

The component triggers [events](https://developers.google.com/youtube/iframe_api_reference#Events) to notify the parent component of changes in the player. For more information, see [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference#Events).

- ready
- ended
- playing
- paused
- buffering
- qued
- error

### Player

You have access to all [api methods](https://developers.google.com/youtube/iframe_api_reference#Functions) through [component referencing](https://vuejs.org/v2/api/#ref).

Example:

```html
<youtube video-id="lG0Ys-2d4MA" ref="youtube"></youtube>
```

```js
export default {
  // ...
  methods: {
    playVideo() {
      this.$refs.youtube.player.playVideo()
    }
  }
}
```

## API

### vm.$youtube.getIdFromUrl

> New in v1.2.0

- **Type:** `Function`
- **Description:** Parse a youtube url returning the video ID. ([get-youtube-id](https://github.com/jmorrell/get-youtube-id]))
- **Arguments:**
  - `{String} url`
  - `{Object} options`
- **Usage:**
```js
...
  methods: {
    getId () {
      return this.$youtube.getIdFromUrl(this.video.url)
    }
  }
...
```

## License

[MIT](http://opensource.org/licenses/MIT)
