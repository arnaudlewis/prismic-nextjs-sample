import React from 'react'
import NotFound from './notfound'
import Layout from './layout'
import { Client, linkResolver } from '../components/prismic'
import { RichText } from 'prismic-reactjs'

const graphQuery = `{
  blog_post {
    ...blog_postFields
    author {
      name
      bio
      picture
    }
  }
}`

export default class extends React.Component {

  static async getInitialProps({ req, query }) {
    try {
      const blogpost = await Client(req).getByUID('blog_post', query.uid, { graphQuery })
      return { blogpost }
    } catch(error) {
      return { error: true }
    }
  }

  renderBody() {
    return (
      <Layout title={this.props.blogpost.data.meta_title} description={this.props.blogpost.data.meta_description} layout={this.props.layout}>
        <div className="l-wrapper">
          <hr className="separator-hr" />
        </div>

        <article className="blog-post-article">
          <div className="blog-post-inner">
            <div className="blog-post-image-wrapper">
              <img className="blog-post-image" src={this.props.blogpost.data.image.url} alt={this.props.blogpost.data.image.alt}/>
            </div>
            <div className="blog-post-title">
              {RichText.render(this.props.blogpost.data.title, linkResolver)}
            </div>
            <div className="blog-post-rich-content">
              {RichText.render(this.props.blogpost.data.rich_content, linkResolver)}
            </div>
            <div className="blog-post-author-wrapper">
              {this.props.blogpost.data.author.data && this.props.blogpost.data.author.data.picture
                ? <img className="blog-post-author-picture" src={this.props.blogpost.data.author.data.picture.url} alt={this.props.blogpost.data.author.data.picture.alt} />
                : ''
              }
              <div>
                {this.props.blogpost.data.author.data && this.props.blogpost.data.author.data.name
                  ? <p className="blog-post-author-name">{RichText.asText(this.props.blogpost.data.author.data.name)}</p>
                  : ''
                }
                {this.props.blogpost.data.author.data && this.props.blogpost.data.author.data.bio
                  ? <p className="blog-post-author-bio">{RichText.asText(this.props.blogpost.data.author.data.bio)}</p>
                  : ''
                }
              </div>
            </div>
          </div>
        </article>

        <div data-wio-id={this.props.blogpost.id}></div>
      </Layout>
    )
  }

  render() {
    if(this.props.error) return <Layout layout={this.props.layout}><NotFound msg="this article doesn't exists." /></Layout>
    else return this.renderBody()
  }
}