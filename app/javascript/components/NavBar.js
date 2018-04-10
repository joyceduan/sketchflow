import React from "react"
import PropTypes from "prop-types"

class NavBar extends React.Component {
  constructor(props){
	super(props);
  }
  render () {
    return (
      <div>
      	<nav className="navbar navbar-default navbar-fixed-top">
      		<div className="container-fluid">
      			<div className="navbar-header">
			        <ul className="nav navbar-nav">
						<li>
							<a href="/">
								<img alt="Brand" src="/assets/sketchflowlogo.png" width="25" height="25"/>
							</a>
						</li>
					</ul>
				</div>
				<ul className="nav navbar-nav navbar-right">
					<li className="dropdown">
			        	<a className="dropdown-toggle" data-toggle="dropdown" href="#">{this.props.username.charAt(0).toUpperCase() + this.props.username.substr(1,this.props.username.indexOf(' '))}
			        		<span className="caret"></span>
			        	</a>
			        	<ul className="dropdown-menu">
				          	<li><a href="/users/sign_out" data-method="delete">Log Out</a></li>
			        	</ul>
			      	</li>
				</ul>
			</div>
		</nav>
      </div>
    );
  }
}

NavBar.propTypes = {
	username: PropTypes.string.isRequired,
}

export default NavBar