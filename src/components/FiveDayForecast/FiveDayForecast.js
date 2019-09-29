import React from 'react';
import './FiveDayForecast.css';
import { Card } from 'react-bootstrap';
import HandleError from '../HandleError';

const apiKey = process.env.REACT_APP_API_KEY;

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
			<div className='five-day-cards'>
				{this.state.DailyForecasts.map((day, index) => {
					return (
						<Card className='five-day-card' key={index}>
							<Card.Body>
								<Card.Title className='five-day-card-title'>
									{days[new Date(day.EpochDate * 1000).getDay()]}
								</Card.Title>
								<Card.Subtitle className="mb-2 five-day-card-subtitle">
									{Math.round((day.Temperature.Minimum.Value + day.Temperature.Maximum.Value) / 2)}&deg;C
								</Card.Subtitle>
							</Card.Body>
						</Card>
					);
				})}
				<div className='error-msg'>
					{fetchError}
				</div>
			</div>
		);
	}
}

export default FiveDayForecast;