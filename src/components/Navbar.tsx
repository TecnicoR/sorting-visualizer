import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">
              Sorting Visualizer
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
