import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return ( 
        <div className="bg-orange-dark md:w-2/6 xl:w-1/5 h-screen fixed ">
            <div className="p-6">
                <img src={'https://res.cloudinary.com/djuqxjkh3/image/upload/v1616186851/taacos/Los_RICO_shsezz.png'} alt ="sagrado corazon"></img>
                <nav className="mt-10">
                    <NavLink className="block p-1 text-white font-medium  hover:bg-blue-500 " exact="true" activeClassName="text-orange-600 border-orange-600"  to="/">Ordenes</NavLink>
                    <NavLink className="block p-1 text-white font-medium  hover:bg-blue-500 " activeClassName="text-orange-600 border-orange-600" exact="true" to="/menu">Menú</NavLink>
                </nav>
            </div>
        </div>
     );
}
 
export default Sidebar;