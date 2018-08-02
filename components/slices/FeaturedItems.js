import React from 'react'
import PrismicLink from '../PrismicLink'
import { RichText, Link as LinkHelper } from 'prismic-reactjs'
import { linkResolver } from '../prismic'

function renderProducts(slice) {
  return slice.items.map((item, index) =>
    <div key={index} className="products-grid-item-wrapper">
      <img className="products-grid-item-image" src={item.link_to_product.data.product_image.url} alt={item.link_to_product.data.product_image.alt}/>
      <p className="products-grid-item-name">
        <PrismicLink to={item.link_to_product}>
          <a>{RichText.asText(item.link_to_product.data.product_name)}</a>
        </PrismicLink>
      </p>
      <p className="products-grid-item-subtitle">{RichText.asText(item.link_to_product.data.sub_title)}</p>
    </div>
  )
}
export default ({ slice }) =>
  <section>
    <div className="l-wrapper">
      <header className="products-grid-header">
        <div className="products-grid-header-title">
          {RichText.render(slice.primary.section_title, linkResolver)}
        </div>
        <div className="products-grid-header-button-wrapper">
          <a className="a-button" href={LinkHelper.url(slice.primary.button_link, linkResolver)}>
            {RichText.asText(slice.primary.button_label)}
          </a>
        </div>
      </header>
    </div>
    <div className="products-grid-items-wrapper">
      {renderProducts(slice)}
    </div>
  </section>
