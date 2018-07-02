import React from 'react'
import {Link as PrismicLink, RichText, Date} from 'prismic-reactjs'
import { linkResolver } from '../prismic'
import { Link } from '../../routes'

export const VariableLink = (props) => {

  const linkUrl = PrismicLink.url(props.link, linkResolver)
  const linkLabel = RichText.asText(props.label)

  if (props.link.link_type == "Document") {
    return <Link prefetch route={linkUrl}><a>{linkLabel}</a></Link>
  }
  return <a href={linkUrl}>{linkLabel}</a>
}

export default VariableLink
