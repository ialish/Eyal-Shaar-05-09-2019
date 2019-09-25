import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

const apiKey = 'W0n1HPy5bdcPUrfoJqLph1EWeo0u1stp';

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
		
		return (
			<div style={{ display: 'flex', flexDirection: 'row', marginTop: '2rem' }}>
				{this.state.favCities.map((location) => {
					const url = `https://dataservice.accuweather.com/currentconditions/v1/${location.key}?apikey=${apiKey}`;
					let degreesC = null;
					let weatherText = '';
					fetch(url)
						.then(resp => resp.json())
						.then(json => {
							degreesC = Math.round(json[0].Temperature.Metric.Value);
							weatherText = json[0].WeatherText;
						});
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
				})}
			</div>
		);
	}
}

export default Favorites;