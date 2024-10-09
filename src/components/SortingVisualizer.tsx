// src/components/SortingVisualizer.tsx

import React, { useEffect, useState } from "react";
import AlgorithmSelector from "./controls/AlgorithmSelector";
import DataControls from "./controls/DataControls";
import SpeedControls from "./controls/SpeedControls";
import AlgorithmInfo from "./AlgorithmInfo";
import CodeModal from "./CodeModal";
import { quickSortAnimations } from "../algorithms/quickSort";
import { mergeSortAnimations } from "../algorithms/mergeSort";
import { motion } from "framer-motion";

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(50);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<string>("quickSort");
  const [dataType, setDataType] = useState<string>("random");
  const [speed, setSpeed] = useState<number>(50); // Lower value means faster animation
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);

  useEffect(() => {
    generateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arraySize, dataType]);

  const generateData = () => {
    const newArray: number[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(5, 500));
    }

    if (dataType === "nearlySorted") {
      newArray.sort((a, b) => a - b);
      swapElements(
        newArray,
        Math.floor(arraySize / 2),
        Math.floor(arraySize / 2) + 1,
      );
    } else if (dataType === "reversed") {
      newArray.sort((a, b) => b - a);
    }

    setArray(newArray);
  };

  const swapElements = (arr: number[], indexA: number, indexB: number) => {
    [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
  };

  const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const handleSort = () => {
    if (isSorting) return;
    setIsSorting(true);
    const arrayCopy = array.slice();
    let animations: any[] = [];

    if (selectedAlgorithm === "quickSort") {
      animations = quickSortAnimations(arrayCopy);
    } else if (selectedAlgorithm === "mergeSort") {
      animations = mergeSortAnimations(arrayCopy);
    }

    animateSorting(animations);
  };

  const animateSorting = (animations: any[]) => {
    const arrayCopy = array.slice();
    animations.forEach((animation, index) => {
      setTimeout(() => {
        const [type, idx1, idx2, value1, value2] = animation;
        if (type === "swap") {
          [arrayCopy[idx1], arrayCopy[idx2]] = [
            arrayCopy[idx2],
            arrayCopy[idx1],
          ];
        } else if (type === "overwrite") {
          arrayCopy[idx1] = value1;
        }
        setArray([...arrayCopy]);

        if (index === animations.length - 1) {
          setIsSorting(false);
        }
      }, index * speed);
    });
  };

  const containerHeight = 400; // in pixels
  const maxValue = Math.max(...array);
  const barWidth = Math.max(5, Math.floor(800 / arraySize));

  return (
    <div className="container mx-auto mt-6">
      <div className="mb-4 flex flex-wrap items-center justify-between space-y-2">
        <AlgorithmSelector
          selectedAlgorithm={selectedAlgorithm}
          setSelectedAlgorithm={setSelectedAlgorithm}
        />
        <DataControls
          dataType={dataType}
          setDataType={setDataType}
          generateData={generateData}
        />
        <SpeedControls speed={speed} setSpeed={setSpeed} />
        <button
          onClick={handleSort}
          disabled={isSorting}
          className={`px-4 py-2 ${
            isSorting ? "bg-gray-400" : "bg-green-500"
          } rounded-md text-white shadow-sm`}
        >
          {isSorting ? "Sorting..." : "Sort"}
        </button>
        <button
          onClick={() => setShowCodeModal(true)}
          className="rounded-md bg-indigo-500 px-4 py-2 text-white shadow-sm"
        >
          Get Code
        </button>
      </div>
      <div
        className="relative flex items-end justify-center overflow-hidden rounded-md border bg-white"
        style={{ height: `${containerHeight}px` }}
      >
        {array.map((value, idx) => (
          <motion.div
            key={idx}
            className="array-bar"
            style={{
              backgroundColor: "#3498DB",
              height: `${(value / maxValue) * containerHeight}px`,
              width: `${barWidth}px`,
              margin: "0 1px",
            }}
            layout
            transition={{ duration: 0.05 }}
          ></motion.div>
        ))}
      </div>
      <AlgorithmInfo algorithm={selectedAlgorithm} />
      {showCodeModal && (
        <CodeModal
          algorithm={selectedAlgorithm}
          onClose={() => setShowCodeModal(false)}
        />
      )}
    </div>
  );
};

export default SortingVisualizer;
