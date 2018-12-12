import PrismicLib from 'prismic-javascript'
import PrismicConfig from '../prismic-configuration.json'

let frontClient

export const Client = (req = null) => {
  if(!req && frontClient) return frontClient //prevent generate new instance for client side since we don't need the refreshed request object.
  else {
    const options = Object.assign({}, req ? {req} : {}, PrismicConfig.accessToken ? {accessToken: PrismicConfig.accessToken} : {})
    return PrismicLib.client(PrismicConfig.apiEndpoint, options)
  }
}
export const Prismic = PrismicLib

export const linkResolver = doc => {
  if (doc.type  ===  'homepage') return  '/'
	else if (doc.type  ===  'products') return  '/products'
	else if (doc.type  ===  'product') return  '/products/'  +  doc.uid
	else if (doc.type  ===  'blog_home') return  '/blog'
	else if (doc.type  ===  'blog_post') return  '/blog/'  +  doc.uid
	else return  '/'
}
