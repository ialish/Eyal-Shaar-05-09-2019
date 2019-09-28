import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';

const HandleError = ({ name, description }) => {
	const [show, setShow] = useState(true);
	const toggleShow = () => setShow(!show);
	return (
		<div>
			<Toast show={show} onClose={toggleShow}>
				<Toast.Header>
					<strong className="mr-auto">{name}</strong>
				</Toast.Header>
				<Toast.Body>{description}</Toast.Body>
			</Toast>
		</div>
	);
}

export default HandleError;