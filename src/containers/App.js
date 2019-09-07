import React, { Component } from 'react';
import './App.css';
import LocationSearchBox from '../components/LocationSearchBox';

const apiKey = 'mOpRPVwqblEjyAAnjvQqSaOM8qKUhgaR';

class App extends Component {
	constructor() {
		super();
		this.state = {
			defaultLocation: 'Tel Aviv',
			input: '',
			location: ''
		};
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	}

	onLocationSubmit = () => {
		this.setState({ location: this.state.input });
	}
	
	locationAutocomplete = () => {
		const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${this.state.inputLocation}`;

		fetch(urll)
			.then((response) => response.json())
			.then(data => console.log(data[0].LocalizedName));
			
	}

	render() {
		return (
			<div className="App">
				<h1>What's The Weather</h1>
				{this.locationAutocomplete()}
				<LocationSearchBox
					inputChange={this.onInputChange}
					locationSubmit={this.onLocationSubmit}
				/>
			</div>
		);
	}
}

export default App;