import React from 'react';
import { Nav } from 'react-bootstrap';

const navStyle = {
	display: 'flex',
	justifyContent: 'flex-end',
	backgroundColor: 'rgba(250, 250, 250, 0.9)'
};

const Navigation = ({ routeChange }) => {
	return (
		<Nav style={navStyle} variant="pills" defaultActiveKey="home">
			<Nav.Item>
				<Nav.Link eventKey="home" onClick={() => routeChange('home')}>
					Home
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="favorites" onClick={() => routeChange('favorites')}>
					Favorites
				</Nav.Link>
			</Nav.Item>
		</Nav>
	);
}

export default Navigation;