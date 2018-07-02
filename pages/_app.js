import App, {Container} from 'next/app'
import React from 'react'
import { client as Prismic } from '../components/prismic'

export default class extends App {
  static async getInitialProps ({ Component, router, ctx, req }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    const menu = await Prismic(req).getSingle('menu')

    return {pageProps, menu}
  }

  render () {
    const {Component, pageProps, menu} = this.props
    return (
      <Container>
        <Component {...Object.assign(pageProps, {menu})} />
      </Container>
    )
  }
}
