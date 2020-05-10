import React, { Component } from "react";
import * as THREE from 'three';
import { Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import Typewriter from 'typewriter-effect';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import catPath from './models/cat.gltf';
import './intro.css'

class Intro extends Component{

	constructor(props){
		super(props);
		this.state = {
			start: true
		};
		this.handleFinish = this.handleFinish.bind(this);
	}


	componentDidMount() {

		var scene = new THREE.Scene();
		var clock = new THREE.Clock();
		var mixer;
		var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, .1, 1000);
		var renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setSize(window.innerWidth, window.innerHeight);
		this.mount.appendChild( renderer.domElement );
		scene.background = new THREE.Color(0xf5cedd);
    	camera.position.z = 3.5;
			camera.position.y = 2.9;

		var catloader = new GLTFLoader();
		catloader.load(catPath,
			function ( gltf ) {

				//animations
				mixer = new THREE.AnimationMixer(gltf.scene);
				var action = mixer.clipAction( gltf.animations[ 0 ] );
				var action2 = mixer.clipAction( gltf.animations[ 1 ] );
				action.play();
				action2.play();

				//add cat model to scene
				scene.add(gltf.scene);

				//lighting
				var light = new THREE.DirectionalLight( 0xdfebff, 1 );
				light.position.set( 10, 50, 100 );
				light.position.multiplyScalar( 1.3 );

				light.castShadow = true;

				light.shadow.mapSize.width = 1024;
				light.shadow.mapSize.height = 1024;

				var d = 300;

				light.shadow.camera.left = - d;
				light.shadow.camera.right = d;
				light.shadow.camera.top = d;
				light.shadow.camera.bottom = - d;

				light.shadow.camera.far = 1000;

				scene.add( light );


				console.log("added cat");
			}
		);

		var animate = function () {

			requestAnimationFrame( animate );
			var delta = clock.getDelta();

			if ( mixer ) mixer.update( delta );

			renderer.render(scene, camera);
		};

		animate();


	}

	handleFinish(event) {
		this.setState({start: false});
	}



	render() {
		if(this.state.start)
			return (
			<div>
				<TextBox onChange={this.handleFinish} />
				<div ref={ref => (this.mount = ref)} />
			</div>
			);
		else
			return(<Redirect push to="/djboard" />);
	}
}



class TextBox extends Component{
	constructor(props){
		super(props);
		this.state = {
			messageNumber: 0,
			textState: true
		};
		this.messages = [
			"<span class=\"text_title\">welcome to spotify.random!</span><br /> press 'space' to continue",
			"my name is Insert_Cute_Name, and i'm here to guide you through the site!",
			"spotify.random is a place for you to discover new music that matches your unique taste.",
			"each song is customized perfectly to you-- no more scouring bad playlists\
				 in search for the one.",
			"to start, choose a genre. then, select the attributes that set your song apart.",
			"you'll receive 3 songs that fit your description. if you want to continue\
				 your musical journey, just refresh to start the process all over again!",
			"what do you think? ready to discover the song of your dreams?",
			"yes or heck yes"];

		this.startIntro = this.startIntro.bind(this);
		this.handleClick = this.handleClick.bind(this);
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
				intervalLength = 7580;
				break;
			case 3:
				intervalLength = 7200;
				break;
			case 5:
				intervalLength = 12560;
				break;
			case 6:
					intervalLength = 12560;
					break;

			default:
				intervalLength = 6000;
		}

		if(this.state.messageNumber > 0 && this.state.messageNumber < 6)
		{
			this.interval = setTimeout(() => this.setState({messageNumber: this.state.messageNumber + 1}),  intervalLength);
		}
		else if(this.state.messageNumber == 6)
		{
			this.setState({messageNumber: this.state.messageNumber +1, textState: false});
		}
	}

	handleClick(event) {
		this.props.onChange(event);
	}

	render(){
		return(

			<div id="speech_bubble" >
				{this.state.textState && <Typewriter options={{strings: this.messages[this.state.messageNumber], autoStart: true, delay: 60}}/>}
				{!this.state.textState && this.messages[6]} <br />
				{!this.state.textState && <button onClick={this.handleClick} >yes</button>} <br />
				{!this.state.textState && <button onClick={this.handleClick} >heck yes!</button>}
			</div>



		);
	}
}

export default Intro;
