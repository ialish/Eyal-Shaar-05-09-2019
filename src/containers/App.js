import React, { Component } from 'react';
import './App.css';
import Navigation from '../components/Navigation';
import SearchField from '../components/SearchField';
import WeatherDetails from '../components/WeatherDetails';
import Favorites from '../components/Favorites';

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
		console.log('location2:', location);
		
		this.setState({ location });
	}

	render() {
		return (
			<div>
				<Navigation routeChange={this.onRouteChange} />
				{	
					this.state.route === 'home' ?
						<div className="App">
							<h1>What's The Weather</h1>
							{console.log('location1:', this.state.location)}
							<SearchField loadLocation={this.loadLocation} />
							<WeatherDetails location={this.state.location} />
						</div>
					: <Favorites />
				}				
			</div>
		);
	}
}

export default App;