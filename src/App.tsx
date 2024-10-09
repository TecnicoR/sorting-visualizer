import React from "react";
import Navbar from "./components/Navbar";
import SortingVisualizer from "./components/SortingVisualizer";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <SortingVisualizer />
    </div>
  );
};

export default App;
