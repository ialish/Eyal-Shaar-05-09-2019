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

	// componentDidUpdate() {
	// 	this.state.favCities.map((location) => {
	// 		const url = `https://dataservice.accuweather.com/currentconditions/v1/${location.key}?apikey=${apiKey}`;
	// 		fetch(url)
	// 			.then(resp => resp.json())
	// 			.then(json => this.setState({
	// 				degreesC: json[0].Temperature.Metric.Value,
	// 				weatherText: json[0].WeatherText
	// 			}));
	// 	});
	// }
	
	render() {
		this.state.favCities.map((location) => {
			const url = `https://dataservice.accuweather.com/currentconditions/v1/${location.key}?apikey=${apiKey}`;
			fetch(url)
				.then(resp => resp.json())
				.then(json => this.setState({
					degreesC: json[0].Temperature.Metric.Value,
					weatherText: json[0].WeatherText
				}));
		});
		
		console.log('favCities:', this.state.favCities);
		
		return (
			<div style={{ display: 'flex', flexDirection: 'row', marginTop: '2rem' }}>
				{
					this.state.favCities.map((location) => {
						return (
						<Card key={location.key} style={{ width: '18rem' }}>
							<Card.Body>
								<Card.Title>{location.city}</Card.Title>
								<Card.Subtitle className="mb-2">
									{location.degreesC}
									{location.weatherText}
								</Card.Subtitle>
							</Card.Body>
						</Card>
						);
					})
				}
			</div>
		);
	}
}

export default Favorites;