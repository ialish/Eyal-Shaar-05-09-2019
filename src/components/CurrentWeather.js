import React from 'react';

const apiKey = 'ruASFSEceIVtYZIqmjctoDSS1UXy8Hlm';

class CurrentWeather extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: '',
			degreesC: null,
			WeatherText: ''
		}
	}

	componentDidMount() {
		const url = `http://dataservice.accuweather.com/currentconditions/v1/${this.props.location.key}?apikey=${apiKey}`;

		fetch(url)
			.then(resp => resp.json())
			.then(json => this.setState({
				city: this.props.location.city,
				degreesC: json[0].Temperature.Metric.Value,
				WeatherText: json[0].WeatherText
			}));
	}

	render() {
		return (
			<div>
				<h5>{this.state.city}</h5>
				<h6>{Math.round(this.state.degreesC)}&deg;C</h6>
				<h2 style={{ textAlign: 'center' }}>{this.state.WeatherText}</h2>
			</div>
		);
	}
}

export default CurrentWeather;