import React from 'react'
import { Link } from '../routes'

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render404() {
    return (
      <section className="container">
        <h1>Oh no!</h1>
        <h3>We can't seem to find the page you're looking for.</h3>
        <h3><Link route='/'><a>Back to the homepage</a></Link></h3>
      </section>
    )
  }

  render500() {
    return (
      <section className="container">
        <h1>Oh no!</h1>
        <h3>Something went wrong. Please contact the support.</h3>
      </section>
    )
  }

  renderDefault() {
    return (
      <p>
        {this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : 'An error occurred on client'}
    </p>
    )
  }

  render() {
    if(this.props.statusCode == 404) return this.render404()
    else if(this.props.statusCode >= 500 && this.props.statusCode <= 599) return render500()
    else return this.renderDefault()
  }
}
