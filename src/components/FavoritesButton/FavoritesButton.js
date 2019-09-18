import React, { Component } from 'react';
import HeartHollow from './HeartHollow.svg';
import HeartFull from './HeartFull.svg';
import { Button } from 'react-bootstrap';

class FavoritesButton extends Component {
	constructor() {
		super();
		this.state = {
			toggle: 'off',
			favCities: []
		};
	}

	addRemoveCity = () => {
		if (this.state.favCities.some(cityKey => (cityKey === this.props.location.key))) {
			this.setState({ toggle: 'off' });
		} else {
			this.setState({ toggle: 'on' });
			this.setState({ favCities: this.props.location.key });
		}
	}

	render() {
		return (
			<div style={{ float: 'right' }}>
				{
					this.state.toggle === 'off' ?
						<img src={HeartHollow} alt='Heart' width='35px' style={{ marginRight: 10 }}></img>
						: <img src={HeartFull} alt='Heart' width='35px' style={{ marginRight: 10 }}></img>
				}
				<Button variant="outline-danger" size="sm" onClick={this.addRemoveCity}>Add to Favorites</Button>
				{console.log(this.state.favCities)}
			</div>
		);
	}
}

export default FavoritesButton;