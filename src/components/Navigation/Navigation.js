import React from 'react';
import './Navigation.css';
import { Nav } from 'react-bootstrap';

const Navigation = ({ onRouteChange, route }) => {
	return (
		<Nav className="justify-content-end nav-bar" defaultActiveKey={route}>
			<Nav.Item>
				<Nav.Link eventKey="home" onClick={() => onRouteChange('home')}>
					Home
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="favorites" onClick={() => onRouteChange('favorites')}>
					Favorites
				</Nav.Link>
			</Nav.Item>
		</Nav>
	);
}

export default Navigation;