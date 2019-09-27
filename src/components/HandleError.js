import React from 'react';
import { Modal } from 'react-bootstrap';

const HandleError = ({ name, description }) => {
	return (
		<Modal.Dialog>
			<Modal.Header>
				<Modal.Title>{name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>{description}</p>
			</Modal.Body>
		</Modal.Dialog>
	);
}

export default HandleError;