import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class SongForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGenres: [],
            acoustic: 50,
            dance: 50,
            energy: 50,
            loud: 50,
            instrument: 50,
            mood: 50,
            duration: 50,
            live: 50,
            popular: 50,
            tempo: 50,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGenreSelect = this.handleGenreSelect.bind(this);
        this.handleSliderMove = this.handleSliderMove.bind(this);
    }

    handleGenreSelect = (selectedGenres) => {
        this.setState({ selectedGenres });
    }

    handleSliderMove(event,i) {
        switch(i){
            case 0:
                this.setState({acoustic: event.target.value});
                break;
            case 1:
                this.setState({dance: event.target.value});
                break;
            case 2:
                this.setState({energy: event.target.value});
                break;
            case 3:
                this.setState({loud: event.target.value});
                break;
            case 4:
                this.setState({instrument: event.target.value});
                break;
            case 5:
                this.setState({mood: event.target.value});
                break;
            case 6:
                this.setState({duration: event.target.value});
                break;
            case 7:
                this.setState({live: event.target.value});
                break;
            case 8:
                this.setState({popular: event.target.value});
                break;
            case 9:
                this.setState({tempo: event.target.value});
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const element = (
            <React.Fragment>
                <br />
                Genres Selected: {this.state.selectedGenres.map((tag, i) => <span key={i}>
                    {i > 0 && ", "} {tag} </span>)} <br />
                Acousticness: {this.state.acoustic} <br />
                Danceability: {this.state.dance} <br />
                Energy: {this.state.energy} <br />
                Loudness: {this.state.loud} <br />
                Instrumentalness: {this.state.instrument} <br />
                Mood/Positivity: {this.state.mood} <br />
                Duration: {this.state.duration} <br />
                Liveness: {this.state.live} <br />
                Popularity: {this.state.popular} <br />
                Tempo (BPM): {this.state.tempo} <br />

            </React.Fragment>
        );
        ReactDOM.render(element, document.getElementById('result_box'));
    }


    render() {
        return (
            <div id="song_form_container">
                <form onSubmit={this.handleSubmit}>
                    Genres: <br />
                    <GenresSelector onGenreUpdate={this.handleGenreSelect} /><br /><br />
                    Acousticness:  <NumberSlider onChange={e => this.handleSliderMove(e,0)} /><br /><br />
                    Danceability:  <NumberSlider onChange={e => this.handleSliderMove(e,1)} /><br /><br />
                    Energy:  <NumberSlider onChange={e => this.handleSliderMove(e,2)} /><br /><br />
                    Loudness:  <NumberSlider onChange={e => this.handleSliderMove(e,3)} /><br /><br />
                    Instrumentalness:  <NumberSlider onChange={e => this.handleSliderMove(e,4)} /><br /><br />
                    Mood/Positivity:  <NumberSlider onChange={e => this.handleSliderMove(e,5)} /><br /><br />
                    Duration:  <NumberSlider onChange={e => this.handleSliderMove(e,6)} /><br /><br />
                    Liveness:  <NumberSlider onChange={e => this.handleSliderMove(e,7)} /><br /><br />
                    Popularity:  <NumberSlider onChange={e => this.handleSliderMove(e,8)} /><br /><br />
                    Tempo (BPM):  <NumberSlider onChange={e => this.handleSliderMove(e,9)} /><br /><br />
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
        this.state = { value: 50 };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.onChange(event);
    }

    render() {
        return (
            <div>
                <input type="range" name="number_select" value={this.state.value} onChange={this.handleChange} min="0" max="100" step="1" />
                <label> { this.state.value } </label>
            </div>
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
            <select name="genre_select" multiple size="10" onChange={this.handleChange}>
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
            </select>
        );
    }
}

export default SongForm;