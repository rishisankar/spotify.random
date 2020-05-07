import React, { Component } from "react";
import "./App.css";
import SongForm from "./song_form.jsx";
//import firebase from './firebase.js';

/* https://github.com/JMPerez/spotify-web-api-js */

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
    constructor() {
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        this.state = {
            loggedIn: token ? true : false,
            nowPlaying: { name: "Not Checked", albumArt: "" },
            query: {}
        };
        this.getRecommendations = this.getRecommendations.bind(this);
    }
    getHashParams() {
        var hashParams = {};
        var e,
            r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q);
        while (e) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }
        return hashParams;
    }

    getNowPlaying() {
        spotifyApi.getMyCurrentPlaybackState().then((response) => {
            this.setState({
                nowPlaying: {
                    name: response.item.name,
                    albumArt: response.item.album.images[0].url,
                },
            });
        });
    }

    getRecommendations(event){

    };

    render() {
        /* EXAMPLE USAGE OF FIREBASE DB:
        firebase.firestore().collection("test").doc("testdoc").set({
            name: "test"
        });*/
        return (
            <div className="App">
                <a href="http://localhost:8888"> Login to Spotify </a>
                <div>Now Playing: {this.state.nowPlaying.name}</div>
                <div>
                    <img
                        src={this.state.nowPlaying.albumArt}
                        style={{ height: 150 }}
                    />
                </div>
                {this.state.loggedIn && (
                    <button onClick={() => this.getNowPlaying()}>
                        Check Now Playing
                    </button>
                )}
                <SongForm onSubmit={this.getRecommendations}/>
            </div>
        );
    }
}

export default App;
