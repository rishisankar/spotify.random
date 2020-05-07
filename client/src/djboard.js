import React, { Component } from "react";
import * as THREE from 'three';
import { Redirect } from "react-router-dom";

class DjBoard extends Component{
	state = {
		continueButton: false,
	}

	render() {
		if(!this.state.continueButton)
			return (<h1> This is DJ Scene </h1>);
		else{
			return(<Redirect to="/visualizer" />);
		}
	}
}

export default DjBoard;