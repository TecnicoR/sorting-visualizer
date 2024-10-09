// src/components/controls/AlgorithmSelector.tsx

import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
// Remove Heroicons imports
// import { SelectorIcon, CheckIcon } from '@heroicons/react/solid';
// Import icons from react-icons
import { AiFillCaretDown } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

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
  const selected = algorithms.find((algo) => algo.value === selectedAlgorithm);

  return (
    <div className="w-60">
      <Listbox value={selectedAlgorithm} onChange={setSelectedAlgorithm}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
            <span className="block truncate">{selected?.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {/* Replace SelectorIcon with AiFillCaretDown */}
              <AiFillCaretDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {algorithms.map((algo) => (
                <Listbox.Option
                  key={algo.value}
                  className={({ active }) =>
                    `${
                      active ? "bg-indigo-600 text-white" : "text-gray-900"
                    } relative cursor-default select-none py-2 pl-10 pr-4`
                  }
                  value={algo.value}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {algo.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-indigo-600"
                          }`}
                        >
                          {/* Replace CheckIcon with FaCheck */}
                          <FaCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default AlgorithmSelector;
