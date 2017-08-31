# VueYoutube

[![npm](https://img.shields.io/npm/v/vue-youtube.svg)](https://www.npmjs.com/package/vue-youtube) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> A Vue.js Plugin

## Installation

```bash
npm install --save vue-youtube
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

<!-- From CDN -->
<script src="https://unpkg.com/vue-youtube"></script>
```

### Example


```html
<youtube :video-id="videoId" ref="youtube" @playing="playing"></youtube>
```

```js
export default {
  data() {
    return {
      videoId: 'lG0Ys-2d4MA'
    }
  },
  methods: {
    playing() {
      console.log('\o/ we are watching!!!')
    }
  },
  computed: {
    player () => this.$refs.youtube.player
  },
  mounted() {
    this.player.playVideo()
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

## Development

### Launch visual tests

```bash
npm run dev
```

### Launch Karma with coverage

```bash
npm run dev:coverage
```

### Build

Bundle the js and css of to the `dist` folder:

```bash
npm run build
```


## Publishing

The `prepublish` hook will ensure dist files are created before publishing. This
way you don't need to commit them in your repository.

```bash
# Bump the version first
# It'll also commit it and create a tag
npm version
# Push the bumped package and tags
git push --follow-tags
# Ship it 🚀
npm publish
```

## TODO

- Tests
- Examples

## License

[MIT](http://opensource.org/licenses/MIT)
