import React from 'react';
import { Form, Button } from 'react-bootstrap';

const LocationSearchBox = ({ inputChange, locationSubmit }) => {
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
						onChange={inputChange}
					/>
				</Form.Group>
				<Button
					variant="primary"
					type="submit"
					onClick={locationSubmit}
				>
					Submit
  			</Button>
			</Form>
		</div>
	);
}

export default LocationSearchBox;