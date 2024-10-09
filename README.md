# Sorting Visualizer

An interactive web application that visualizes various sorting algorithms in action. This tool is designed to help users
understand how different sorting algorithms work through real-time visualizations. It supports multiple algorithms,
array types, sizes, and speeds, making it a valuable educational resource.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Usage](#usage)
- [Available Algorithms](#available-algorithms)
- [Adding a New Algorithm](#adding-a-new-algorithm)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Demo

You can view the live application here: [Sorting Visualizer Demo](https://your-live-demo-link.com)

*Note: Replace the above URL with the actual link to your live demo.*

## Features

- **Visualization of Sorting Algorithms**: See how different sorting algorithms operate on arrays in real-time.
- **Multiple Algorithms Supported**: Quick Sort, Merge Sort, Bubble Sort, Insertion Sort, Selection Sort, Heap Sort,
  Shell Sort, Counting Sort, Radix Sort, Bucket Sort, Comb Sort, Tim Sort.
- **Customizable Array Types**: Generate arrays that are random, nearly sorted, reversed, or with few unique elements.
- **Adjustable Array Size and Sorting Speed**: Modify the size of the array and the speed of the visualization.
- **Code Display**: View the code for each algorithm in multiple programming languages (JavaScript, Python, Java, C++,
  and C).
- **Responsive Design**: Works well on different screen sizes.
- **Interactive Controls**: User-friendly controls to manipulate the visualization.

## Built With

- **React**: Front-end library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Vite**: Next-generation front-end tooling for fast development.
- **PrismJS**: Syntax highlighting library for code snippets.
- **React Icons**: Include popular icons in your React projects.

## Getting Started

Follow these instructions to get a local copy of the project up and running on your machine.

### Prerequisites

- **Node.js**: Install [Node.js](https://nodejs.org/en/download/) (which includes npm).
- **npm**: Node Package Manager comes with Node.js.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/TecnicoR/sorting-visualizer.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd sorting-visualizer
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Start the Development Server**

   ```bash
   npm run dev
   ```

5. **Open the Application**

    - Open your browser and navigate to `http://localhost:5173` (or the port specified in your console).

## Usage

1. **Select an Algorithm**

    - Use the **Algorithm Selector** dropdown to choose the sorting algorithm you want to visualize.

2. **Choose Array Type**

    - Select the type of array you want to sort: **Random**, **Reversed**, **Nearly Sorted**, or **Few Unique**.

3. **Adjust Array Size and Speed**

    - Use the sliders to adjust the **Array Size** and **Sorting Speed** according to your preference.

4. **Generate a New Array**

    - Click on the **Generate New Array** button to create a new array with the selected parameters.

5. **Start Sorting**

    - Click on the **Start Sorting** button to begin the visualization.

6. **View Algorithm Information**

    - Scroll down to see detailed information about the selected algorithm, including time and space complexities.

7. **Get Code**

    - Click on the **Get Code** button to view and copy the code for the selected algorithm in various programming
      languages.

8. **Interact During Visualization**

    - While the sorting is in progress, controls are disabled to prevent interference. Once sorting is complete,
      controls are re-enabled.

## Available Algorithms

- **Quick Sort**
- **Merge Sort**
- **Bubble Sort**
- **Insertion Sort**
- **Selection Sort**
- **Heap Sort**
- **Shell Sort**
- **Counting Sort**
- **Radix Sort**
- **Bucket Sort**
- **Comb Sort**
- **Tim Sort**

Each algorithm comes with its own description, time and space complexities, and code implementation in multiple
languages.

## Adding a New Algorithm

To add a new sorting algorithm to the application, follow these detailed steps:

### 1. Implement the Algorithm Logic

- **Create a New File in the `algorithms` Directory**

    - Navigate to `src/algorithms/`.
    - Create a new file named after your algorithm, e.g., `myNewSort.ts`.

- **Implement the Algorithm**

    - Write the function that performs the sorting and records the animations.
    - **Function Signature Example:**

      ```typescript
      export const myNewSortAnimations = (array: number[]): any[] => {
        const animations: any[] = [];
        // Implement your algorithm logic here.
        // Use the animations array to record the steps.
        return animations;
      };
      ```

    - **Recording Animations:**

        - Use an array to record the steps of the algorithm for visualization.
        - Each animation can be an array or object that describes the action,
          e.g., `['compare', idx1, idx2]`, `['swap', idx1, idx2]`.

### 2. Update the Sorting Visualizer Component

- **Import the Algorithm**

    - In `src/components/SortingVisualizer.tsx`, import your new algorithm:

      ```typescript
      import { myNewSortAnimations } from '../algorithms/myNewSort';
      ```

- **Add the Algorithm to the Sorting Logic**

    - Locate the `handleSort` function.
    - Add a new case in the switch statement:

      ```typescript
      switch (selectedAlgorithm) {
        // ... existing cases ...
        case 'myNewSort':
          animations = myNewSortAnimations(arrayCopy);
          break;
        // ... other cases ...
      }
      ```

- **Ensure the Algorithm Key Matches**

    - The key `'myNewSort'` should be used consistently across your application to reference this algorithm.

### 3. Update the Algorithm Selector

- **Modify `AlgorithmSelector.tsx`**

    - Open `src/components/controls/AlgorithmSelector.tsx`.
    - Add your new algorithm to the options:

      ```tsx
      const algorithms = [
        // ... existing algorithms ...
        { value: 'myNewSort', label: 'My New Sort' },
      ];
      ```

- **Ensure Consistent Keys and Labels**

    - The `value` should match the key used in `SortingVisualizer.tsx`.
    - The `label` is what will be displayed in the dropdown menu.

### 4. Update the Algorithm Information

- **Modify `AlgorithmInfo.tsx`**

    - Open `src/components/AlgorithmInfo.tsx`.
    - Add an entry for your new algorithm in the `info` object:

      ```typescript
      const info = {
        // ... existing algorithms ...
        myNewSort: {
          name: 'My New Sort',
          timeComplexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n^2)',
          },
          spaceComplexity: 'O(1)',
          description: `

**My New Sort** is a hypothetical sorting algorithm that demonstrates how to add a new algorithm to the visualizer.

**Algorithm Steps:**

1. **Step 1**: Describe the first step.
2. **Step 2**: Describe the second step.
3. **Step 3**: Continue as needed.

**Characteristics:**

- **Efficient**: Explain why it's efficient.
- **Stable**: Mention if it's stable or not.
- **In-Place**: State if it sorts in place.

**Applications:**

- **Use Case 1**: Describe where it's useful.
- **Use Case 2**: Another application.

**Visualization Insights:**

- **Observation 1**: What to look for in the visualization.
- **Observation 2**: Additional insights.


- **Provide Detailed Information**

    - Include time and space complexities.
    - Add a comprehensive description using Markdown syntax.

### 5. Add Code Snippets

- **Modify `CodeModal.tsx`**

    - Open `src/components/CodeModal.tsx`.
    - Add code snippets for your algorithm in the `codeSnippets` object:

      ```typescript
      const codeSnippets = {
        // ... existing algorithms ...
        myNewSort: {
          javascript: `function myNewSort(arr) {
      // Implement your sorting algorithm here
      python: `def my_new_sort(arr):