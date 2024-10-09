import React from "react";

interface AlgorithmInfoProps {
  algorithm: string;
}

const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ algorithm }) => {
  const info = {
    quickSort: {
      name: "Quick Sort",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(log n)",
      description:
        "Quick Sort is a divide-and-conquer algorithm that selects a pivot element and partitions the array around the pivot.",
    },
    mergeSort: {
      name: "Merge Sort",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      description:
        "Merge Sort is a divide-and-conquer algorithm that divides the array into halves, sorts them, and then merges them.",
    },
  };

  const { name, timeComplexity, spaceComplexity, description } =
    info[algorithm];

  return (
    <div className="mt-6 rounded-md bg-white p-4 shadow-md">
      <h2 className="mb-2 text-2xl font-bold">{name}</h2>
      <p className="mb-2">{description}</p>
      <p>
        <strong>Time Complexity:</strong> {timeComplexity}
      </p>
      <p>
        <strong>Space Complexity:</strong> {spaceComplexity}
      </p>
    </div>
  );
};

export default AlgorithmInfo;
