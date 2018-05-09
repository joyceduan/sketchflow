import React from "react"
import axios from "axios"
import PropTypes from "prop-types"
import NavBar from './NavBar'

class ShowBranchesAndDrawings extends React.Component {
  constructor(props) {
    super(props);
    this.startDrawing = this.startDrawing.bind(this);
    this.startDrawingNewBranch = this.startDrawingNewBranch.bind(this);
    this.mergeBranch = this.mergeBranch.bind(this);
  }
  mergeBranch(event) {
    event.preventDefault();
    var branch_id = event.target.id;
    // console.log("branch_id: " + branch_id);
    var sketch_id = this.props.sketch_id;
    // console.log("sketch_id: " + sketch_id);
    var drawing_urls = this.props.drawing_urls;
    // console.log("drawing_urls: " + drawing_urls)
    var drawing_branch_ids = this.props.drawing_branch_ids;
    // console.log("drawing branch ids: " + drawing_branch_ids);
    var drawing_url = ""
    for (var i = 0; i < drawing_branch_ids.length; i++) {
      if (drawing_branch_ids[i] == branch_id) {
        drawing_url = drawing_urls[i]
      }
    }
    axios.post('/drawings/canvas', {
        drawing: {
          new_branch: false,
          merge_branch: true,
          sketch_id: sketch_id,
          canvas_bg: drawing_url,
        }
      }
    )
    .then(function (response) {
      window.location = '/drawings/new';
      // console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }
  startDrawingNewBranch(event) {
    var drawing_url = this.props.drawing_urls[event.target.id];
    event.preventDefault();
    console.log(event.target.id);
    console.log(drawing_url);
    var sketch_id = this.props.sketch_id;
    axios.post('/drawings/canvas', {
        drawing: {
          new_branch: true,
          merge_branch: false, 
          sketch_id: sketch_id,
          canvas_bg: drawing_url,
        }
      }
    )
    .then(function (response) {
      window.location = '/drawings/new';
      // console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }
  startDrawing(event) {
    var drawing_url = this.props.drawing_urls[event.target.id];
    event.preventDefault();
    console.log(event.target.id);
    console.log(drawing_url);
    var sketch_id = this.props.sketch_id;
    axios.post('/drawings/canvas', {
        drawing: {
          new_branch: false,
          merge_branch: false, 
          sketch_id: sketch_id,
          canvas_bg: drawing_url,
        }
      }
    )
    .then(function (response) {
      window.location = '/drawings/new';
      // console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }
  render () {
    var self = this;
    var sketch_title = this.props.sketch_title;
    var branch_ids  = this.props.branch_ids;
    var drawing_branch_ids = this.props.drawing_branch_ids;
    var drawing_urls = this.props.drawing_urls;
    // console.log('branch ids: \n');
    // console.log(branch_ids);
    return (
      <div>
        <h2 id="sketch-title-with-branches">{sketch_title}</h2>
        <div className="show-branches-container">
          <div className="row">
            {branch_ids.map(function(branch_id, i) {
                return (
                  <div key={i} className="column">
                    {i == 0 && <h2 className="branch-title">Master</h2>}
                    {i != 0 && <h2 className="branch-title">{"Branch " + i}</h2>}
                    {i != 0 && <a href="drawings/new" id={branch_id} className="tiny-button" onClick={self.mergeBranch} name="merge-branch">Merge Into Master</a>}
                    {drawing_branch_ids.map(function(drawing_branch_id, j) {
                      if (drawing_branch_id == branch_id) {
                        return (
                          <div key={j}>
                            <img key={j} className="img-drawings" src={drawing_urls[j]} width="180" height="120"></img>
                            <div className="div-tiny-button">
                              <a href="drawings/new" id={j} className="tiny-button" name="continue-branch" onClick={self.startDrawing}>Continue Branch</a>
                              <a href="drawings/new" id={j} className="tiny-button" name="new-branch" onClick={self.startDrawingNewBranch}>New Branch</a>
                            </div>
                          </div>
                        )
                      }
                    })}
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    );
  }
}

ShowBranchesAndDrawings.propTypes = {
  sketch_id: PropTypes.number.isRequired,
  sketch_title: PropTypes.string.isRequired,
  branch_ids: PropTypes.array.isRequired,
  drawing_branch_ids: PropTypes.array.isRequired,
  drawing_urls: PropTypes.array.isRequired,
}

class NoDrawingsYet extends React.Component {
  constructor(props) {
    super(props);
    this.startFirstDrawing = this.startFirstDrawing.bind(this);
  }
  startFirstDrawing(event) {
    event.preventDefault();
    var sketch_id = this.props.sketch_id;
    var canvas_bg = "";
    axios.post('/drawings/canvas', {
        drawing: {
          sketch_id: sketch_id,
          canvas_bg: canvas_bg,
        }
      }
    )
    .then(function (response) {
      window.location = '/drawings/new';
      // console.log(response);
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
  sketch_id: PropTypes.number.isRequired,
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
        {branch_count == 0 && <NoDrawingsYet sketch_id={this.props.sketch_id} sketch_title={this.props.sketch_title} sketch_description={this.props.sketch_description}/>}
        {branch_count != 0 && <ShowBranchesAndDrawings sketch_id={this.props.sketch_id} sketch_title={this.props.sketch_title} branch_ids={this.props.branch_ids} drawing_branch_ids={this.props.drawing_branch_ids} drawing_urls={this.props.drawing_urls} />}
      </div>
    );
  }
}

SketchHome.propTypes = {
  username: PropTypes.string.isRequired,
  sketch_id: PropTypes.number.isRequired,
  sketch_title: PropTypes.string.isRequired,
  sketch_description: PropTypes.string.isRequired,
  branch_count: PropTypes.number.isRequired,
  branch_ids: PropTypes.array.isRequired,
  drawing_branch_ids: PropTypes.array.isRequired,
  drawing_urls: PropTypes.array.isRequired,
}

export default SketchHome