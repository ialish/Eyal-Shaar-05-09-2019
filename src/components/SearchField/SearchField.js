import React from 'react';
import { connect } from 'react-redux';

import { asyncContainer, Typeahead } from 'react-bootstrap-typeahead';
import HandleError from '../HandleError';
import { updateInput, requestSearchOptions } from '../../actions';

import './SearchField.css';

const AsyncTypeahead = asyncContainer(Typeahead);

const mapStateToProps = (state) => {
	return {
		query: state.changeInput.query,
		isLoading: state.changeInput.isLoading,
		options: state.changeInput.options,
		error: state.changeInput.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onInputChange: (query) => dispatch(updateInput(query)),
		onSearch: (query) => dispatch(requestSearchOptions(query))
	}
}

class SearchField extends React.Component {
	onChange = (selectedOptions) => {
		this.props.onLocationChange({
			key: selectedOptions[0].Key,
			city: selectedOptions[0].LocalizedName
		});

		this.clearRequest();
	}
	
	clearRequest = () => {
		setTimeout(() => this.refs.SubjectTypeahead.getInstance().clear(), 0);
	}

	render() {
		const { query, onInputChange, onSearch, isLoading, options, error } = this.props;

		let fetchError;
		if (error) {
			fetchError = (
				<HandleError
					name={`Error: ${error}!`}
					description={`Failed to fetch data from the server.`}
				/>
			);
			return (
				<div className='error-msg'>
					{fetchError}
				</div>
			);
		}
			
		let mistype;
		const availableChars = /^[0-9a-zA-Z ]*$/;
		if (!query.match(availableChars)) {
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
					isLoading={isLoading}
					labelKey="LocalizedName"
					onInputChange={onInputChange}
					onSearch={onSearch}
					options={options}
					onChange={this.onChange}
				/>
				<div className='error-msg'>
					{ mistype }
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchField);