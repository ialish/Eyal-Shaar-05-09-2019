import React, { Component } from 'react';
import './FavoritesButton.css';
import HeartHollow from './HeartHollow.svg';
import HeartFull from './HeartFull.svg';
import { Button } from 'react-bootstrap';

class FavoritesButton extends Component {
	constructor() {
		super();
		this.state = {
			favCities: [],
			heartImage: HeartHollow
		};
	}

	handleHeartImage = () => {
		if (this.state.favCities) {
			if (this.state.favCities.find(element =>
				element.key === this.props.location.key)) {
				if (this.state.heartImage === HeartHollow)
					this.setState({ heartImage: HeartFull });
			} else {
				if (this.state.heartImage === HeartFull)
					this.setState({ heartImage: HeartHollow });
			}
		}
	}

	componentDidMount() {
		this.setState({ favCities: JSON.parse(localStorage.getItem('Favorite Cities')) });
		this.handleHeartImage();
	}

	componentDidUpdate() {
		this.handleHeartImage();
		localStorage.setItem('Favorite Cities', JSON.stringify(this.state.favCities));
	}

	addRemoveCity = () => {
		let array;

		if (this.state.favCities) {
			array = [...this.state.favCities];
		} else {
			array = [];
		}
		
		if (this.state.heartImage === HeartHollow) {
			array.push(this.props.location);
			this.setState({
				heartImage: HeartFull,
				favCities: array
			})
		} else {
			const index = array.findIndex(element =>
				element.key === this.props.location.key);
				
			array.splice(index, 1);
			this.setState({
				heartImage: HeartHollow,
				favCities: array
			})
		}
	}

	render() {
		return (
			<div className='favorites-button'>
				<img src={this.state.heartImage} alt='Heart' width='35px'></img>
				<Button variant="outline-danger" size="sm" onClick={this.addRemoveCity}>Add to Favorites</Button>
			</div>
		);
	}
}

export default FavoritesButton;