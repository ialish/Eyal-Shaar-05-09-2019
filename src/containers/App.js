import React, { Component } from 'react';
import './App.css';
import Navigation from '../components/Navigation/Navigation';
import SearchField from '../components/SearchField/SearchField';
import WeatherDetails from '../components/WeatherDetails/WeatherDetails';
import Favorites from '../components/Favorites/Favorites';

const defaultLocation = {
	key: '215854',
	city: 'Tel Aviv'
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			route: 'home',
			location: defaultLocation
		};
	}

	onRouteChange = (route) => {
		this.setState({ route });
	}

	loadLocation = (location) => {
		this.setState({ location });
	}

	render() {
		return (
			<div>
				<Navigation
					routeChange={this.onRouteChange}
					route={this.state.route}
				/>
				{
					this.state.route === 'home' ?
						<div className="App">
							<h1>Weather Forecast</h1>
							<SearchField loadLocation={this.loadLocation} />
							<WeatherDetails location={this.state.location} />
						</div>
					: <div className="App">
							<h1>My Favorites</h1>
							<Favorites
								loadLocation={this.loadLocation}
								routeChange={this.onRouteChange}
							/>
						</div>
				}
			</div>
		);
	}
}

export default App;