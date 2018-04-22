import React from "react"
import PropTypes from "prop-types"
import NavBar from './NavBar'

class SketchGrid extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
    var self = this;
    var sketch_ids = this.props.sketch_ids;
    var sketch_count = this.props.sketch_count;
    var sketch_titles = this.props.sketch_titles;
    var sketch_descriptions = this.props.sketch_descriptions;
    
    return (
      <div>
        {sketch_count == 0 && 
            <h1 id="no-sketches">No sketches!</h1>}
        {sketch_count != 0 &&
            <h3 id="all-sketches">All Sketches</h3>}
        <div className="sketch-grid">
          <ul className='sketch-list'>
            {sketch_titles.map(function(sketch_title, index) {
              console.log(sketch_ids[index]);
              return (
                <li key={index} className="sketch-item">
                  <div className="sketch-container">
                    <div className="bold">{sketch_title}</div>
                    <div>{sketch_descriptions[index]}</div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

SketchGrid.propTypes = {
  user_id: PropTypes.number.isRequired,
  sketch_count: PropTypes.number.isRequired,
  sketch_ids: PropTypes.array.isRequired,
  sketch_titles: PropTypes.array.isRequired,
  sketch_descriptions: PropTypes.array.isRequired,
}

class Sketches extends React.Component {
  constructor(props) {
	 super(props);
  }
  render () {
    return (
      <div>
        {<NavBar username={this.props.username} />}
        {<SketchGrid
          user_id={this.props.user_id}
          sketch_count={this.props.sketch_count}
          sketch_ids={this.props.sketch_ids}
          sketch_titles={this.props.sketch_titles}
          sketch_descriptions={this.props.sketch_descriptions}
        />}
        <div className="new-sketch-button">
          <a className="button" id="new-sketch" href="/sketches/new">New Sketch</a>
        </div>
      </div>
    );
  }
}

Sketches.propTypes = {
  username: PropTypes.string.isRequired,
  user_id: PropTypes.number.isRequired,
  sketch_count: PropTypes.number.isRequired,
  sketch_ids: PropTypes.array.isRequired,
  sketch_titles: PropTypes.array.isRequired,
  sketch_descriptions: PropTypes.array.isRequired,
}

export default Sketches