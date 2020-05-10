import React, { Component } from "react";
import * as THREE from 'three';
import { Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import Typewriter from 'typewriter-effect';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import catPath from './models/cat.gltf';
import './intro.css'

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
    	camera.position.z = 5;

		var catloader = new GLTFLoader();
		catloader.load(catPath,
			function ( gltf ) {
				scene.add(gltf.scene);
				console.log("added cat");
			}
		);

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
		this.messages = [
			"<span class=\"text_title\">Welcome to spotify.random!</span><br /> press 'space' to continue", 
			"My name is Insert_Cute_Name, and I'm here to guide you through the site!",
			"Spotify.random is a place for you to discover new music that matches your unique taste.",
			"Each song is customized perfectly to you-- no more scouring bad playlists\
				 in search for the one.",
			"To start, choose a genre. Then, select the attributes that set your song apart.",
			"You'll receive 3 songs that fit your description. If you want to continue\
				 your musical journey, just refresh to start the process all over again!",
			"What do you think? Ready to discover the song of your dreams?"];

		this.startIntro = this.startIntro.bind(this)
		document.addEventListener('keydown',this.startIntro);
	}

	startIntro(event) {
		event.preventDefault();
		if(event.keyCode === 32 && this.state.messageNumber == 0)
		{
			this.setState({messageNumber: this.state.messageNumber+1});
		}
	}

	componentDidUpdate(){
		console.log(this.state.messageNumber);
		var intervalLength;
		switch(this.state.messageNumber) {
			case 2:
				intervalLength = 6480;
				break;
			case 3: 
				intervalLength = 7200;
				break;
			case 5:
				intervalLength = 10560;
				break;
			default:
				intervalLength = 6000;
		}

		if(this.state.messageNumber > 0 && this.state.messageNumber < 6)
		{
			this.interval = setTimeout(() => this.setState({messageNumber: this.state.messageNumber + 1}),  intervalLength);
		}
	}


	render(){
		return(
			<div id="speech_bubble" >
				<Typewriter options={{strings: this.messages[this.state.messageNumber], autoStart: true, delay: 60}}/>
			</div>
		);
	}
}

export default Intro;