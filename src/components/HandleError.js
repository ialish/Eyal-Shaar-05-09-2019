import React from 'react';
import { Toast/* , Modal */ } from 'react-bootstrap';

const HandleError = ({ name, description }) => {
	return (
		<div>
			<Toast>
				<Toast.Header>
					<img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
					<strong className="mr-auto">{name}</strong>
				</Toast.Header>
				<Toast.Body>{description}</Toast.Body>
			</Toast>
			{/* <Modal.Dialog>
				<Modal.Header>
					<Modal.Title>{name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>{description}</p>
				</Modal.Body>
			</Modal.Dialog> */}
		</div>
	);
}

export default HandleError;