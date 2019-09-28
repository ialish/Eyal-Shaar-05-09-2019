import React from 'react';
import HandleError from './HandleError';

const apiKey = 'GBQOaTaovFvWYmzOoH4RFrCGKnhKaJOd';

class CurrentWeather extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: '',
			degreesC: null,
			weatherText: '',
			fetchError: ''
		}
	}

	fetchForecast = () => {
		const url = `https://dataservice.accuweather.com/currentconditions/v1/${this.props.location.key}?apikey=${apiKey}`;

		fetch(url)
			.then(resp => resp.json())
			.then(json => this.setState({
				city: this.props.location.city,
				degreesC: json[0].Temperature.Metric.Value,
				weatherText: json[0].WeatherText
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
			<div>
				<h5>{this.state.city}</h5>
				<h6>{Math.round(this.state.degreesC)}&deg;C</h6>
				<h2 style={{ textAlign: 'center' }}>{this.state.weatherText}</h2>
				<div style={{ zIndex: 1, position: 'fixed', top: 0, left: 0 }}>
					{fetchError}
				</div>
			</div>
		);
	}
}

export default CurrentWeather;