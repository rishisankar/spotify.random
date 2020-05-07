import React, { Component } from "react";
import * as THREE from 'three';
import { Redirect } from "react-router-dom";

class Visualizer extends Component{
	state = {
		finished: false,
		returnHome: false
	}

	render() {
		if(!this.state.finished)
			return (<h1> This is Visual Scene </h1>);
		if(this.state.returnHome)
			return(<Redirect to="/");
		else{
			return(<Redirect to="/djboard" />);
		}
	}
}

export default Visualizer;