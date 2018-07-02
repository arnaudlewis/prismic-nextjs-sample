import React from 'react'
import { client as Prismic } from '../components/prismic'
import MainContent from '../components/main'
import Layout from './layout'

export default class extends React.Component {

  static async getInitialProps({ query, req }){
    const doc = await Prismic(req).getByUID('page', query.uid)
    return { doc }
  }

  render() {
    return (
      <Layout title="page" menu={this.props.menu}>
        <div data-wio-id={this.props.id}>
          <MainContent sliceZone={this.props.doc.data.page_content}/>
        </div>
      </Layout>
    )
  }
}
