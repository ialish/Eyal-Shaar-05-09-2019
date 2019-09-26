import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

const apiKey = 'cMR4NPXFGyK6UXqUSwj6q0a0R1f5EB0m';

class Favorites extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favCitiesData: []
		};
	}
	
	fetchData = (favCities) => {
		let favCitiesData = [];
		favCities.forEach((location) => {
			const url = `https://dataservice.accuweather.com/currentconditions/v1/${location.key}?apikey=${apiKey}`;
			fetch(url)
				.then(resp => resp.json())
				.then(json => {
					let degreesC = Math.round(json[0].Temperature.Metric.Value);
					let weatherText = json[0].WeatherText;
					favCitiesData.push({ location, degreesC, weatherText });
					this.setState({ favCitiesData });
				});
		});
	}

	componentDidMount() {
		let favCities = JSON.parse(localStorage.getItem('Favorite Cities'));
		this.fetchData(favCities);
	}

	handleOnClick = (cityData) =>{
		this.props.loadLocation({
			key: cityData.location.key,
			city: cityData.location.city
		});
		this.props.routeChange('home');
	}

	render() {
		if (!this.state.favCitiesData.length)
		return null;

		let cards = this.state.favCitiesData.map((cityData) => (
			<Card key={cityData.location.key} style={{ display: 'flex', alignItems: 'center', width: '150px', marginRight: '1rem', marginBottom: '1rem' }}>
				<Card.Body>
					<Card.Title 
						style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', marginTop: '.5rem', marginBottom: '1.5rem', cursor: 'pointer' }}
						onClick={() => this.handleOnClick(cityData)}
					>
						{cityData.location.city}
					</Card.Title>
					<Card.Subtitle className="mb-2" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
						<h3>{cityData.degreesC}&deg;C</h3>
						<h6>{cityData.weatherText}</h6>
					</Card.Subtitle>
				</Card.Body>
			</Card>
		));
		
		return (
			<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '1.5rem', marginLeft: '1rem' }}>
				{ cards }
			</div>
		);
	}
}

export default Favorites;