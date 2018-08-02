import PrismicLib from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration.json'
import { previewCookie } from 'prismic-javascript'

let frontClient

export const Client = (req = null) => {
  if(!req && frontClient) return frontClient //prevent generate new instance for client side since we don't need the refreshed request object.
  else {
    const options = Object.assign({}, req ? {req} : {}, PrismicConfig.accessToken ? {accessToken: PrismicConfig.accessToken} : {})
    return Prismic.client(PrismicConfig.apiEndpoint, options)
  }
}
export const Prismic = PrismicLib
export const PREVIEW_COOKIE = previewCookie

export const linkResolver = doc => {
  if (doc.type === 'homepage') {
    return '/'
  }
  if (doc.type === 'products') {
    return '/products'
  }
  if (doc.type === 'product') {
    return '/products/' + doc.uid
  }
  if (doc.type === 'blog_home') {
    return '/blog'
  }
  if (doc.type === 'blog_post') {
    return '/blog/' + doc.uid
  }
  return '/'
}
