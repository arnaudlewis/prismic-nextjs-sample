import React from 'react'
import {Link as LinkHelper} from 'prismic-reactjs'
import { linkResolver } from './prismic'
import { Link } from '../routes'

export default (props) => {
  return <Link to={LinkHelper.url(props.to, linkResolver)}>{props.children}</Link>
}