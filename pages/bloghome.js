import React from 'react'
import { Link } from '../routes'
import NotFound from './notfound'
import Layout from './layout'
import { Client, Prismic, linkResolver } from '../components/prismic'
import { RichText } from 'prismic-reactjs'

export default class extends React.Component {

  static async getInitialProps({ req, query }) {
    try {
      const bloghome = await Client(req).getSingle('blog_home');
      const posts = await Client(req).query(Prismic.Predicates.at('document.type', 'blog_post'), { pageSize: 50 });
      return { bloghome, posts: posts.results }
    } catch(error) {
      return { error: true }
    }
  }

  renderPosts() {
    return this.props.posts.map((document, index) =>
      <div key={index} className="blog-home-post-wrapper">
        <article>
          <img className="blog-home-post-image" src={document.data.image.url} alt={document.data.image.alt} />
          <p className="blog-home-post-title">
            {RichText.asText(document.data.title)}
          </p>
          <p className="blog-home-post-excerpt">
            {RichText.asText(document.data.rich_content).substring(0, 158)} …
          </p>
          <div className="blog-home-post-button-wrapper">
            <Link to={linkResolver(document)}>
              <a className="a-button">Read post</a>
            </Link>
          </div>
        </article>
      </div>
    )
  }

  renderBody() {
    return (
      <Layout title={this.props.bloghome.data.meta_title} description={this.props.bloghome.data.meta_description} layout={this.props.layout}>
        <div className="l-wrapper">
          <hr className="separator-hr" />
        </div>

        <section className="blog-home-section">
          <div className="blog-home-posts-wrapper">
            {this.renderPosts()}
          </div>
        </section>

        <div data-wio-id={this.props.bloghome.id}></div>
      </Layout>
    )
  }

  render() {
    if(this.props.error) return <NotFound />
    else return this.renderBody()
  }
}