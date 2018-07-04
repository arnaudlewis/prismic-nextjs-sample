import Head from 'next/head'
import { Fragment } from 'react'
import { client as Prismic } from '../components/prismic'
import VariableLink from '../components/VariableLink'
import { Link } from '../routes'
import PrismicConfig from '../prismic-configuration.json'

export default class extends React.Component {
  render() {
    const navLinks = this.props.menu.data.menu_links.map(function(item, index){
      return <li key={index}><VariableLink link={item.link} label={item.label}/></li>
    })

    return (
      <div class={this.props.className}>
        <Head className={this.props.className}>
          <title>{this.props.title}</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />

          <link href="/static/images/punch.png" rel="icon" type="image/png" />

          <link href="https://fonts.googleapis.com/css?family=Lato:400,700,900,400italic,700italic" rel="stylesheet" type="text/css" />
          <link href="https://fonts.googleapis.com/css?family=Lora:400,400italic,700,700italic" rel="stylesheet" type="text/css" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

          <link href="/static/stylesheets/reset.css" rel="stylesheet" />
          <link href="/static/stylesheets/common.css" rel="stylesheet" />
          <link href="/static/stylesheets/style.css" rel="stylesheet" />

          <script dangerouslySetInnerHTML={{ __html: `
            window.prismic = { endpoint: "${PrismicConfig.apiEndpoint}" }
          `}} />
          <script src="//static.cdn.prismic.io/prismic.min.js" />
        </Head>

        <header className="site-header">
          <Link prefetch route="/">
            <div className="logo">Example Site</div>
          </Link>
          <nav>
            <ul>
              {navLinks}
            </ul>
          </nav>
        </header>
        {this.props.children}

        <footer>
          <p>Proudly published with <a href="https://prismic.io" target="_blank" rel="noopener">Prismic</a>
            <br/>
            <a href="https://prismic.io" target="_blank" rel="noopener">
              <img src="/static/images/prismic-logo.png" className="footer-logo"/>
            </a>
          </p>
        </footer>
      </div>
    )
  }
}
