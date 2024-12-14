import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onAdminAccess }) => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="text-lg font-extrabold">Travel Buddy</div>
        <div>
          <Link to="/" className="mr-4">
            Home
          </Link>
          <button
            onClick={onAdminAccess}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Admin
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
