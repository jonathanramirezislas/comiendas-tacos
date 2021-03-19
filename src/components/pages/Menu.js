import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import Platillo from '../ui/Platillo';

const Menu = () => {

	// definir el state para los platillos
	const [platillos, setPlatillos] = useState([]);

	const { firebase } = useContext(FirebaseContext);

	// consultar la base de datos al cargar
	useEffect(() => {
		const obtenerPlatillos = () => {
			//real time
			firebase.db.collection('productos').onSnapshot(manejarSnapshot);
		}
		obtenerPlatillos();
	}, []);

	// Snapshot nos permite utilizar la base de datos en tiempo real de firestore
	function manejarSnapshot(snapshot) {
		const platillos = snapshot.docs.map(doc => {
			return {
				id: doc.id,
				...doc.data() //contenido del platillo
			}
		});// almacenar los resultados en el state
		setPlatillos(platillos);
	}

	return (
		<div className="ml-80">
			<h1 className="mb-4 text-3xl font-light">Menu</h1>
			<Link
				to="/nuevo-platillo"
				className="  bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold"
			>
				Agregar Platillo
			</Link>

			{platillos.map(platillo => (
				<Platillo
					key={platillo.id}
					platillo={platillo}
				/>
			))}

		</div>
	);
};

export default Menu;
