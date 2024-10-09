import React from "react";
import { Listbox } from "@headlessui/react";

const algorithms = [
  { name: "Quick Sort", value: "quickSort" },
  { name: "Merge Sort", value: "mergeSort" },
];

interface AlgorithmSelectorProps {
  selectedAlgorithm: string;
  setSelectedAlgorithm: (value: string) => void;
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  selectedAlgorithm,
  setSelectedAlgorithm,
}) => {
  return (
    <div className="w-60">
      <Listbox value={selectedAlgorithm} onChange={setSelectedAlgorithm}>
        <Listbox.Button className="w-full cursor-default rounded-md border border-gray-300 bg-white px-3 py-2 text-left shadow-sm">
          {algorithms.find((algo) => algo.value === selectedAlgorithm)?.name}
        </Listbox.Button>
        <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg">
          {algorithms.map((algo) => (
            <Listbox.Option
              key={algo.value}
              value={algo.value}
              className="relative cursor-default select-none py-2 pl-10 pr-4"
            >
              {algo.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default AlgorithmSelector;
