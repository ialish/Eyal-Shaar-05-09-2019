import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import CurrentWeather from '../components/CurrentWeather';
import FiveDayForecast from '../components/FiveDayForecast';

class WeatherDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		return (
			<div>
				<Alert variant={'success'} style={{ marginTop: 5, width: 460, height: 260 }}>
					<CurrentWeather location={this.props.location} />
					<FiveDayForecast location={this.props.location} />
				</Alert>
			</div>
		);
	}
}

export default WeatherDetails;