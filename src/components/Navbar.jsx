import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle link click and close the dropdown
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-800 text-white p-3">
      <div className="container mx-auto">
        <div className="flex justify-between md:justify-around  items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">E-Signature</div>

          {/* Menu button for small screens */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                ></path>
              </svg>
            </button>
          </div>

          {/* Links for larger screens */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="px-3 py-2 hover:bg-gray-700 rounded">
              Home
            </Link>
            <Link to="/signature-generator" className="px-3 py-2 hover:bg-gray-700 rounded">
              Signature Generator
            </Link>
            <Link to="/signature-draw" className="px-3 py-2 hover:bg-gray-700 rounded">
              Draw Signature
            </Link>
          </div>
        </div>

        {/* Dropdown menu for smaller screens, positioned below logo */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-2">
            <Link to="/" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-700 rounded">
              Home
            </Link>
            <Link to="/signature-generator" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-700 rounded">
              Signature Generator
            </Link>
            <Link to="/signature-draw" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-700 rounded">
              Draw Signature
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
