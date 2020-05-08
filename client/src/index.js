import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Intro from './intro';
import DjBoard from './djboard';
import Visualizer from './visualizer';
import * as serviceWorker from './serviceWorker';
import {Route, Switch, BrowserRouter as Router } from 'react-router-dom';

const routing = (
	<Router>
		<Switch>
			<Route path="/djboard" component={DjBoard} />
			<Route path="/visualizer" component={Visualizer} />
			<Route path="/" component={Intro} />
		</Switch>
	</Router>
)


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
