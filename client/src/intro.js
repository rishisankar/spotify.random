import React, { Component } from "react";
import * as THREE from 'three';
import { Redirect } from "react-router-dom";
import ReactDOM from "react-dom";

class Intro extends Component{
	state = {
		finish: false,
		start: true
	}

	componentDidMount(){
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, .1, 1000);
		var renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		this.mount.appendChild( renderer.domElement );
		scene.background = new THREE.Color(0xf5cedd);
		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    	var cube = new THREE.Mesh( geometry, material );
    	camera.position.z = 5;
		var animate = function () {
			requestAnimationFrame( animate );

			renderer.render(scene, camera);
		};

		animate();
	}

	updateStart(){
		this.setState({start: false});
	}

	render() {
		if(this.state.start)
			return(
				<body>
					<div style={{zIndex: 2, position: 'absolute', justifyContent: 'center'}}>
						<h1> Welcome to spotify.random! </h1>
						<h2> press "space" to continue </h2>
					</div>
					<div ref={ref => (this.mount = ref)} />	
				</body>
			);
		if(!this.state.start && !this.state.finish)
			return (

				<div ref={ref => (this.mount = ref)} />
			);
		else
			return(<Redirect to="/djboard" />);
	}
}



export default Intro;