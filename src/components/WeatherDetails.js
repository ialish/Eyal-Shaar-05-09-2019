import React from 'react';
import { Alert } from 'react-bootstrap';
import FavoritesButton from './FavoritesButton/FavoritesButton';
import CurrentWeather from './CurrentWeather';
import FiveDayForecast from './FiveDayForecast';

const WeatherDetails = ({ location }) => {
	return (
		<div>
			<Alert variant={'success'} style={{ marginTop: 5, maxWidth: '100%', height: '100%' }}>
				<FavoritesButton location={location} />
				<CurrentWeather location={location} />
				<FiveDayForecast location={location} />
			</Alert>
		</div>
	);
}

export default WeatherDetails;