import React, { Component } from "react";
import * as THREE from 'three';
import { Redirect } from "react-router-dom";
import ReactDOM from "react-dom";

class Intro extends Component{
	state = {
		finish: false,
		start: true
	}


	componentDidMount() {
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



	render() {
		if(this.state.start)
			return (
			<div>
				<TextBox />
				<div ref={ref => (this.mount = ref)} />
			</div>
			);
		else
			return(<Redirect to="/djboard" />);
	}
}



class TextBox extends Component{
	constructor(props){
		super(props);
		this.state = {
			messageNumber: 0,
		};
		this.messages = ["Welcome to spotify.random! press 'space' to continue", 
					"My name is Insert_Cute_Name, and I'm here to guide you through the site!",
					"Spotify.random is a place for you to discover new music that matches your unique taste.",
					"Each song is customized perfectly to you-- no more scouring bad playlists in search for the one.",
					"To start, choose a genre. Then, select the attributes that set your song apart.",
					"You'll receive 3 songs that fit your description. If you want to continue your musical journey, just refresh to start the process all over again!",
					"What do you think? Ready to discover the song of your dreams?"];
		this.updateNumber = this.updateNumber.bind(this);
	}

	updateNumber(event) {
		event.preventDefault();
		console.log("hi");
		if(event.keyCode === 32 && this.state.messageNumber == 0)
		{
			this.setState({messageNumber: this.state.messageNumber+1});
			console.log(this.state.messageNumber);
		}
	}

	render(){
		return(
			<div style={{display: 'flex', position: 'absolute', justifyContent: 'center', alignItems: 'center'}}>
				<h1> {this.messages[this.state.messageNumber]} </h1>
			</div>
		);
	}
}

export default Intro;