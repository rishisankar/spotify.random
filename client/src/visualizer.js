import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";
import { spotifyApi } from './App.js'
import './visualizer.css';

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
			<div>

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
				token:
				<h4>{this.props.location.state.accessToken}</h4>
			</div>


		</div>


	)
}
}


export default Visualizer;
