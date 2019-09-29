import React from 'react';
import { Card } from 'react-bootstrap';
import HandleError from './HandleError';

const apiKey = 'sYOuz7QEFflK10BlX7jA4fFfBeMJ38Tu';

class FiveDayForecast extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			DailyForecasts: [],
			fetchError: ''
		}
	}

	fetchForecast = () => {
		const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.props.location.key}?apikey=${apiKey}&metric=true`;

		fetch(url)
			.then(resp => resp.json())
			.then(json => this.setState({
				DailyForecasts: json.DailyForecasts
			}))
			.catch(err => this.setState({ fetchError: err.message }));
	}

	componentDidMount() {
		this.fetchForecast();
	}

	componentDidUpdate(prevProps) {
		const prevLocation = prevProps.location || {};
		if (prevLocation.key !== this.props.location.key) {
			this.fetchForecast();
		}
	}

	render() {
		const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		let fetchError;

		if (this.state.fetchError) {
			fetchError = (
				<HandleError
					name={`Error: ${this.state.fetchError}!`}
					description={'Failed to fetch data from the server.'}
				/>
			);
		}
		return (
			<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
				{this.state.DailyForecasts.map((day, index) => {
					return (
						<Card key={index} style={{ width: '5rem' }}>
							<Card.Body>
								<Card.Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{days[new Date(day.EpochDate * 1000).getDay()]}</Card.Title>
								<Card.Subtitle className="mb-2" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
									{Math.round((day.Temperature.Minimum.Value + day.Temperature.Maximum.Value) / 2)}&deg;C
								</Card.Subtitle>
							</Card.Body>
						</Card>
					);
				})}
				<div style={{ zIndex: 1, position: 'fixed', top: 0, left: 0 }}>
					{fetchError}
				</div>
			</div>
		);
	}
}

export default FiveDayForecast;