import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

const apiKey = 'eRQtGqe0oHVQ0SMMUleR1xdOj8GL55WV';

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

	componentDidUpdate() {
		this.state.favCities.map((location) => {
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
		})
	}
	
	render() {
		return (
			<div style={{ display: 'flex', flexDirection: 'row', marginTop: '2rem' }}>
				{}
			</div>
		);
	}
}

export default Favorites;