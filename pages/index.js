import { client as Prismic } from '../components/prismic'
import { RichText } from 'prismic-reactjs'
import Layout from '../components/layout'

export default class extends React.Component {
  static async getInitialProps({ req }) {
    try {
      const home = await Prismic(req).getSingle('home')
      return { home }
    } catch(e) {
      console.log(e)
      return {home: {}}
    }
  }

  render() {
    return (
      <Layout title="Homepage">
        {RichText.render(this.props.home.data.metaTitle)}
      </Layout>
    )
  }
}
