import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

const apiKey = 'w4bG0bSt7bzeEvB6vrfG6YX6tAl2BNrD';

class Favorites extends Component {
	constructor() {
		super();
		this.state = {
			favCitiesData: []
		};
	}

	componentDidMount() {
		let favCitiesData = [];
		let favCities = JSON.parse(localStorage.getItem('Favorite Cities'));
		
		favCities.map((cityId) => {
			const url = `https://dataservice.accuweather.com/currentconditions/v1/${cityId.key}?apikey=${apiKey}`;
			fetch(url)
			.then(resp => resp.json())
			.then(json => {
				let degreesC = Math.round(json[0].Temperature.Metric.Value);
				let weatherText = json[0].WeatherText;
				favCitiesData.push({ cityId, degreesC, weatherText });
			});
		});

		this.setState({ favCitiesData });
	}
	
	render() {
		if (!this.state.favCitiesData.length)
			return null;
		console.log('favCitiesData', this.favCitiesData);

		let cards = this.state.favCitiesData.map((location) => (
			<Card key={location.cityId.key} style={{ width: '18rem' }}>
				<Card.Body>
					<Card.Title>{location.cityId.city}</Card.Title>
					<Card.Subtitle className="mb-2">
						{location.degreesC}
						{location.weatherText}
					</Card.Subtitle>
				</Card.Body>
			</Card>
		));
		
		return (
			<div style={{ display: 'flex', flexDirection: 'row', marginTop: '2rem' }}>
				{ cards }
			</div>
		);
	}
}

export default Favorites;