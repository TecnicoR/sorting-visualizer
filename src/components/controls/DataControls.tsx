// src/components/controls/DataControls.tsx

import React from "react";
import { MdRefresh } from "react-icons/md"; // Import refresh icon

interface DataControlsProps {
  dataType: string;
  setDataType: (value: string) => void;
  generateData: () => void;
}

const DataControls: React.FC<DataControlsProps> = ({
  dataType,
  setDataType,
  generateData,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="dataType" className="text-sm font-medium text-gray-700">
        Data Type:
      </label>
      <select
        id="dataType"
        value={dataType}
        onChange={(e) => setDataType(e.target.value)}
        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        <option value="random">Random</option>
        <option value="nearlySorted">Nearly Sorted</option>
        <option value="reversed">Reversed</option>
      </select>
      <button
        onClick={generateData}
        className="flex items-center rounded-md bg-blue-500 px-4 py-2 text-white shadow-sm hover:bg-blue-600 focus:outline-none"
      >
        <MdRefresh className="mr-2 h-5 w-5" aria-hidden="true" />
        Generate
      </button>
    </div>
  );
};

export default DataControls;
