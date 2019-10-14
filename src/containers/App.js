import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navigation from '../components/Navigation/Navigation';
import SearchField from '../components/SearchField/SearchField';
import WeatherDetails from '../components/WeatherDetails/WeatherDetails';
import Favorites from '../components/Favorites/Favorites';
import HandleError from '../components/HandleError';
import { setRoute, setLocation, requestCurrentPosition } from '../actions';

import './App.css';

const mapStateToProps = (state) => {
	return {
		route: state.changeRoute.route,
		isPending: state.changeLocation.isPending,
		location: state.changeLocation.location,
		error: state.changeLocation.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRouteChange: (route) => dispatch(setRoute(route)),
		onLocationChange: (location) => dispatch(setLocation(location)),
		onRequestCurrentPosition: () => dispatch(requestCurrentPosition())
	}
}

class App extends Component {
	componentDidMount() {
		this.props.onRequestCurrentPosition();
	}

	render() {
		const { route, onRouteChange, location, onLocationChange, error } = this.props;

		let fetchError;
		if (error) {
			fetchError = (
				<HandleError
					name={`Error: ${error}!`}
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
					onRouteChange={onRouteChange}
					route={route}
				/>
				{
					route === 'home' ?
						<div className="App">
							<h1>Weather Forecast</h1>
							<SearchField onLocationChange={onLocationChange} />
							<WeatherDetails location={location} />
						</div>
					: <div className="App">
							<h1>My Favorites</h1>
							<Favorites
								onLocationChange={onLocationChange}
								onRouteChange={onRouteChange}
							/>
						</div>
				}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);