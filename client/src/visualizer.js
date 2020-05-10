import React, { Component } from "react";
import * as THREE from 'three';
import { Redirect } from "react-router-dom";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class Visualizer extends Component{
	constructor(props) {
		super(props);
		this.state = {
			finished: false,
			returnHome: false
		}
	}

	componentDidMount() {
		//add three js stuff here
	}

	render() {
		if(!this.state.finished)
			return (<h1> This is Visual Scene </h1>);
		else if(this.state.returnHome)
			return(<Redirect to="/" />);
		else{
			return(<Redirect to="/djboard" />);
		}
	}
}



export default Visualizer;