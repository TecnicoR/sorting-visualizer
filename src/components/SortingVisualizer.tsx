// src/components/SortingVisualizer.tsx

import React, { useEffect, useRef, useState } from "react";
import AlgorithmSelector from "./controls/AlgorithmSelector";
import DataControls from "./controls/DataControls";
import SpeedControls from "./controls/SpeedControls";
import AlgorithmInfo from "./AlgorithmInfo";
import CodeModal from "./CodeModal";
import { quickSortAnimations } from "../algorithms/quickSort";
import { mergeSortAnimations } from "../algorithms/mergeSort";
import { motion } from "framer-motion";
import { bubbleSortAnimations } from "../algorithms/bubbleSort";
import { insertionSortAnimations } from "../algorithms/insertionSort";
import { selectionSortAnimations } from "../algorithms/selectionSort";
import { heapSortAnimations } from "../algorithms/heapSort";
import { shellSortAnimations } from "../algorithms/shellSort";
import { countingSortAnimations } from "../algorithms/countingSort";
import { radixSortAnimations } from "../algorithms/radixSort";
import { bucketSortAnimations } from "../algorithms/bucketSort";
import { combSortAnimations } from "../algorithms/combSort";
import { timSortAnimations } from "../algorithms/timSort";

interface BarState {
  id: number;
  value: number;
  color: string;
}

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<BarState[]>([]);
  const [arraySize] = useState<number>(50);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<string>("quickSort");
  const [dataType, setDataType] = useState<string>("random");
  const [speed, setSpeed] = useState<number>(50); // Default to Medium speed
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);

  // Ref to store timeouts for cancel functionality
  const timeouts = useRef<number[]>([]);

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

    const initialArray: BarState[] = newArray.map((value, index) => ({
      id: index, // Unique ID
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

    switch (selectedAlgorithm) {
      case "quickSort":
        animations = quickSortAnimations(arrayCopy);
        break;
      case "mergeSort":
        animations = mergeSortAnimations(arrayCopy);
        break;
      case "bubbleSort":
        animations = bubbleSortAnimations(arrayCopy);
        break;
      case "insertionSort":
        animations = insertionSortAnimations(arrayCopy);
        break;
      case "selectionSort":
        animations = selectionSortAnimations(arrayCopy);
        break;
      case "heapSort":
        animations = heapSortAnimations(arrayCopy);
        break;
      case "shellSort":
        animations = shellSortAnimations(arrayCopy);
        break;
      case "countingSort":
        animations = countingSortAnimations(arrayCopy);
        break;
      case "radixSort":
        animations = radixSortAnimations(arrayCopy);
        break;
      case "bucketSort":
        animations = bucketSortAnimations(arrayCopy);
        break;
      case "combSort":
        animations = combSortAnimations(arrayCopy);
        break;
      case "timSort":
        animations = timSortAnimations(arrayCopy);
        break;
      default:
        animations = [];
    }

    // Clear any existing timeouts
    timeouts.current.forEach((timeout) => clearTimeout(timeout));
    timeouts.current = [];
    animateSorting(animations);
  };

  const handleCancel = () => {
    // Clear all timeouts to stop the sorting animation
    timeouts.current.forEach((timeout) => clearTimeout(timeout));
    timeouts.current = [];
    setIsSorting(false);
    generateData(); // Regenerate the data to reset the visualizer
  };

  const animateSorting = (animations: any[]) => {
    const arrayBars = array.slice();

    animations.forEach((animation, index) => {
      const timeoutId = window.setTimeout(
        () => {
          const [action, idx1, idx2] = animation;

          if (action === "compare") {
            // Change color to indicate comparison
            arrayBars[idx1].color = "#E74C3C"; // Red
            arrayBars[idx2].color = "#E74C3C";
          } else if (action === "swap") {
            // Swap the bars
            [arrayBars[idx1], arrayBars[idx2]] = [
              arrayBars[idx2],
              arrayBars[idx1],
            ];
          } else if (action === "overwrite") {
            arrayBars[idx1].value = idx2;
          }

          setArray([...arrayBars]);

          // Reset colors after comparison
          if (action === "compare") {
            setTimeout(() => {
              arrayBars[idx1].color = "#3498DB"; // Default blue color
              arrayBars[idx2].color = "#3498DB";
              setArray([...arrayBars]);
            }, speed);
          }

          // At the end of the animations
          if (index === animations.length - 1) {
            setTimeout(() => {
              arrayBars.forEach((bar) => {
                bar.color = "#2ECC71"; // Green
              });
              setArray([...arrayBars]);
              setIsSorting(false);
            }, speed);
          }
        },
        index * speed * 2,
      );

      // Store the timeout IDs
      timeouts.current.push(timeoutId);
    });
  };

  const containerHeight = 400; // in pixels
  const maxValue = Math.max(...array.map((bar) => bar.value));
  const barWidth = Math.max(5, Math.floor(800 / arraySize));

  return (
    <div className="container mx-auto mt-6 px-4">
      {/* Control Panel */}
      <div className="mb-4 flex flex-wrap items-center justify-between space-y-2">
        {/* Control Group */}
        <div className="flex flex-wrap items-center space-x-4">
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
        </div>
        {/* Buttons Group */}
        <div className="flex space-x-4">
          <button
            onClick={handleSort}
            disabled={isSorting}
            className={`px-4 py-2 ${
              isSorting
                ? "cursor-not-allowed bg-gray-400"
                : "bg-green-500 hover:bg-green-600"
            } rounded-md text-white shadow-sm focus:outline-none`}
          >
            {isSorting ? "Sorting..." : "Sort"}
          </button>
          <button
            onClick={handleCancel}
            disabled={!isSorting}
            className={`px-4 py-2 ${
              !isSorting
                ? "cursor-not-allowed bg-gray-400"
                : "bg-red-500 hover:bg-red-600"
            } rounded-md text-white shadow-sm focus:outline-none`}
          >
            Cancel
          </button>
          <button
            onClick={() => setShowCodeModal(true)}
            className="rounded-md bg-indigo-500 px-4 py-2 text-white shadow-sm hover:bg-indigo-600 focus:outline-none"
          >
            Get Code
          </button>
        </div>
      </div>

      {/* Visualizer */}
      <div
        className="relative flex items-end justify-center overflow-hidden rounded-md border bg-white"
        style={{ height: `${containerHeight}px`, paddingTop: "20px" }} // Added paddingTop
      >
        {array.map((bar) => (
          <motion.div
            key={bar.id}
            className="array-bar"
            title={`${bar.value}`} // Tooltip to show the value
            style={{
              backgroundColor: bar.color,
              height: `${(bar.value / maxValue) * (containerHeight - 20)}px`, // Adjusted height
              width: `${barWidth}px`,
              margin: "0 1px",
            }}
            layout
            transition={{ duration: 0.2 }}
          ></motion.div>
        ))}
      </div>

      {/* Algorithm Information */}
      <AlgorithmInfo algorithm={selectedAlgorithm} />

      {/* Code Modal */}
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
