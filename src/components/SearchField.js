import React from 'react';
import { asyncContainer, Typeahead } from 'react-bootstrap-typeahead';
import HandleError from './HandleError';

const AsyncTypeahead = asyncContainer(Typeahead);
const apiKey = 'z21R9ZnuD59rgzSrYCWF3pc5tdrJF63A';

class SearchBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			options: [],
			query: '',
			fetchError: ''
		}
	}

	onInputChange = (query) => {
		this.setState({ query });
	}

	onSearch = (query) => {
		this.setState({ isLoading: true });

		const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${query}`;

		fetch(url)
			.then(resp => resp.json())
			.then(json => this.setState({
				isLoading: false,
				options: json
			}))
			.catch(err => this.setState({ fetchError: err.message }));
	}
	
	onChange = (selectedOptions) => {
		this.props.loadLocation({
			key: selectedOptions[0].Key,
			city: selectedOptions[0].LocalizedName
		});

		this.clearRequest();
	}
	
	clearRequest = () => {
		setTimeout(() => this.refs.SubjectTypeahead.getInstance().clear(), 0);
	}

	render() {
		let fetchError;
		let mistype;
		const availableChars = /^[0-9a-zA-Z]*$/;

		if (this.state.fetchError) {
			fetchError = (
				<HandleError
					name={`Error: ${this.state.fetchError}!`}
					description={'Failed to fetch data from the server.'}
				/>
			);
		}
		
		if (!this.state.query.match(availableChars)) {
			mistype = (
				<HandleError
					name={'Error: Mistype!'}
					description={'Only english letters are allowed.'}
				/>
			);
		}
		
		return (
			<div style={{ width: 200 }}>
				<AsyncTypeahead
					id="AsyncTypeahead"
					ref="SubjectTypeahead"
					placeholder="Enter location"
					isLoading={this.state.isLoading}
					labelKey="LocalizedName"
					onInputChange={this.onInputChange}
					onSearch={this.onSearch}
					options={this.state.options}
					onChange={this.onChange}
				/>
				<div style={{ zIndex: 1, position: 'fixed', top: 0, left: 0 }}>
					{ fetchError }
					{ mistype }
				</div>
			</div>
		);
	}
}

export default SearchBox;