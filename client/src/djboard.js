import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";
import './djboard.css';

class DjBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			continueButton: false,
			showRecommendations: false,
			selectedSong: [],
		};
		this.getRecommendations = this.getRecommendations.bind(this);
	}

	componentDidMount() {
		//do three js stuff
	}

	getRecommendations(event, songState) {
		//do api stuff
		//setState to redirect
		this.setState({ showRecommendations: true });
	}

	render() {
		if (!this.state.continueButton)
			return (
				<div>
					<SongForm onSubmit={this.getRecommendations} />
				</div>
			);
		else {
			return <Redirect push to="/visualizer" />;
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
			loudness: 0.5,
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
			default:
				convertedVal = parseFloat(event.target.value) / 100;
				break;
		}
		this.setState({ [event.target.id]: convertedVal });
		this.props.onSubmit(event, this.state);
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
		ReactDOM.render(element, document.getElementById("result_box"));
	}

	render() {
		return (
			<div id="song_form_container">
				<form onSubmit={this.handleSubmit}>
					Genres: <br />
					<GenresSelector onGenreUpdate={this.handleGenreSelect} />
					<br />
					<br />
                    Acousticness:{" "}
					<NumberSlider
						min="0"
						max="100"
						id="acousticness"
						onChange={this.handleSliderMove}
					/>
					<br />
					<br />
                    Danceability:{" "}
					<NumberSlider
						min="0"
						max="100"
						id="danceability"
						onChange={this.handleSliderMove}
					/>
					<br />
					<br />
                    Energy:{" "}
					<NumberSlider
						min="0"
						max="100"
						id="energy"
						onChange={this.handleSliderMove}
					/>
					<br />
					<br />
                    Loudness:{" "}
					<NumberSlider
						min="0"
						max="100"
						id="loudness"
						onChange={this.handleSliderMove}
					/>
					<br />
					<br />
                    Instrumentalness:{" "}
					<NumberSlider
						min="0"
						max="100"
						id="instrumentalness"
						onChange={this.handleSliderMove}
					/>
					<br />
					<br />
                    Mood/Positivity:{" "}
					<NumberSlider
						min="0"
						id="valence"
						max="100"
						onChange={this.handleSliderMove}
					/>
					<br />
					<br />
                    Duration (minutes):{" "}
					<NumberSlider
						min="1"
						id="duration"
						max="21"
						onChange={this.handleSliderMove}
					/>
					<br />
					<br />
                    Liveness:{" "}
					<NumberSlider
						min="0"
						max="100"
						id="liveness"
						onChange={this.handleSliderMove}
					/>
					<br />
					<br />
                    Popularity:{" "}
					<NumberSlider
						min="0"
						max="100"
						id="popularity"
						onChange={this.handleSliderMove}
					/>
					<br />
					<br />
                    Tempo (BPM):{" "}
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
					<Form.Control as='select' multiple
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
