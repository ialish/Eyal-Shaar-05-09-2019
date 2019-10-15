import React from 'react';
import { connect } from 'react-redux';

import HandleError from '../HandleError';
import { requestCurrentWeather } from '../../actions';

import './CurrentWeather.css';

const mapStateToProps = (state) => {
	return {
		isPending: state.changeCurrentWeather.isPending,
		currentWeatherData: state.changeCurrentWeather.currentWeatherData,
		error: state.changeCurrentWeather.error
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onRequestCurrentWeather: () => dispatch(requestCurrentWeather(ownProps.location))
	}
}

class CurrentWeather extends React.Component {
	componentDidMount() {
		this.props.onRequestCurrentWeather();
	}
	
	componentDidUpdate(prevProps) {
		const prevLocation = prevProps.location || {};
		if (prevLocation.key !== this.props.location.key) {
			this.props.onRequestCurrentWeather();
		}
	}
	
	render() {
		const { currentWeatherData, error } = this.props;

		let fetchError;
		if (error) {
			fetchError = (
				<HandleError
					name={`Error: ${error}!`}
					description={'Failed to fetch data from the server.'}
				/>
			);
		}
		return (
			<div>
				<h5 className='city'>{currentWeatherData.city}</h5>
				<h6>{Math.round(currentWeatherData.degreesC)}&deg;C</h6>
				<h2 className='weather-text'>{currentWeatherData.weatherText}</h2>
				<div className='error-msg'>
					{fetchError}
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);