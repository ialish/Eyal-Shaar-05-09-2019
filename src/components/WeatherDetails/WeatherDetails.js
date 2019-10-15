import React from 'react';
import './WeatherDetails.css';
import { Alert } from 'react-bootstrap';
import FavoritesButton from '../FavoritesButton/FavoritesButton';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import FiveDayForecast from '../FiveDayForecast/FiveDayForecast';

const WeatherDetails = ({ location }) => {
	return (
		<div>
			<Alert className='background-box' variant={'success'}>
				<FavoritesButton location={location} />
				<CurrentWeather />
				<FiveDayForecast location={location} />
			</Alert>
		</div>
	);
}

export default WeatherDetails;