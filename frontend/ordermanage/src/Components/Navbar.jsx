import React from 'react';
import {Link} from "react-router-dom";


function NavBar() {
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex">
            <Link to="/" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/orders" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">Orders</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
