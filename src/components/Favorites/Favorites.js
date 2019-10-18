import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card } from 'react-bootstrap';
import HandleError from '../HandleError';
import { requestFavoritesCurrentConditions } from '../../actions';

import './Favorites.css';

const mapStateToProps = (state) => {
	return {
		isPending: state.updateFavorites.isPending,
		favCitiesData: state.updateFavorites.favCitiesData,
		error: state.updateFavorites.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRequestFavoritesCurrentConditions: (favCities) => dispatch(requestFavoritesCurrentConditions(favCities))
	}
}

class Favorites extends Component {
	componentDidMount() {
		let favCities = JSON.parse(localStorage.getItem('Favorite Cities'));
		if (favCities) {
			this.props.onRequestFavoritesCurrentConditions(favCities);
		}
	}

	handleOnClick = (cityData) =>{
		this.props.onLocationChange({
			key: cityData.location.key,
			city: cityData.location.city
		});
		this.props.onRouteChange('home');
	}

	render() {
		const { favCitiesData, error } = this.props;
		console.log('favCitiesData2:', favCitiesData, favCitiesData.length);

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

		if (!favCitiesData.length) {
			return null;
		}

		let cards = favCitiesData.map((cityData) => (
			<Card className='favorites-card' key={cityData.location.key}>
				<Card.Body>
					<Card.Title
						className='favorites-card-title'
						onClick={() => this.handleOnClick(cityData)}
					>
						{cityData.location.city}
					</Card.Title>
					<Card.Subtitle className="mb-2 favorites-card-subtitle">
						<h3>{Math.round(cityData.degreesC)}&deg;C</h3>
						<h6>{cityData.weatherText}</h6>
					</Card.Subtitle>
				</Card.Body>
			</Card>
		));

		return (
			<div className='favorites-cards'>
				{ cards }
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);