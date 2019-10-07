import React, { Component } from 'react';
import { connect } from 'react-redux'

import Navigation from '../components/Navigation/Navigation';
import SearchField from '../components/SearchField/SearchField';
import WeatherDetails from '../components/WeatherDetails/WeatherDetails';
import Favorites from '../components/Favorites/Favorites';
import HandleError from '../components/HandleError';
import { setLocation, requestCurrentPosition } from '../actions';

import './App.css';

const mapStateToProps = (state) => {
	return {
		isPending: state.isPending,
		location: state.location,
		error: state.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadLocation: (location) => dispatch(setLocation(location)),
		onRequestCurrentPosition: () => dispatch(requestCurrentPosition())
	}
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			route: 'home'
		};
	}
	
	componentDidMount() {
		this.props.onRequestCurrentPosition();
		}

	onRouteChange = (route) => {
		this.setState({ route });
	}

	render() {
		const { location, loadLocation } = this.props;

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
							<SearchField loadLocation={loadLocation} />
							<WeatherDetails location={location} />
						</div>
					: <div className="App">
							<h1>My Favorites</h1>
							<Favorites
								loadLocation={loadLocation}
								routeChange={this.onRouteChange}
							/>
						</div>
				}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);