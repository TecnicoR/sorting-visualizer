// src/components/CodeModal.tsx

import React, { useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

// Import Prism languages
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-c";

// Import icons from react-icons
import { FaCheck, FaCopy, FaTimes } from "react-icons/fa";

interface CodeModalProps {
  algorithm: string;
  onClose: () => void;
}

const codeSnippets = {
  quickSort: {
    javascript: `function quickSort(array) {
  if (array.length <= 1) {
    return array;
  }
  const pivot = array[array.length - 1];
  const left = [];
  const right = [];
  for (const el of array.slice(0, array.length - 1)) {
    el < pivot ? left.push(el) : right.push(el);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
    c: `void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`,
  },
  mergeSort: {
    javascript: `function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }
  const mid = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, mid));
  const right = mergeSort(array.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let result = [], leftIndex = 0, rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex++]);
    } else {
      result.push(right[rightIndex++]);
    }
  }
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}`,
    c: `void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}

void merge(int arr[], int l, int m, int r) {
  int i, j, k;
  int n1 = m - l + 1;
  int n2 = r - m;
  int L[n1], R[n2];
  for (i = 0; i < n1; i++)
    L[i] = arr[l + i];
  for (j = 0; j < n2; j++)
    R[j] = arr[m + 1 + j];
  i = 0; j = 0; k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k++] = L[i++];
    } else {
      arr[k++] = R[j++];
    }
  }
  while (i < n1) arr[k++] = L[i++];
  while (j < n2) arr[k++] = R[j++];
}`,
  },
};

const CodeModal: React.FC<CodeModalProps> = ({ algorithm, onClose }) => {
  const [language, setLanguage] = useState<string>("javascript");
  const [copied, setCopied] = useState<boolean>(false);

  // Get the code snippet based on the selected algorithm and language
  const code = codeSnippets[algorithm][language];

  // Highlight the code using Prism
  const highlightedCode = Prism.highlight(
    code,
    Prism.languages[language],
    language,
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold">
            {algorithm === "quickSort" ? "Quick Sort" : "Merge Sort"} Code
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close Modal"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-6 py-4">
          {/* Language Selector and Copy Button */}
          <div className="mb-4 flex items-center justify-between">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="javascript">JavaScript</option>
              <option value="c">C</option>
            </select>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {copied ? (
                <>
                  <FaCheck className="h-5 w-5 text-green-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <FaCopy className="h-5 w-5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Code Display */}
          <div className="max-h-96 overflow-auto rounded-md border">
            <pre className="language-javascript text-sm leading-relaxed">
              <code
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
                className={`language-${language}`}
              ></code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeModal;
