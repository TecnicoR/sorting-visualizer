// src/components/AlgorithmInfo.tsx

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AlgorithmInfoProps {
  algorithm: string;
}

const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ algorithm: string }) => {
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
    bubbleSort: {
      name: "Bubble Sort",
      timeComplexity: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(1)",
      description: `
**Bubble Sort** is a simple comparison-based algorithm. Starting from the beginning of the list, it compares every pair of adjacent items and swaps them if they are in the wrong order.

**Algorithm Steps:**

1. **Compare Adjacent Elements**:
   - Starting from the first element, compare the current element with the next one.
2. **Swap if Necessary**:
   - If the current element is greater than the next one, swap them.
3. **Iterate**:
   - Repeat the process for each pair of adjacent elements.
4. **Repeat**:
   - Repeat the entire process for all elements until no swaps are needed.

**Characteristics:**

- **Simple Implementation**: Easy to understand and implement.
- **Inefficient for Large Datasets**: Not suitable for large data sets due to its poor average and worst-case performance.
- **Stable Sorting**: Maintains the relative order of equal elements.

**Applications:**

- Educational purposes to introduce sorting algorithms.
- Small datasets where performance is not critical.

**Visualization Insights:**

- Observe how larger elements "bubble" to the end of the array.
- Frequent swapping of elements is visualized clearly.
`,
    },
    insertionSort: {
      name: "Insertion Sort",
      timeComplexity: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(1)",
      description: `
**Insertion Sort** builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms.

**Algorithm Steps:**

1. **Start from the Second Element**:
   - Assume the first element is sorted.
2. **Insert Current Element into Sorted Sequence**:
   - Compare the current element with the largest value in the sorted array.
   - If the current element is larger, leave it in place.
   - Otherwise, find the correct position within the sorted array and insert it.

**Characteristics:**

- **Adaptive**: Efficient for data sets that are already substantially sorted.
- **Stable Sorting**: Maintains the relative order of equal elements.
- **In-Place Sorting**: Requires only a constant amount O(1) of additional memory space.

**Applications:**

- Suitable for small data sets.
- Often used as the recursive base case in more complex algorithms.

**Visualization Insights:**

- Elements are inserted into their correct position one at a time.
- The sorted portion of the array grows with each iteration.
`,
    },
    selectionSort: {
      name: "Selection Sort",
      timeComplexity: {
        best: "O(n²)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(1)",
      description: `
**Selection Sort** divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted.

**Algorithm Steps:**

1. **Find the Minimum Element**:
   - From the unsorted sublist.
2. **Swap**:
   - Swap it with the leftmost unsorted element.
3. **Move Sublist Boundaries**:
   - Move the boundary of the sorted and unsorted sublists.

**Characteristics:**

- **In-Place Sorting**: Does not require extra space.
- **Not Stable**: Does not maintain the relative order of equal elements.
- **Inefficient on Large Lists**: Due to its O(n²) time complexity.

**Applications:**

- When memory space is limited.
- Simple implementation requirements.

**Visualization Insights:**

- Observe the selection and placement of the minimum element in each iteration.
- The sorted portion grows from the beginning of the array.
`,
    },
    heapSort: {
      name: "Heap Sort",
      timeComplexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
      },
      spaceComplexity: "O(1)",
      description: `
**Heap Sort** is a comparison-based sorting technique based on Binary Heap data structure.

**Algorithm Steps:**

1. **Build a Max Heap**:
   - Rearrange the array into a max heap.
2. **Swap Root with Last Element**:
   - Swap the first element of the array with the last element.
3. **Heapify Root Element**:
   - Reduce the heap size by one and heapify the root element.

**Characteristics:**

- **In-Place Sorting**: Does not require additional storage space.
- **Not Stable**: Equal elements may not retain their original positions.
- **Efficient**: Good for large data sets.

**Applications:**

- Systems concerned with security and embedded systems.
- Real-time systems requiring guaranteed O(n log n) time.

**Visualization Insights:**

- See how the heap structure is built and maintained.
- Observe the removal of the largest element and heap adjustment.
`,
    },
    shellSort: {
      name: "Shell Sort",
      timeComplexity: {
        best: "O(n log n)",
        average: "Depends on gap sequence",
        worst: "O(n²)",
      },
      spaceComplexity: "O(1)",
      description: `
**Shell Sort** is a generalization of insertion sort that allows the exchange of items that are far apart.

**Algorithm Steps:**

1. **Gap Selection**:
   - Start with a large gap and reduce it in each iteration.
2. **Sort Subarrays**:
   - Perform insertion sort on subarrays defined by the current gap.

**Characteristics:**

- **In-Place Sorting**: Requires minimal additional memory.
- **Adaptive**: Performance depends on the gap sequence.
- **Not Stable**: Does not maintain the relative order of equal elements.

**Applications:**

- Suitable for medium-sized arrays.
- When a simple implementation is preferred over performance.

**Visualization Insights:**

- Elements are moved over larger distances early on.
- The array becomes more sorted with each reduction in gap size.
`,
    },
    countingSort: {
      name: "Counting Sort",
      timeComplexity: {
        best: "O(n + k)",
        average: "O(n + k)",
        worst: "O(n + k)",
      },
      spaceComplexity: "O(k)",
      description: `
**Counting Sort** is an integer sorting algorithm that operates by counting the number of objects that possess distinct key values.

**Algorithm Steps:**

1. **Count Occurrences**:
   - Count the number of occurrences of each unique element.
2. **Calculate Positions**:
   - Modify the count array to reflect the positions.
3. **Build Output Array**:
   - Place the elements into the output array based on positions.

**Characteristics:**

- **Linear Time Complexity**: When k (range of input) is not significantly greater than n.
- **Not Comparison-Based**: Sorts integers in linear time.
- **Stable Sorting**: Can maintain the relative order of equal elements.

**Applications:**

- Situations where the range of input data is known and small.
- Sorting integers or objects with integer keys.

**Visualization Insights:**

- Observe how elements are counted and placed into their correct positions.
- The array is sorted in a non-comparative manner.
`,
    },
    radixSort: {
      name: "Radix Sort",
      timeComplexity: {
        best: "O(nk)",
        average: "O(nk)",
        worst: "O(nk)",
      },
      spaceComplexity: "O(n + k)",
      description: `
**Radix Sort** sorts integers by processing individual digits. It avoids comparison by creating and distributing elements into buckets according to their radix.

**Algorithm Steps:**

1. **Process Digits**:
   - Starting from the least significant digit to the most significant digit.
2. **Counting Sort for Each Digit**:
   - Use a stable counting sort to sort elements based on the current digit.

**Characteristics:**

- **Linear Time Complexity**: When k (number of digits) is constant.
- **Not Comparison-Based**: Sorts data with integer keys.
- **Stable Sorting**: Maintains relative order of equal elements.

**Applications:**

- Sorting large numbers of integers.
- Situations where the keys are of fixed length.

**Visualization Insights:**

- Watch how the sorting progresses digit by digit.
- Elements are grouped based on individual digit values.
`,
    },
    bucketSort: {
      name: "Bucket Sort",
      timeComplexity: {
        best: "O(n + k)",
        average: "O(n + k)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(n)",
      description: `
**Bucket Sort** distributes elements into several buckets, then sorts each bucket individually either using a different sorting algorithm or recursively applying bucket sort.

**Algorithm Steps:**

1. **Create Buckets**:
   - Divide the interval into buckets.
2. **Distribute Elements**:
   - Distribute the array elements into these buckets.
3. **Sort Buckets**:
   - Sort each bucket individually.
4. **Concatenate Buckets**:
   - Concatenate all sorted buckets into the original array.

**Characteristics:**

- **Linear Time Complexity**: When the input is uniformly distributed.
- **Not Comparison-Based**: Relies on distribution of data.
- **Space-Intensive**: Requires additional memory for buckets.

**Applications:**

- When input is uniformly distributed over a range.
- Useful in external sorting.

**Visualization Insights:**

- See how elements are grouped into buckets.
- Observe sorting within each bucket and the final concatenation.
`,
    },
    combSort: {
      name: "Comb Sort",
      timeComplexity: {
        best: "O(n log n)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(1)",
      description: `
**Comb Sort** improves on bubble sort by using gaps greater than 1. It eliminates turtles, or small values near the end of the list, that slow down bubble sort.

**Algorithm Steps:**

1. **Initialize Gap**:
   - Set the initial gap size.
2. **Compare and Swap**:
   - Compare elements at the gap distance and swap if necessary.
3. **Reduce Gap**:
   - Reduce the gap and repeat the process until gap is 1.

**Characteristics:**

- **Simple Implementation**: Easy to understand and implement.
- **Improvement over Bubble Sort**: Faster due to gap optimization.
- **Not Stable**: Does not maintain the relative order of equal elements.

**Applications:**

- Useful when a simple and improved bubble sort is sufficient.
- Educational purposes to demonstrate optimization techniques.

**Visualization Insights:**

- Elements are compared and swapped over varying gaps.
- The array gradually becomes more sorted as the gap decreases.
`,
    },
    timSort: {
      name: "Tim Sort",
      timeComplexity: {
        best: "O(n)",
        average: "O(n log n)",
        worst: "O(n log n)",
      },
      spaceComplexity: "O(n)",
      description: `
**Tim Sort** is a hybrid stable sorting algorithm, derived from merge sort and insertion sort, designed to perform well on many kinds of real-world data.

**Algorithm Steps:**

1. **Divide Array into Runs**:
   - Identify small segments that are already sorted.
2. **Sort the Runs**:
   - Use insertion sort to sort the small runs.
3. **Merge Runs**:
   - Use a merge sort to merge the runs together.

**Characteristics:**

- **Adaptive**: Takes advantage of existing order in the data.
- **Stable Sorting**: Maintains the relative order of equal elements.
- **Hybrid Algorithm**: Combines insertion sort and merge sort.

**Applications:**

- Used in Python's and Java's built-in sort implementations.
- Suitable for real-world data that often contains ordered sequences.

**Visualization Insights:**

- Observe how small sorted sequences are merged.
- The combination of different sorting techniques is visualized.
`,
    },
  };

  const algorithmInfo = info[algorithm];

  if (!algorithmInfo) {
    return (
      <div className="mt-6 rounded-md bg-white p-6 shadow-md">
        <p className="text-red-500">
          No information available for this algorithm.
        </p>
      </div>
    );
  }

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
