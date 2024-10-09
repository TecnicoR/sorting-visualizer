import React from "react";

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
    <div className="flex items-center space-x-4">
      <select
        value={dataType}
        onChange={(e) => setDataType(e.target.value)}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm"
      >
        <option value="random">Random</option>
        <option value="nearlySorted">Nearly Sorted</option>
        <option value="reversed">Reversed</option>
      </select>
      <button
        onClick={generateData}
        className="rounded-md bg-blue-500 px-4 py-2 text-white shadow-sm"
      >
        Generate Data
      </button>
    </div>
  );
};

export default DataControls;
