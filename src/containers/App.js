import React, { Component } from 'react';
import './App.css';
import Navigation from '../components/Navigation/Navigation';
import SearchField from '../components/SearchField/SearchField';
import WeatherDetails from '../components/WeatherDetails/WeatherDetails';
import Favorites from '../components/Favorites/Favorites';
import HandleError from '../components/HandleError';

const apiKey = process.env.REACT_APP_API_KEY;
const defaultLocation = {
	key: '215854',
	city: 'Tel Aviv'
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			route: 'home',
			location: defaultLocation,
			fetchError: ''
		};
	}

	fetchForecast = (latitude, longitude) => {
		const url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${latitude}%2C${longitude}`;
		
		fetch(url)
			.then(resp => resp.json())
			.then(json => this.setState(prevState => {
				let location = { ...prevState.location };
				location.key = json.Key;
				location.city = json.LocalizedName;
				return { location };
			}))
			.catch(err => this.setState({ fetchError: err.message }));
	}
	
	getCoordinates = (position) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		
		this.fetchForecast(latitude, longitude);
	}
	
	componentDidMount() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(this.getCoordinates);
			}
		}

	onRouteChange = (route) => {
		this.setState({ route });
	}

	loadLocation = (location) => {
		this.setState({ location });
	}

	render() {
		let fetchError;
		if (this.state.fetchError) {
			fetchError = (
				<HandleError
					name={`Error: ${this.state.fetchError}!`}
					description={`Failed to fetch data from the server.`}
				/>
			);
			return (
				<div className='error-msg'>
					{fetchError}
				</div>
			);
		}
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