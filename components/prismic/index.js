import Prismic from 'prismic-javascript'
import PrismicConfig from '../../prismic-configuration.json'
import { previewCookie } from 'prismic-javascript'

let frontClient

export const client = (req = null) => {
  if(!req && frontClient) return frontClient //prevent generate new instance for client side since we don't need the refreshed request object.
  else {
    const options = Object.assign({}, req ? {req} : {}, PrismicConfig.accessToken ? {accessToken: PrismicConfig.accessToken} : {})
    return Prismic.client(PrismicConfig.apiEndpoint, options)
  }
}

export const PREVIEW_COOKIE = previewCookie

export const linkResolver = doc => {
  if (doc.type === 'page') return '/page/' + doc.uid
  return '/'
}
