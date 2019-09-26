import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

const apiKey = 'w4bG0bSt7bzeEvB6vrfG6YX6tAl2BNrD';

class Favorites extends Component {
	constructor() {
		super();
		this.state = {
			favCities: []
		};
	}
	
	componentDidMount() {
		this.setState({ favCities: JSON.parse(localStorage.getItem('Favorite Cities')) });
	}
	
	render() {
		if (!this.state.favCities.length)
			return null;

		let cards = this.state.favCities.map((location) => {
			const url = `https://dataservice.accuweather.com/currentconditions/v1/${location.key}?apikey=${apiKey}`;
			fetch(url)
				.then(resp => resp.json())
				.then(json => {
					let degreesC = Math.round(json[0].Temperature.Metric.Value);
					let weatherText = json[0].WeatherText;
					return (
						<Card key={location.key} style={{ width: '18rem' }}>
							<Card.Body>
								<Card.Title>{location.city}</Card.Title>
								<Card.Subtitle className="mb-2">
									{degreesC}
									{weatherText}
								</Card.Subtitle>
							</Card.Body>
						</Card>
					);
				});
		});
		
		console.log('favCities:', this.state.favCities);
		console.log('cards:', cards);
		
		return (
			<div style={{ display: 'flex', flexDirection: 'row', marginTop: '2rem' }}>
				{ cards }
			</div>
		);
	}
}

export default Favorites;