import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";
import './djboard.css';
import { spotifyApi } from './App.js'

class DjBoard extends Component {
	constructor(props) {
		super(props);
		const params = this.getHashParams();
		const token = params.access_token;
		if (token) {
			spotifyApi.setAccessToken(token);
		}
		this.state = {
			continueButton: true,
			showRecommendations: false,
			selectedSong: [],
			accessToken: token,
			songState: null
		};
		this.getRecommendations = this.getRecommendations.bind(this);
	}

	getHashParams() {
		 var hashParams = {};
		 var e, r = /([^&;=]+)=?([^&;]*)/g,
				 q = window.location.hash.substring(1);
		 e = r.exec(q)
		 while (e) {
				hashParams[e[1]] = decodeURIComponent(e[2]);
				e = r.exec(q);
		 }
		 return hashParams;
	 }


	componentDidMount() {
		//do three js stuff
	}

	getRecommendations(event, songState) {
		this.setState({songState: songState, showRecommendations: true, continueButton: false });
	}

	render() {
		if (this.state.continueButton)
			return (
				<div>
					<SongForm onSubmit={this.getRecommendations} />
				</div>
			);
		else {
			return <Redirect push to={{
            pathname: '/visualizer',
            state: { acousticness: this.state.songState.acousticness,
							selectedGenres: this.state.songState.selectedGenres,
						danceability: this.state.songState.danceability,
						energy: this.state.songState.energy,
						loudness: this.state.songState.loudness,
						instrumentalness: this.state.songState.instrumentalness,
						valence: this.state.songState.valence,
						duration: this.state.songState.duration,
						liveness: this.state.songState.liveness,
						popularity: this.state.songState.popularity,
						tempo: this.state.songState.tempo,
					 	accessToken: this.state.accessToken}
        }} />;
		}
	}
}

class SongForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
				selectedGenres: [],
				acousticness: 0.5,
				danceability: 0.5,
				energy: 0.5,
				loudness: -30.0,
				instrumentalness: 0.5,
				valence: 0.5,
				duration: 660000,
				liveness: 0.5,
				popularity: 50,
				tempo: 100,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleGenreSelect = this.handleGenreSelect.bind(this);
		this.handleSliderMove = this.handleSliderMove.bind(this);
	}

	handleGenreSelect = (selectedGenres) => {
		this.setState({ selectedGenres });
	};

	handleSliderMove(event) {
		var convertedVal = 0;
		switch (event.target.id) {
			case "duration":
				convertedVal = Number(event.target.value) * 6000;
				break;
			case "popularity":
			case "tempo":
				convertedVal = event.target.value;
				break;
			case "loudness":
				// 0-100 to -60.0-0 
				convertedVal = ((parseFloat(event.target.value)/100)*60)-60;
			default:
				convertedVal = parseFloat(event.target.value) / 100;
				break;
		}
		this.setState({ [event.target.id]: convertedVal });

	}

	handleSubmit(event) {
		event.preventDefault();
		const element = (
			<React.Fragment>
				<br />
                Genres Selected:{" "}
				{this.state.selectedGenres.map((tag, i) => (
					<span key={i}>
						{i > 0 && ", "} {tag}{" "}
					</span>
				))}{" "}
				<br />
                Acousticness: {this.state.acousticness} <br />
                Danceability: {this.state.danceability} <br />
                Energy: {this.state.energy} <br />
                Loudness: {this.state.loudness} <br />
                Instrumentalness: {this.state.instrumentalness} <br />
                Mood/Positivity: {this.state.valence} <br />
                Duration (ms): {this.state.duration} <br />
                Liveness: {this.state.liveness} <br />
                Popularity: {this.state.popularity} <br />
                Tempo (BPM): {this.state.tempo} <br />
			</React.Fragment>
		);
		//	ReactDOM.render(element, document.getElementById("result_box"));
		this.props.onSubmit(event, this.state);
	}

	render() {
		return (
			<div id="song_form_container" >
			<a href='http://localhost:8888' > Login to Spotify </a>
			<form action="https://accounts.spotify.com/authorize?client_id=39ca797415f84106a2925c00c50821f0&redirect_uri=http:%2F%2Flocalhost:3000%2Fvisualizer&scope=user-read-private%20user-read-email%20user-read-currently-playing%20user-read-playback-state&response_type=token" method="get" onSubmit={this.handleSubmit}>
					Genres: <br />
					<GenresSelector onGenreUpdate={this.handleGenreSelect} />
					<br />
					<br />
                    <h2>Acousticness:{" "}
											<span class="extra">
										How acoustic a song is
           (from folksy ballads to electronic beats)</span></h2>
					<NumberSlider
						min="0"
						max="100"
						id="acousticness"
						onChange={this.handleSliderMove}
					/>
					<br />
					<br />
                    <h2>Danceability:{" "}
											<span class="extra">
										How much the song makes you want to dance
(from lay in bed and groove to shake your hips and move)</span></h2>
					<NumberSlider
						min="0"
						max="100"
						id="danceability"
						onChange={this.handleSliderMove}
					/>
					<br />
					<br />
                  <h2>  Energy:{" "}
										<span class="extra">
									The intensity and activity of a song
(from soft and gentle to loud and noisy)</span></h2>
					<NumberSlider
						min="0"
						max="100"
						id="energy"
						onChange={this.handleSliderMove}
					/>
					<br />
					<br />
                  <h2>  Loudness:{" "}
										<span class="extra">
									How loud the song is
(from tunes for sleep to screaming headbangers)</span></h2>
					<NumberSlider
						min="0"
						max="100"
						id="loudness"
						onChange={this.handleSliderMove}
					/>
					<br />
					<br />
                  <h2>  Instrumentalness:{" "}
										<span class="extra">
									Ratio of words to music
(from spoken word to instrumental)</span></h2>
					<NumberSlider
						min="0"
						max="100"
						id="instrumentalness"
						onChange={this.handleSliderMove}
					/>
					<br />
					<br />
                <h2>    Mood/Positivity:{" "}
									<span class="extra">
								How (positive?) the song makes you feel
				 (from breakup ballads to sunny wake-up tunes)</span></h2>
					<NumberSlider
						min="0"
						id="valence"
						max="100"
						onChange={this.handleSliderMove}
					/>
					<br />
					<br />
                <h2>    Duration (minutes):{" "}
									<span class="extra">
								How long the song is, in minutes</span> </h2>
           (0 to 20?)
					<NumberSlider
						min="1"
						id="duration"
						max="21"
						onChange={this.handleSliderMove}
					/>
					<br />
					<br />
                <h2>    Liveness:{" "}
									<span class="extra">
								The presence of a live audience
(from polished studio recordings to raging mosh pits)</span> </h2>

					<NumberSlider
						min="0"
						max="100"
						id="liveness"
						onChange={this.handleSliderMove}
					/>
					<br />
					<br />
                <h2>    Popularity:{" "}			<span class="extra">	How many plays a song has
				(from underground discovery to number one hit)</span></h2>


					<NumberSlider
						min="0"
						max="100"
						id="popularity"
						onChange={this.handleSliderMove}
					/>
					<br />
					<br />
                <h2>    Tempo (BPM):{" "}	<span class="extra">	How fast the song is, in BPM
		(from lullaby to disco fever) </span></h2>

					<NumberSlider
						min="50"
						max="150"
						id="tempo"
						onChange={this.handleSliderMove}
					/>
					<br />
					<br />
					<input type="submit" value="Submit" />
				</form>
				<div id="result_box"></div>
			</div>
		);
	}
}

class NumberSlider extends Component {
	constructor(props) {
		super(props);
		var midpoint = (Number(props.max) + Number(props.min)) / 2;
		this.state = {
			value: midpoint,
			max: props.max,
			min: props.min,
			id: props.id,
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
		this.props.onChange(event);
	}

	render() {
		return (
			<Form className='sliders'>
				<Form.Group controlId="formBasicRange">
					<Form.Label>{this.state.value}</Form.Label>
					<Form.Control type="range" name="number_select"
						value={this.state.value}
						id={this.state.id}
						onChange={this.handleChange}
						min={this.state.min}
						max={this.state.max}
						step="1" />
				</Form.Group>
			</Form>
		);
	}
}

class GenresSelector extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		var options = event.target.options;
		var value = [];
		for (var i = 0, l = options.length; i < l; i++) {
			if (options[i].selected) {
				value.push(options[i].value);
			}
		}
		this.props.onGenreUpdate(value);
	}

	render() {
		return (
			<Form className='genres'>
				<Form.Group>
					<Form.Label>Genre Selector</Form.Label>
					<Form.Control id="genre_id" as='select' multiple
						size="10"
						onChange={this.handleChange}>
						<option value="acoustic">acoustic</option>
						<option value="afrobeat">afrobeat</option>
						<option value="alt-rock">alt-rock</option>
						<option value="alternative">alternative</option>
						<option value="ambient">ambient</option>
						<option value="anime">anime</option>
						<option value="black-metal">black-metal</option>
						<option value="bluegrass">bluegrass</option>
						<option value="blues">blues</option>
						<option value="bossanova">bossanova</option>
						<option value="brazil">brazil</option>
						<option value="breakbeat">breakbeat</option>
						<option value="british">british</option>
						<option value="cantopop">cantopop</option>
						<option value="chicago-house">chicago-house</option>
						<option value="children">children</option>
						<option value="chill">chill</option>
						<option value="classical">classical</option>
						<option value="club">club</option>
						<option value="comedy">comedy</option>
						<option value="country">country</option>
						<option value="dance">dance</option>
						<option value="dancehall">dancehall</option>
						<option value="death-metal">death-metal</option>
						<option value="deep-house">deep-house</option>
						<option value="detroit-techno">detroit-techno</option>
						<option value="disco">disco</option>
						<option value="disney">disney</option>
						<option value="drum-and-bass">drum-and-bass</option>
						<option value="dub">dub</option>
						<option value="dubstep">dubstep</option>
						<option value="edm">edm</option>
						<option value="electro">electro</option>
						<option value="electronic">electronic</option>
						<option value="emo">emo</option>
						<option value="folk">folk</option>
						<option value="forro">forro</option>
						<option value="french">french</option>
						<option value="funk">funk</option>
						<option value="garage">garage</option>
						<option value="german">german</option>
						<option value="gospel">gospel</option>
						<option value="goth">goth</option>
						<option value="grindcore">grindcore</option>
						<option value="groove">groove</option>
						<option value="grunge">grunge</option>
						<option value="guitar">guitar</option>
						<option value="happy">happy</option>
						<option value="hard-rock">hard-rock</option>
						<option value="hardcore">hardcore</option>
						<option value="hardstyle">hardstyle</option>
						<option value="heavy-metal">heavy-metal</option>
						<option value="hip-hop">hip-hop</option>
						<option value="holidays">holidays</option>
						<option value="honky-tonk">honky-tonk</option>
						<option value="house">house</option>
						<option value="idm">idm</option>
						<option value="indian">indian</option>
						<option value="indie">indie</option>
						<option value="indie-pop">indie-pop</option>
						<option value="industrial">industrial</option>
						<option value="iranian">iranian</option>
						<option value="j-dance">j-dance</option>
						<option value="j-idol">j-idol</option>
						<option value="j-pop">j-pop</option>
						<option value="j-rock">j-rock</option>
						<option value="jazz">jazz</option>
						<option value="k-pop">k-pop</option>
						<option value="kids">kids</option>
						<option value="latin">latin</option>
						<option value="latino">latino</option>
						<option value="malay">malay</option>
						<option value="mandopop">mandopop</option>
						<option value="metal">metal</option>
						<option value="metal-misc">metal-misc</option>
						<option value="metalcore">metalcore</option>
						<option value="minimal-techno">minimal-techno</option>
						<option value="movies">movies</option>
						<option value="mpb">mpb</option>
						<option value="new-age">new-age</option>
						<option value="new-release">new-release</option>
						<option value="opera">opera</option>
						<option value="pagode">pagode</option>
						<option value="party">party</option>
						<option value="philippines-opm">philippines-opm</option>
						<option value="piano">piano</option>
						<option value="pop">pop</option>
						<option value="pop-film">pop-film</option>
						<option value="post-dubstep">post-dubstep</option>
						<option value="power-pop">power-pop</option>
						<option value="progressive-house">progressive-house</option>
						<option value="psych-rock">psych-rock</option>
						<option value="punk">punk</option>
						<option value="punk-rock">punk-rock</option>
						<option value="r-n-b">r-n-b</option>
						<option value="rainy-day">rainy-day</option>
						<option value="reggae">reggae</option>
						<option value="reggaeton">reggaeton</option>
						<option value="road-trip">road-trip</option>
						<option value="rock">rock</option>
						<option value="rock-n-roll">rock-n-roll</option>
						<option value="rockabilly">rockabilly</option>
						<option value="romance">romance</option>
						<option value="sad">sad</option>
						<option value="salsa">salsa</option>
						<option value="samba">samba</option>
						<option value="sertanejo">sertanejo</option>
						<option value="show-tunes">show-tunes</option>
						<option value="singer-songwriter">singer-songwriter</option>
						<option value="ska">ska</option>
						<option value="sleep">sleep</option>
						<option value="songwriter">songwriter</option>
						<option value="soul">soul</option>
						<option value="soundtracks">soundtracks</option>
						<option value="spanish">spanish</option>
						<option value="study">study</option>
						<option value="summer">summer</option>
						<option value="swedish">swedish</option>
						<option value="synth-pop">synth-pop</option>
						<option value="tango">tango</option>
						<option value="techno">techno</option>
						<option value="trance">trance</option>
						<option value="trip-hop">trip-hop</option>
						<option value="turkish">turkish</option>
						<option value="work-out">work-out</option>
						<option value="world-music">world-music</option>
					</Form.Control>
				</Form.Group>
			</Form>
		);
	}
}

export default DjBoard;
