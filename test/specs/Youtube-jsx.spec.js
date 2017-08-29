import HelloJsx from 'src/components/Youtube.jsx'
import { createVM } from '../helpers/utils.js'

describe('Youtube.jsx', function () {
  it('should render correct contents', function () {
    const vm = createVM(this, `
<YoutubeJsx></YoutubeJsx>
`, { components: { YoutubeJsx }})
  })

  it('renders JSX too', function () {
    const vm = createVM(this, h => (
      <Youtube-jsx></Youtube-jsx>
    ), { components: { YoutubeJsx }})
  })
})
