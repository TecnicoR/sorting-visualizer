// src/components/controls/SpeedControls.tsx

import React from "react";

interface SpeedControlsProps {
  speed: number;
  setSpeed: (value: number) => void;
}

const SpeedControls: React.FC<SpeedControlsProps> = ({ speed, setSpeed }) => {
  const speedOptions = [
    { label: "Slow", value: 100 },
    { label: "Medium", value: 50 },
    { label: "Fast", value: 10 },
  ];

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="speed" className="text-sm font-medium text-gray-700">
        Speed:
      </label>
      <select
        id="speed"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        {speedOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SpeedControls;
