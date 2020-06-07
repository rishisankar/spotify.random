import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";
import { spotifyApi } from './App.js'
import './visualizer.css';
import islandPath from "./models/visualizer/island.gltf";
import catPath from "./models/visualizer/djcat.gltf";
class Visualizer extends Component{
	constructor(props) {
		super(props);

    this.state = {
			token: this.props.location.state.accessToken,
      loggedIn: this.props.location.state.accessToken ? true : false,
      track_url: { u1: 'N/A', u2: 'N/A' , u3: 'N/A'},
			track_name: {n1: '', n2: '', n3: ''},
			track_artist: {a1: '', a2: '', a3: ''},
			preview_url: {p1: '', p2: '', p3: ''},
			track_img: {i1: '', i2:'', i3:''},
			finished: false,
			returnHome: false
		}
		console.log(this.props.location.state);
		console.log(this.props.location.state.accessToken);

	}

	componentDidMount() {
		this.getRecommendations();
		var scene = new THREE.Scene();
		var clock = new THREE.Clock();
		var mixer;
		var camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		var renderer = new THREE.WebGLRenderer({ antialias: true});
		renderer.setSize(window.innerWidth, window.innerHeight);
		this.mount.appendChild(renderer.domElement);
		scene.background = new THREE.Color(0xf5cedd);
		camera.position.z = 7;
		camera.position.y = 2.3;
		camera.position.x = 1;
		var islandLoader = new GLTFLoader();
		islandLoader.load(islandPath, function (gltf) {
			scene.add(gltf.scene)

			//lighting
            var light = new THREE.DirectionalLight(0xdfebff, 1.3);
            light.position.set(10, 50, 100);
            light.position.multiplyScalar(1.3);

            light.castShadow = true;

            light.shadow.mapSize.width = 1024;
            light.shadow.mapSize.height = 1024;

            var d = 300;

            light.shadow.camera.left = -d;
            light.shadow.camera.right = d;
            light.shadow.camera.top = d;
            light.shadow.camera.bottom = -d;

            light.shadow.camera.far = 1000;

            scene.add(light);
		});

		var catLoader = new GLTFLoader();
		catLoader.load(catPath, function (gltf) {
			gltf.scene.position.y = 1;
			gltf.scene.position.x = 1;
			gltf.scene.position.z = 3;
			gltf.scene.scale.set(.1,.1,.1);
			scene.add(gltf.scene)

			//lighting
            var light = new THREE.DirectionalLight(0xdfebff, 1.3);
            light.position.set(10, 50, 100);
            light.position.multiplyScalar(1.3);

            light.castShadow = true;

            light.shadow.mapSize.width = 1024;
            light.shadow.mapSize.height = 1024;

            var d = 300;

            light.shadow.camera.left = -d;
            light.shadow.camera.right = d;
            light.shadow.camera.top = d;
            light.shadow.camera.bottom = -d;

            light.shadow.camera.far = 1000;

            scene.add(light);
		});

		var animate = function () {
			requestAnimationFrame(animate);
			renderer.render(scene,camera);
		};
		animate();
	}
	componentUpdateMount() {

}




getRecommendations(){
			 var that = this;
			spotifyApi.getRecommendations({market: 'US', valence: this.props.location.state.valence, energy: this.props.location.state.energy,seed_genres:this.props.location.state.selectedGenres,acousticness:this.props.location.state.acousticness,danceability:this.props.location.state.danceability, loudness: this.props.location.state.loudness, instrumentalness:this.props.location.state.instrumentalness,duration:this.props.location.state.duration,liveness:this.props.location.state.liveness,popularity:this.props.location.state.popularity,tempo:this.props.location.state.tempo, limit: 3}).then(
				function(data) {
					console.log(data)

					that.setState({
						track_url: {
								u1: data.tracks[0].external_urls.spotify,
								u2: data.tracks[1].external_urls.spotify,
								u3: data.tracks[2].external_urls.spotify
							},
						track_name: {
							n1: data.tracks[0].name,
							n2: data.tracks[1].name,
							n3: data.tracks[2].name,
						},
						track_artist: {
							a1: data.tracks[0].album.artists[0].name,
							a2: data.tracks[1].album.artists[0].name,
							a3: data.tracks[2].album.artists[0].name
						},
						preview_url: {
							p1: data.tracks[0].preview_url,
							p2: data.tracks[1].preview_url,
							p3: data.tracks[2].preview_url
						},
						track_img: {
							i1: data.tracks[0].album.images[1].url,
							i2: data.tracks[1].album.images[1].url,
							i3: data.tracks[2].album.images[1].url,
						}
						}
					);
				},
				function (err) {
					console.log(err);
				}
			);
		}


render() {
	// return 		(
	// 	<div className="App">
	// 		<div id="track-list">
	// 			<h1>Tracks</h1><br></br>
	// 			<h2>{this.state.track_name.n1}</h2>
	// 			<h3>{this.state.track_artist.a1}</h3>
	// 			<img src={this.state.track_img.i1} />
	// 			<h4>{ this.state.track_url.u1}</h4>
	// 				<br></br>
	// 			<audio
	// 			        controls
	// 			        src={ this.state.preview_url.p1}>
	// 			            Your browser does not support the
	// 			            <code>audio</code> element.
	// 			    </audio>
	// 			<br></br>
	// 				<br></br>
	// 					<br></br>
	// 			<h2>{this.state.track_name.n2}</h2>
	// 			<h3>{this.state.track_artist.a2}</h3>
	// 			<img src={this.state.track_img.i2} />
	// 			<h4>{ this.state.track_url.u2}</h4>
	// 				<br></br>
	// 			<audio
	// 			        controls
	// 			        src={ this.state.preview_url.p2}>
	// 			            Your browser does not support the
	// 			            <code>audio</code> element.
	// 			    </audio>
	// 			<br></br>
	// 				<br></br>
	// 					<br></br>
	// 			<h2>{this.state.track_name.n3}</h2>
	// 			<h3>{this.state.track_artist.a3}</h3>
	// 			<img src={this.state.track_img.i3} />
	// 			<h4>{ this.state.track_url.u3}</h4>
	// 				<br></br>
	// 			<audio
	// 			        controls
	// 			        src={ this.state.preview_url.p3}>
	// 			            Your browser does not support the
	// 			            <code>audio</code> element.
	// 			    </audio>
	// 			<br></br>
	// 				<br></br>
	// 					<br></br>
	// 			token:
	// 			<h4>{this.props.location.state.accessToken}</h4>
	// 		</div>
	// 		<div ref={(ref) => (this.mount = ref)} />

	// 	</div>


	// )
	return (
		<div ref={(ref) => (this.mount = ref)} />
		)
}
}


export default Visualizer;
