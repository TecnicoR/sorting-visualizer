// src/components/AlgorithmInfo.tsx

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AlgorithmInfoProps {
  algorithm: string;
}

const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ algorithm }) => {
  const info = {
    quickSort: {
      name: "Quick Sort",
      timeComplexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(log n)",
      description: `
**Quick Sort** is a highly efficient sorting algorithm based on the divide-and-conquer paradigm. It operates by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot.

**Algorithm Steps:**

1. **Choose Pivot**: Select a pivot element (commonly the last element).
2. **Partitioning**:
   - Rearrange the elements such that all elements less than the pivot are on the left, and all elements greater are on the right.
3. **Recursive Sorting**:
   - Recursively apply the above steps to the sub-array of elements with smaller values and separately to the sub-array of elements with greater values.

**Characteristics:**

- **In-Place Sorting**: Requires only a small, constant amount of additional storage space.
- **Not Stable**: Equal elements may not retain their original positions.
- **Efficient on Average**: Generally performs well, but the performance can degrade with certain inputs (e.g., already sorted arrays).

**Applications:**

- Suitable for large datasets where average performance is crucial.
- Commonly used in standard libraries and systems where in-place sorting is needed.

**Visualization Insights:**

- Observe how the pivot selection and partitioning rearrange the array.
- Swapping elements causes bars to move to their new positions.
`,
    },
    mergeSort: {
      name: "Merge Sort",
      timeComplexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
      },
      spaceComplexity: "O(n)",
      description: `
**Merge Sort** is a divide-and-conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.

**Algorithm Steps:**

1. **Divide**:
   - Split the array into two halves until each sub-array contains a single element.
2. **Conquer**:
   - Recursively sort each sub-array.
3. **Combine**:
   - Merge the sorted sub-arrays to produce new sorted sub-arrays until there is only one sub-array remaining.

**Characteristics:**

- **Stable Sorting**: Maintains the relative order of equal elements.
- **Not In-Place**: Requires additional memory proportional to the size of the input array.
- **Consistent Performance**: Guarantees O(n log n) time complexity in all cases.

**Applications:**

- Preferred when stability is required.
- Efficient for sorting linked lists.
- Suitable for external sorting (sorting large amounts of data that do not fit in memory).

**Visualization Insights:**

- Notice how the array is divided and merged.
- Overwriting elements during merging shows how sub-arrays are combined.
`,
    },
  };

  const algorithmInfo = info[algorithm];
  const { name, timeComplexity, spaceComplexity, description } = algorithmInfo;

  return (
    <div className="mt-6 rounded-md bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">{name}</h2>
      <ReactMarkdown
        className="prose max-w-none"
        children={description}
        remarkPlugins={[remarkGfm]}
      />
      <h3 className="mt-6 text-lg font-semibold">Time Complexity:</h3>
      <ul className="mb-2 list-inside list-disc">
        <li>
          <strong>Best Case:</strong> {timeComplexity.best}
        </li>
        <li>
          <strong>Average Case:</strong> {timeComplexity.average}
        </li>
        <li>
          <strong>Worst Case:</strong> {timeComplexity.worst}
        </li>
      </ul>
      <p>
        <strong>Space Complexity:</strong> {spaceComplexity}
      </p>
    </div>
  );
};

export default AlgorithmInfo;
