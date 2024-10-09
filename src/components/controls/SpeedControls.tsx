// src/components/controls/SpeedControls.tsx

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
        max="100"
        value={101 - speed} // Invert the speed value
        onChange={(e) => setSpeed(101 - Number(e.target.value))}
      />
    </div>
  );
};

export default SpeedControls;
