import React from 'react';
import { Routes, Route } from 'react-router';
import './styles/main.css';
import firebase, { FirebaseContext } from './firebase'; // ./firebase/index 

import Sidebar from './components/ui/Sidebar';
import Ordenes from './components/pages/Ordenes';
import Menu from './components/pages/Menu';
import NuevoPlatillo from './components/pages/NuevoPlatillo';

const App = () => {
	return (
		<FirebaseContext.Provider
			value={{
				firebase,
			}}
		>
			<div className="min-h-screen md:flex">
				<Sidebar />
				<div className="p-6 md:w-2/5 xl:w-4/5">
					<Routes>
						<Route path="/" element={<Ordenes />} />
						<Route path="/menu" element={<Menu />} />
						<Route path="/nuevo-platillo" element={<NuevoPlatillo />} />
					</Routes>
				</div>
			</div>
		</FirebaseContext.Provider>
	);
};
export default App;
