import React, { Component } from 'react';
import HeartHollow from './HeartHollow.svg';
import HeartFull from './HeartFull.svg';
import { Button } from 'react-bootstrap';

class FavoritesButton extends Component {
	constructor() {
		super();
		this.state = {
			heartImage: HeartHollow,
			favCities: []
		};
	}

	componentDidMount() {
		if (this.state.favCities.includes(this.props.location)) {
			this.setState({ heartImage: HeartFull });
		}
	}

	addRemoveCity = () => {
		if (this.state.heartImage === HeartHollow) {
			this.setState({
				heartImage: HeartFull,
				favCities: this.props.location
			})
		} else {
			let array = [...this.state.favCities];
			const index = array.indexOf(this.props.location);
			array.splice(index, 1);
			this.setState({
				heartImage: HeartHollow,
				favCities: array
			})
		}
	}

	render() {
		return (
			<div style={{ float: 'right' }}>
				{<img src={this.state.heartImage} alt='Heart' width='35px' style={{ marginRight: 10 }}></img>}
				<Button variant="outline-danger" size="sm" onClick={this.addRemoveCity}>Add to Favorites</Button>
			</div>
		);
	}
}

export default FavoritesButton;