import React from 'react';
import './SearchField.css';
import { asyncContainer, Typeahead } from 'react-bootstrap-typeahead';
import HandleError from '../HandleError';

const AsyncTypeahead = asyncContainer(Typeahead);
const apiKey = 'sVHvQTA0yb2tOUAwEA6hrti883uUGrsA';

class SearchField extends React.Component {
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
		if (this.state.fetchError) {
			fetchError = (
				<HandleError
				name={`Error: ${this.state.fetchError}!`}
				description={'Failed to fetch data from the server.'}
				/>
				);
			}
			
		let mistype;
		const availableChars = /^[0-9a-zA-Z]*$/;
		if (!this.state.query.match(availableChars)) {
			mistype = (
				<HandleError
					name={'Error: Mistype!'}
					description={'Only english letters are allowed.'}
				/>
			);
		}
		
		return (
			<div className='search-field'>
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
				<div className='error-msg'>
					{ fetchError }
					{ mistype }
				</div>
			</div>
		);
	}
}

export default SearchField;