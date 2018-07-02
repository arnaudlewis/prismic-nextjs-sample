import React from 'react'
import { Link } from '../routes'

export default class extends React.Component {

  render() {
    return (
      <section className="container">
        <h1>Oh no!</h1>
        <h3>We can't seem to find the page you're looking for.</h3>
        <h3><Link route='/'>Back to the homepage</Link></h3>
      </section>
    )
  }
}
