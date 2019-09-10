import React, { Component } from 'react';
import './App.css';
import SearchBox from '../components/SearchBox';

// const defaultLocation = 'Tel Aviv';

class App extends Component {
	constructor() {
		super();
		this.state = {
			locationKey: ''
		};
	}

	loadLocation = (locationKey) => {
		this.setState({ locationKey });
	}

	render() {
		return (
			<div className="App">
				<h1>What's The Weather</h1>
				<SearchBox
					loadLocation={this.loadLocation}
				/>
			</div>
		);
	}
}

export default App;