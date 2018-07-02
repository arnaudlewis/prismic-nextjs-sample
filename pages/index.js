import { client as Prismic, linkResolver } from '../components/prismic'
import {Link as PrismicLink, RichText, Date} from 'prismic-reactjs'
import MainContent from '../components/main'
import { Link } from '../routes'
import Layout from './layout'

export default class extends React.Component {

  static async getInitialProps({ req }) {
    const home = await Prismic(req).getSingle('homepage')
    return { home }
  }

  render() {
    const banner = this.props.home.data.homepage_banner[0]
    const buttonLink = PrismicLink.url(banner.button_link, linkResolver)
    const buttonLabel = RichText.asText(banner.button_label)
    const button = buttonLink && buttonLabel != " " ? <Link route={buttonLink}><a className="banner-button">{buttonLabel}</a></Link> : null

    return (
      <Layout title="home" menu={this.props.menu} className="homepage">
        <div data-wio-id={this.props.home.id}>
          <section className="homepage-banner" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(' + banner.image.url + ')' }}>
            <div className="banner-content container">
              <h2 className="banner-title">{RichText.asText(banner.title)}</h2>
              <p className="banner-description">{RichText.asText(banner.tagline)}</p>
              {button}
            </div>
          </section>
          <MainContent sliceZone={this.props.home.data.page_content}/>
        </div>
      </Layout>
    )
  }
}
