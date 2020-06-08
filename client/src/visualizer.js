import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";
import { spotifyApi } from './App.js'
import './visualizer.css';
import islandPath from "./models/visualizer/island.gltf";
import hamsterPath from "./models/visualizer/hamster_dance.gltf";
import chickPath from "./models/visualizer/chick_dance.gltf";
import dogPath from "./models/visualizer/dog_dance.gltf";
import mousePath from "./models/visualizer/mouse_dance.gltf";
import pandaPath from "./models/visualizer/panda_dance.gltf";
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
		var island_mixer, hamster_mixer, chick_mixer,
			dog_mixer, mouse_mixer, panda_mixer;
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
			island_mixer = new THREE.AnimationMixer(gltf.scene);
            island_mixer.clipAction(gltf.animations[0]).play();
			scene.add(gltf.scene)
		});

		var hamsterLoader = new GLTFLoader();
		hamsterLoader.load(hamsterPath, function (gltf) {
			hamster_mixer = new THREE.AnimationMixer(gltf.scene);
            hamster_mixer.clipAction(gltf.animations[0]).play()
			scene.add(gltf.scene)
		});

		var chickLoader = new GLTFLoader();
		chickLoader.load(chickPath, function (gltf) {
			chick_mixer = new THREE.AnimationMixer(gltf.scene);
            chick_mixer.clipAction(gltf.animations[0]).play()
			scene.add(gltf.scene)
		});

		var dogLoader = new GLTFLoader();
		dogLoader.load(dogPath, function (gltf) {
			dog_mixer = new THREE.AnimationMixer(gltf.scene);
            dog_mixer.clipAction(gltf.animations[0]).play()
			scene.add(gltf.scene)
		});

		var mouseLoader = new GLTFLoader();
		mouseLoader.load(mousePath, function (gltf) {
			mouse_mixer = new THREE.AnimationMixer(gltf.scene);
            mouse_mixer.clipAction(gltf.animations[0]).play()
			scene.add(gltf.scene)
		});

		var pandaLoader = new GLTFLoader();
		pandaLoader.load(pandaPath, function (gltf) {
			panda_mixer = new THREE.AnimationMixer(gltf.scene);
            panda_mixer.clipAction(gltf.animations[0]).play()
			scene.add(gltf.scene)
		});

				//lighting
        var light = new THREE.DirectionalLight(0xdfebff, 1.7);
        light.position.set(10, 30, 60);
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

		var animate = function () {
			requestAnimationFrame(animate);

            var delta = clock.getDelta();

            if (island_mixer) island_mixer.update(delta);
            if (hamster_mixer) hamster_mixer.update(delta);
            if (panda_mixer) panda_mixer.update(delta);
            if (chick_mixer) chick_mixer.update(delta);
            if (mouse_mixer) mouse_mixer.update(delta);
            if (dog_mixer) dog_mixer.update(delta);

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
	return 		(
		<div className="App">
			<div id="track-list">
				<h1>Tracks</h1><br></br>
				<h2>{this.state.track_name.n1}</h2>
				<h3>{this.state.track_artist.a1}</h3>
				<img src={this.state.track_img.i1} />
				<h4>{ this.state.track_url.u1}</h4>
					<br></br>
				<audio
				        controls
				        src={ this.state.preview_url.p1}>
				            Your browser does not support the
				            <code>audio</code> element.
				    </audio>
				<br></br>
					<br></br>
						<br></br>
				<h2>{this.state.track_name.n2}</h2>
				<h3>{this.state.track_artist.a2}</h3>
				<img src={this.state.track_img.i2} />
				<h4>{ this.state.track_url.u2}</h4>
					<br></br>
				<audio
				        controls
				        src={ this.state.preview_url.p2}>
				            Your browser does not support the
				            <code>audio</code> element.
				    </audio>
				<br></br>
					<br></br>
						<br></br>
				<h2>{this.state.track_name.n3}</h2>
				<h3>{this.state.track_artist.a3}</h3>
				<img src={this.state.track_img.i3} />
				<h4>{ this.state.track_url.u3}</h4>
					<br></br>
				<audio
				        controls
				        src={ this.state.preview_url.p3}>
				            Your browser does not support the
				            <code>audio</code> element.
				    </audio>
				<br></br>
					<br></br>
						<br></br>
			</div>
			<div ref={(ref) => (this.mount = ref)} />

		</div>


	)
}
}


export default Visualizer;
