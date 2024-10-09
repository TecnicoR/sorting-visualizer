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

interface BarState {
  value: number;
  color: string;
}

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<BarState[]>([]);
  const [arraySize] = useState<number>(50);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<string>("quickSort");
  const [dataType, setDataType] = useState<string>("random");
  const [speed, setSpeed] = useState<number>(50); // Lower value means faster animation
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);

  useEffect(() => {
    generateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataType]);

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

    const initialArray: BarState[] = newArray.map((value) => ({
      value,
      color: "#3498DB", // Default blue color
    }));

    setArray(initialArray);
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
    const arrayCopy = array.map((bar) => bar.value);
    let animations: any[] = [];

    if (selectedAlgorithm === "quickSort") {
      animations = quickSortAnimations(arrayCopy);
    } else if (selectedAlgorithm === "mergeSort") {
      animations = mergeSortAnimations(arrayCopy);
    }

    animateSorting(animations);
  };

  const animateSorting = (animations: any[]) => {
    const arrayBars = array.slice();

    animations.forEach((animation, index) => {
      setTimeout(
        () => {
          const [action, idx1, idx2] = animation;

          if (action === "compare") {
            // Change color to indicate comparison
            arrayBars[idx1].color = "#E74C3C"; // Red color
            arrayBars[idx2].color = "#E74C3C";
          } else if (action === "swap") {
            // Swap the bars
            [arrayBars[idx1], arrayBars[idx2]] = [
              arrayBars[idx2],
              arrayBars[idx1],
            ];
            // Change color to indicate swap
            arrayBars[idx1].color = "#F1C40F"; // Yellow color
            arrayBars[idx2].color = "#F1C40F";
          } else if (action === "overwrite") {
            arrayBars[idx1].value = idx2;
            arrayBars[idx1].color = "#F1C40F"; // Yellow color
          }

          setArray([...arrayBars]);

          // Reset colors after action
          setTimeout(() => {
            arrayBars[idx1].color = "#3498DB"; // Default blue color
            arrayBars[idx2].color = "#3498DB";
            setArray([...arrayBars]);

            if (index === animations.length - 1) {
              // Mark the array as sorted
              arrayBars.forEach((bar) => {
                bar.color = "#2ECC71"; // Green color
              });
              setArray([...arrayBars]);
              setIsSorting(false);
            }
          }, speed);
        },
        index * speed * 2,
      ); // Multiply by 2 to allow for color reset delay
    });
  };

  const containerHeight = 400; // in pixels
  const maxValue = Math.max(...array.map((bar) => bar.value));
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
        style={{ height: `${containerHeight}px`, paddingTop: "20px" }} // Added paddingTop
      >
        {array.map((bar, idx) => (
          <motion.div
            key={idx}
            className="array-bar"
            title={`${bar.value}`} // Tooltip to show the value
            style={{
              backgroundColor: bar.color,
              height: `${(bar.value / maxValue) * (containerHeight - 20)}px`, // Adjusted height
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
