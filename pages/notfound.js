import React from 'react'
import { Link } from '../routes'

export default ({msg = "Page not found"}) =>
  <React.Fragment>
    <div className="l-wrapper">
      <hr className="separator-hr" />
    </div>
    <div className="l-wrapper">
      <div className="not-found">
        {msg}
        <br />
        <Link to="/"><a>Go Back to the homepage</a></Link>
      </div>
    </div>
  </React.Fragment>
