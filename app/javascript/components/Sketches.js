import React from "react"
import PropTypes from "prop-types"
import NavBar from './NavBar'

class Sketches extends React.Component {
  constructor(props) {
	 super(props);
  }
  render () {
    return (
      <div>
        {<NavBar username={this.props.username} />}
        <div className="sketch-container"> 
          <h1>No sketches yet!</h1>
        </div>
        <div className="new-sketch-button">
          <a className="button" id="new-sketch" href="/sketches/new">New Sketch</a>
        </div>
      </div>
    );
  }
}

Sketches.propTypes = {
  username: PropTypes.string.isRequired,
}

export default Sketches