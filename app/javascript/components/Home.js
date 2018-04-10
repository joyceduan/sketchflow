import React from "react"
import PropTypes from "prop-types"

class Home extends React.Component {
  render () {
    return (
      <div>
        <div className='home-container'>
    		  <h1>SketchFlow</h1>
    		  <h3 className="slogan">Create collaboratively.</h3>
    		  <a href="/login" className='button' name="log-in">Log In</a>
          <a href="/signup" className="button" name="sign-up">Sign Up</a>
        </div>
      </div>
    );
  }
}

export default Home