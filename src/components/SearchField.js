import React from 'react';
import { asyncContainer, Typeahead } from 'react-bootstrap-typeahead';

const AsyncTypeahead = asyncContainer(Typeahead);
const apiKey = '8dBPkZi2ZK3ak4ak3UvqtEqpmyyzR8kL';

class SearchBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			options: [],
			query: ''
		}
	}

	onInputChange = (query) => {
		this.setState({ query });
	}

	onSearch = (query) => {
		this.setState({ isLoading: true });

		const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${query}`;

		fetch(url)
			.then(resp => resp.json())
			.then(json => this.setState({
				isLoading: false,
				options: json
			}));
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
		return (
			<div style={{ textAlign: 'center', width: 350 }}>
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
			</div>
		);
	}
}

export default SearchBox;