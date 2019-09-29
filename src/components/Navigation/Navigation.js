import React from 'react';
import './Navigation.css';
import { Nav } from 'react-bootstrap';

const Navigation = ({ routeChange, route }) => {
	return (
		<Nav className="justify-content-end nav-bar" defaultActiveKey={route}>
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