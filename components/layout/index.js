import Head from 'next/head'
import { Fragment } from 'react'

export default ({children, title}) => (
  <Fragment>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <script src="/static/main.js" />
      <script src="//static.cdn.prismic.io/prismic.min.js" />
    </Head>

    {children}

    <footer>
      This is my footer
    </footer>
  </Fragment>
)
