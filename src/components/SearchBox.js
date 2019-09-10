import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { asyncContainer, Typeahead } from 'react-bootstrap-typeahead';

const AsyncTypeahead = asyncContainer(Typeahead);

const apiKey = 'mOpRPVwqblEjyAAnjvQqSaOM8qKUhgaR';

class SearchBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			options: [],
			isLoading: false
		}
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	}

	onSearch = () => {
		if (this.state.input) {
			const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${this.state.input}`;

			fetch(url)
				.then((response) => response.json())
				.then((data) => {
					this.setState({ options: data.map(element => (
						{
							key: element.Key,
							localizedName: element.LocalizedName
						}
					))});
				});
		}
	}	

	// clearRequest = () => {
	// 	this.setState({ options: [] });
	// }

	onSubmit = () => {
		if (this.state.options.length === 1) {
			this.props.loadLocation(this.state.options[0].key);
		}
	}

	render() {
		return (
			<div style={{ textAlign: 'center', width: 350 }}>
				<Form>
					<Form.Group controlId="formLocation">
						<Form.Label style={{ marginTop: '20px' }}>
							Enter the name of the city.
						</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter location"
							onChange={this.onInputChange}
						/>
					</Form.Group>
					<AsyncTypeahead
						isLoading={this.state.isLoading}
						onSearch={query => {
							this.setState({ isLoading: true });
							fetch(`https://api.github.com/search/users?q=${query}`)
								.then(resp => resp.json())
								.then(json => this.setState({
									isLoading: false,
									options: json.items,
								}));
						}}
						options={this.state.options}
					/>
					<Button
						variant="primary"
						type="submit"
						onClick={this.onSubmit}
					>
						Submit
					</Button>
				</Form>
			</div>
		);
	}
}

export default SearchBox;