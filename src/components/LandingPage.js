import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class LandingPage extends Component {

  render() {
    return (
      <div>
        <h3>
          Welcome to the Petful Pet adoption service!
        </h3>
        <img src="data:image/jpeg;base64,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" alt="abused animals getting adopted"></img>
        <h4>
          How it works:
        </h4>

        <ul>
          <li>Navigate to the adopt a pet page.</li>
          <li>Enter your name into the queue.</li>
          <li>When it is your turn to adopt a pet, Choose which pet you'd like to adopt!</li>
        </ul>
        <Link to='/adoption'>
          <button>
            Adopt a pet!
      </button>
        </Link>
      </div>
    )
  }
}