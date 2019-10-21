import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';
import { setHeart, addRemoveCity } from '../../actions';

import './FavoritesButton.css';

const mapStateToProps = (state) => {
	return {
		favCities: state.toggleFavorite.favCities,
		heartImage: state.toggleFavorite.heartImage
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		handleHeartImage: (favCities) => dispatch(setHeart(favCities, ownProps.location, ownProps.heartImage)),
		onAddRemoveCity: (favCities) => (dispatch(addRemoveCity(favCities, ownProps.location, ownProps.heartImage)))
	}
}

class FavoritesButton extends Component {
	componentDidMount() {
		let favCities = JSON.parse(localStorage.getItem('Favorite Cities'));
		this.props.handleHeartImage(favCities);
	}

	componentDidUpdate() {
		this.props.handleHeartImage(this.props.favCities);
		localStorage.setItem('Favorite Cities', JSON.stringify(this.props.favCities));
	}

	render() {
		const { heartImage, favCities, onAddRemoveCity } = this.props;

		return (
			<div className='favorites-button'>
				<img src={heartImage} alt='Heart' width='35px'></img>
				<Button variant="outline-danger" size="sm" onClick={() => onAddRemoveCity(favCities)}>
					Add to Favorites
				</Button>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesButton);