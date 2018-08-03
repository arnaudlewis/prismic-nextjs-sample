import React from 'react'
import NotFound from './notfound'
import { Client, linkResolver } from '../components/prismic'
import { RichText } from 'prismic-reactjs'
import { CTABanner, FeaturedItems, NumerotedItems, Separator, TextBlock } from '../components/slices'
import Layout from './layout'

const graphQuery = `
{
  homepage {
    ...homepageFields
    body {
      ... on text_block {
        non-repeat {
          ...non-repeatFields
        }
        repeat {
          ...repeatFields
        }
      }
      ... on separator {
        non-repeat {
          ...non-repeatFields
        }
        repeat {
          ...repeatFields
        }
      }
      ... on cta_banner {
        non-repeat {
          ...non-repeatFields
        }
        repeat {
          ...repeatFields
        }
      }
      ... on big_bullet_item {
        non-repeat {
          ...non-repeatFields
        }
        repeat {
          ...repeatFields
        }
      }
      ... on featured_items {
        non-repeat {
          ...non-repeatFields
        }
        repeat {
          link_to_product {
            product_image
            product_name
            sub_title
          }
        }
      }
    }
  }
}
`

export default class extends React.Component {

  static async getInitialProps({ req }) {
    try {
      const home = await Client(req).getSingle('homepage', { graphQuery })
      return { home }
    } catch(error) {
      return { error: true }
    }
  }

  renderSlices(slices) {
    return slices.map((slice, index) => {
      const res = (() => {
        switch(slice.slice_type) {
          case 'cta_banner': return (
            <div key={index} className="homepage-slice-wrapper">
              <CTABanner slice={slice} />
            </div>
          )

          case 'featured_items': return (
            <div key={index} className="homepage-slice-wrapper">
              <FeaturedItems slice={slice} />
            </div>
          )

          case 'big_bullet_item': return (
            <div key={index} className="homepage-slice-wrapper">
              <NumerotedItems slice={slice} />
            </div>
          )

          case 'separator': return (
            <div key={index} className="homepage-slice-wrapper">
              <Separator />
            </div>
          )

          case 'text_block': return (
            <div key={index} className="homepage-slice-wrapper">
              <TextBlock slice={slice} />
            </div>
          )

          default: return
        }
      })()
      return res
    })
  }

  renderBody() {
    return (
      <Layout title={this.props.home.data.meta_title} description={this.props.home.data.meta_description} layout={this.props.layout}>
        <header className="homepage-header">
          <div className="l-wrapper">
            <div className="homepage-header-title">
              {RichText.render(this.props.home.data.title, linkResolver)}
            </div>
          </div>
        </header>

        <section className="homepage-banner">
          <img className="homepage-banner-image" src={this.props.home.data.banner_image.url} alt={this.props.home.data.banner_image.alt} />
          <div className="homepage-banner-box-wrapper">
            <div className="homepage-banner-box">
            {RichText.render(this.props.home.data.banner_text, linkResolver)}
            </div>
          </div>
        </section>

        <div className="homepage-slices-wrapper">
          {this.renderSlices(this.props.home.data.body)}
        </div>

        <div data-wio-id={this.props.home.id}></div>
      </Layout>
    )
  }

  render() {
    if(this.props.error) return <Layout layout={this.props.layout}><NotFound /></Layout>
    else return this.renderBody()
  }
}