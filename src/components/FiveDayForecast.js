import React from 'react';
import { Card } from 'react-bootstrap';

const apiKey = 'ruASFSEceIVtYZIqmjctoDSS1UXy8Hlm';

class CurrentWeather extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			DailyForecasts: []
		}
	}

	componentDidMount() {
		const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.props.location.key}?apikey=${apiKey}&metric=true`;

		fetch(url)
			.then(resp => resp.json())
			.then(json => this.setState({ 
				DailyForecasts: json.DailyForecasts 
			}));
	}

	render() {
		const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		return (
			<div style={{ display: 'flex', flexDirection: 'row', marginTop: '2rem' }}>
				{this.state.DailyForecasts.map((day) => {
					return (
						<Card style={{ width: '18rem' }}>
							<Card.Body>
								<Card.Title>{days[new Date(day.EpochDate * 1000).getDay()]}</Card.Title>
								<Card.Subtitle className="mb-2">
									{Math.round((day.Temperature.Minimum.Value + day.Temperature.Maximum.Value) / 2)}&deg;C
								</Card.Subtitle>
							</Card.Body>
						</Card>
					);
				})}
			</div>
		);
	}
}

export default CurrentWeather;