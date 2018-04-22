import React from "react"
import axios from "axios"
import PropTypes from "prop-types"
import NavBar from './NavBar'

class NoDrawingsYet extends React.Component {
  constructor(props) {
    super(props);
    this.startFirstDrawing = this.startFirstDrawing.bind(this);
  }
  startFirstDrawing(event) {
    event.preventDefault();
    var canvas_bg = "hello!!!";
    axios.post('/drawings/canvas', {
        drawing: {
          canvas_bg: canvas_bg
        }
      }
    )
    .then(function (response) {
      window.location = '/drawings/new';
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }
  render () {
    var self = this;
    var sketch_title = this.props.sketch_title;
    var sketch_description = this.props.sketch_description;
    return (
      <div>
        <div className="no-drawings-container">
          <h2 id="sketch-title">{sketch_title}</h2>
          <p id="sketch-description">{sketch_description}</p>
          <a className="button" id="new-drawing" href="/drawings/new" onClick={self.startFirstDrawing}>Draw</a>
        </div>
      </div>
    );
  }
}

NoDrawingsYet.propTypes = {
  sketch_title: PropTypes.string.isRequired,
  sketch_description: PropTypes.string.isRequired,
}

class SketchHome extends React.Component {
  constructor(props) {
	 super(props);
  }
  render () {
    var branch_count = this.props.branch_count;
    return (
      <div>
        {<NavBar username={this.props.username} />}
        {branch_count == 0 && <NoDrawingsYet sketch_title={this.props.sketch_title} sketch_description={this.props.sketch_description}/>}
      </div>
    );
  }
}

SketchHome.propTypes = {
  username: PropTypes.string.isRequired,
  sketch_title: PropTypes.string.isRequired,
  sketch_description: PropTypes.string.isRequired,
  branch_count: PropTypes.number.isRequired,
}

export default SketchHome