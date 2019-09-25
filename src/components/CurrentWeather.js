import React from 'react';

const apiKey = 'eRQtGqe0oHVQ0SMMUleR1xdOj8GL55WV';

class CurrentWeather extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: '',
			degreesC: null,
			weatherText: ''
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
			}));
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
		return (
			<div>
				<h5>{this.state.city}</h5>
				<h6>{Math.round(this.state.degreesC)}&deg;C</h6>
				<h2 style={{ textAlign: 'center' }}>{this.state.weatherText}</h2>
			</div>
		);
	}
}

export default CurrentWeather;