import React from 'react'
import PrismicLink from '../components/PrismicLink'
import NotFound from './notfound'
import Layout from './layout'
import { Client, linkResolver } from '../components/prismic'
import { RichText } from 'prismic-reactjs'

const graphQuery = `{
  product {
    ...productFields
    related_products {
      ...related_productsFields
      product1 {
        product_image
        product_name
        sub_title
      }
    }
  }
}`

export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dialog: false,
      displayDialog: false
    }

    this.handleClickAddCart = this.handleClickAddCart.bind(this)
  }

  static async getInitialProps({ req, query }) {
    try {
      const product = await Client(req).getByUID('product', query.uid, { graphQuery })
      return { product }
    } catch(error) {
      return { error: true }
    }
  }

  renderRelatedProducts(related) {
    return related.map((item, index) =>
      <div key={index} className="products-grid-item-wrapper">
        <img className="products-grid-item-image" src={item.product1.data.product_image.url} alt={item.product1.data.product_image.alt}/>
        <PrismicLink to={item.product1}>
          <p className="products-grid-item-name">
            {RichText.asText(item.product1.data.product_name)}
          </p>
        </PrismicLink>
        <p className="products-grid-item-subtitle">{RichText.asText(item.product1.data.sub_title)}</p>
      </div>
    )
  }

  handleClickAddCart(event) {
    event.preventDefault()
    window.alert(`No. Not today.\nWe're integrating the GraphQL API at the moment, so coffee delivery is temporarily unavailable.`)
  }

  renderBody() {
    return (
      <Layout title={this.props.product.data.meta_title} description={this.props.product.data.meta_description} layout={this.props.layout}>
        <div className="l-wrapper">
          <hr className="separator-hr" />
        </div>

        <div className="product-sections-wrapper">

          <section>
            <div className="l-wrapper">
              <div className="product-hero-inner">
                <img className="product-hero-image" src={this.props.product.data.product_image.url} alt={this.props.product.data.product_image.alt} />
                <div className="product-hero-content">
                  <div className="product-hero-name">
                    {RichText.render(this.props.product.data.product_name, linkResolver)}
                  </div>
                  <div className="product-hero-rich-content">
                    {RichText.render(this.props.product.data.rich_content, linkResolver)}
                  </div>
                  <div className="product-hero-button-wrapper">
                    <PrismicLink to={this.props.product.data.button_link}>
                      <a className="a-button a-button--filled" onClick={this.handleClickAddCart}>
                        {RichText.asText(this.props.product.data.button_label)}
                      </a>
                    </PrismicLink>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="product-description">
            <div className="l-wrapper">
              <div className="product-description-title">
                {RichText.render(this.props.product.data.title, linkResolver)}
              </div>
              <div className="product-description-content">
                {RichText.render(this.props.product.data.product_description, linkResolver)}
              </div>
            </div>
          </section>

          <div className="product-separator-wrapper">
            <div className="l-wrapper">
              <hr className="separator-hr" />
            </div>
          </div>

          <section>
            <div className="l-wrapper">
              <header className="products-grid-header">
                <div className="products-grid-header-title">
                  {RichText.render(this.props.product.data.related_products_title, linkResolver)}
                </div>
              </header>
            </div>
            <div className="products-grid-items-wrapper">
              {this.renderRelatedProducts(this.props.product.data.related_products)}
            </div>
          </section>

        </div>

        <div data-wio-id={this.props.product.id}></div>
        {this.state.dialog ? this.renderPopup() : ''}
      </Layout>
    )
  }

  render() {
    if(this.props.error) return <Layout layout={this.props.layout}><NotFound msg="this product doesn't exists." /></Layout>
    else return this.renderBody()
  }
}