import React from 'react';
import { connect } from 'react-redux';

import { Card } from 'react-bootstrap';
import HandleError from '../HandleError';
import { requestFiveDayForecast } from '../../actions';

import './FiveDayForecast.css';

const mapStateToProps = (state) => {
	return {
		isPending: state.changeFiveDayForecast.isPending,
		DailyForecasts: state.changeFiveDayForecast.DailyForecasts,
		error: state.changeFiveDayForecast.error
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onRequestFiveDayForecast: () => dispatch(requestFiveDayForecast(ownProps.location))
	}
}

class FiveDayForecast extends React.Component {
	componentDidMount() {
		this.props.onRequestFiveDayForecast();
	}

	componentDidUpdate(prevProps) {
		const prevLocation = prevProps.location || {};
		if (prevLocation.key !== this.props.location.key) {
			this.props.onRequestFiveDayForecast();
		}
	}

	render() {
		const { DailyForecasts, error } = this.props;
		const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		
		let fetchError;
		if (error) {
			fetchError = (
				<HandleError
					name={`Error: ${error}!`}
					description={`Failed to fetch data from the server.`}
				/>
			);
			return (
				<div className='error-msg'>
					{fetchError}
				</div>
			);
		}

		return (
			<div className='five-day-cards'>
				{DailyForecasts.map((day, index) => {
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
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FiveDayForecast);