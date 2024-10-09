import React from "react";

interface SpeedControlsProps {
  speed: number;
  setSpeed: (value: number) => void;
}

const SpeedControls: React.FC<SpeedControlsProps> = ({ speed, setSpeed }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="speed" className="text-sm text-gray-700">
        Speed:
      </label>
      <input
        type="range"
        id="speed"
        min="1"
        max="1000"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
      />
    </div>
  );
};

export default SpeedControls;
