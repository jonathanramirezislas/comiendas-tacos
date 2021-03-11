import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
	return (
		<>
			<h1 className="mb-4 text-3xl font-light">Menu</h1>
			<Link
				to="/nuevo-platillo"
				className="  bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold"
			>
				Agregar Platillo
			</Link>
            
		</>
	);
};

export default Menu;
