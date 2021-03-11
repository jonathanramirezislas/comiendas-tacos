import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return ( 
        <div className="bg-gray-800 md:w-2/6 xl:w-1/5">
            <div className="p-6">
                <p className="text-2xl font-bold tracking-wide text-center text-white uppercase">Comiendas</p>

                <nav className="mt-10">
                    <NavLink className="block p-1 text-gray-400 hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" exact="true" to="/">Ordenes</NavLink>
                    <NavLink className="block p-1 text-gray-400 hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" exact="true" to="/menu">Menú</NavLink>
                </nav>
            </div>
        </div>
     );
}
 
export default Sidebar;