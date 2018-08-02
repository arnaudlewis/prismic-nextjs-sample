import { Client, PREVIEW_COOKIE, linkResolver } from '../components/prismic'
import Router from 'next/router'
import React from 'react'
import cookie from 'cookie'

const PREVIEW_EXPIRES = 1800000

export default class extends React.Component {
  static async getInitialProps({ req, res, query }) {
    const url = await Client(req).previewSession(query.token, linkResolver, '/')
    if (res) {
      res.setHeader('Set-Cookie', cookie.serialize(PREVIEW_COOKIE, query.token, { maxAge: PREVIEW_EXPIRES, path: '/', httpOnly: false }))

      res.writeHead(301, {
        Location: url
      })
      res.end()
      res.finished = true
    } else {
      Router.push(url)
    }
  }

}
