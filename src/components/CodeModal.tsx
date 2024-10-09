// src/components/CodeModal.tsx

import React, { useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

// Import Prism languages
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";

// Import icons from react-icons
import { FaCheck, FaCopy, FaTimes } from "react-icons/fa";

// Define the type for algorithm names
type AlgorithmName =
  | "quickSort"
  | "mergeSort"
  | "bubbleSort"
  | "insertionSort"
  | "selectionSort"
  | "heapSort"
  | "shellSort"
  | "countingSort"
  | "radixSort"
  | "bucketSort"
  | "combSort"
  | "timSort";

// Define the type for language names
type LanguageName = "javascript" | "python" | "java" | "cpp" | "c";

interface CodeModalProps {
  algorithm: AlgorithmName;
  onClose: () => void;
}

type CodeSnippets = {
  [key in AlgorithmName]: {
    [lang in LanguageName]?: string;
  };
};

const codeSnippets: CodeSnippets = {
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
}

int partition(int arr[], int low, int high) {
  int pivot = arr[high];
  int i = (low - 1);
  for (int j = low; j <= high -1; j++) {
    if (arr[j] < pivot) {
      i++;
      int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
    }
  }
  int temp = arr[i+1]; arr[i+1] = arr[high]; arr[high] = temp;
  return (i + 1);
}`,
    cpp: `void quickSort(std::vector<int>& arr, int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

int partition(std::vector<int>& arr, int low, int high) {
  int pivot = arr[high];
  int i = (low - 1);
  for (int j = low; j <= high -1; j++) {
    if (arr[j] < pivot) {
      i++;
      std::swap(arr[i], arr[j]);
    }
  }
  std::swap(arr[i+1], arr[high]);
  return (i + 1);
}`,
    java: `public static void quickSort(int[] arr, int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

public static int partition(int[] arr, int low, int high) {
  int pivot = arr[high];
  int i = (low - 1);
  for (int j = low; j <= high -1; j++) {
    if (arr[j] < pivot) {
      i++;
      int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
    }
  }
  int temp = arr[i+1]; arr[i+1] = arr[high]; arr[high] = temp;
  return (i + 1);
}`,
    python: `def quick_sort(arr):
  if len(arr) <= 1:
    return arr
  else:
    pivot = arr[-1]
    left = [x for x in arr[:-1] if x < pivot]
    right = [x for x in arr[:-1] if x >= pivot]
    return quick_sort(left) + [pivot] + quick_sort(right)`,
  },
  mergeSort: {
    javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while(i < left.length && j < right.length) {
    if(left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    c: `void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m+1, r);
    merge(arr, l, m, r);
  }
}

void merge(int arr[], int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  int L[n1], R[n2];
  for(int i = 0; i < n1; i++)
    L[i] = arr[l + i];
  for(int j = 0; j < n2; j++)
    R[j] = arr[m + 1 + j];
  int i = 0, j = 0, k = l;
  while(i < n1 && j < n2) {
    if(L[i] <= R[j]) {
      arr[k++] = L[i++];
    } else {
      arr[k++] = R[j++];
    }
  }
  while(i < n1) arr[k++] = L[i++];
  while(j < n2) arr[k++] = R[j++];
}`,
    cpp: `void mergeSort(std::vector<int>& arr, int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m+1, r);
    merge(arr, l, m, r);
  }
}

void merge(std::vector<int>& arr, int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  std::vector<int> L(n1), R(n2);
  for(int i = 0; i < n1; i++)
    L[i] = arr[l + i];
  for(int j = 0; j < n2; j++)
    R[j] = arr[m + 1 + j];
  int i = 0, j = 0, k = l;
  while(i < n1 && j < n2) {
    if(L[i] <= R[j]) {
      arr[k++] = L[i++];
    } else {
      arr[k++] = R[j++];
    }
  }
  while(i < n1) arr[k++] = L[i++];
  while(j < n2) arr[k++] = R[j++];
}`,
    java: `public static void mergeSort(int[] arr, int l, int r) {
  if (l < r) {
    int m = (l + r) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m+1, r);
    merge(arr, l, m, r);
  }
}

public static void merge(int[] arr, int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  int[] L = new int[n1];
  int[] R = new int[n2];
  for(int i = 0; i < n1; i++)
    L[i] = arr[l + i];
  for(int j = 0; j < n2; j++)
    R[j] = arr[m + 1 + j];
  int i = 0, j = 0, k = l;
  while(i < n1 && j < n2) {
    if(L[i] <= R[j]) {
      arr[k++] = L[i++];
    } else {
      arr[k++] = R[j++];
    }
  }
  while(i < n1) arr[k++] = L[i++];
  while(j < n2) arr[k++] = R[j++];
}`,
    python: `def merge_sort(arr):
  if len(arr) > 1:
    mid = len(arr) // 2
    L = arr[:mid]
    R = arr[mid:]
    merge_sort(L)
    merge_sort(R)
    i = j = k = 0
    while i < len(L) and j < len(R):
      if L[i] < R[j]:
        arr[k] = L[i]
        i += 1
      else:
        arr[k] = R[j]
        j += 1
      k += 1
    while i < len(L):
      arr[k] = L[i]
      i += 1
      k += 1
    while j < len(R):
      arr[k] = R[j]
      j += 1
      k += 1`,
  },
  bubbleSort: {
    javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for(let i = 0; i < n-1; i++) {
    for(let j = 0; j < n-i-1; j++) {
      if(arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  }
  return arr;
}`,
    c: `void bubbleSort(int arr[], int n) {
  int i, j;
  for(i = 0; i < n-1; i++) {
    for(j = 0; j < n-i-1; j++) {
      if(arr[j] > arr[j+1]) {
        int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;
      }
    }
  }
}`,
    cpp: `void bubbleSort(std::vector<int>& arr) {
  int n = arr.size();
  for(int i = 0; i < n-1; i++) {
    for(int j = 0; j < n-i-1; j++) {
      if(arr[j] > arr[j+1]) {
        std::swap(arr[j], arr[j+1]);
      }
    }
  }
}`,
    java: `public static void bubbleSort(int[] arr) {
  int n = arr.length;
  for(int i = 0; i < n-1; i++) {
    for(int j = 0; j < n-i-1; j++) {
      if(arr[j] > arr[j+1]) {
        int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;
      }
    }
  }
}`,
    python: `def bubble_sort(arr):
  n = len(arr)
  for i in range(n-1):
    for j in range(n-i-1):
      if arr[j] > arr[j+1]:
        arr[j], arr[j+1] = arr[j+1], arr[j]`,
  },
  insertionSort: {
    javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    c: `void insertionSort(int arr[], int n) {
  int i, key, j;
  for (i = 1; i < n; i++) {
    key = arr[i];
    j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}`,
    cpp: `void insertionSort(std::vector<int>& arr) {
  int n = arr.size();
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
    java: `public static void insertionSort(int[] arr) {
  int n = arr.length;
  for (int i = 1; i < n; ++i) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}`,
    python: `def insertion_sort(arr):
  for i in range(1, len(arr)):
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
      arr[j + 1] = arr[j]
      j -= 1
    arr[j + 1] = key`,
  },
  selectionSort: {
    javascript: `function selectionSort(arr) {
  const n = arr.length;
  for(let i = 0; i < n-1; i++) {
    let min_idx = i;
    for(let j = i+1; j < n; j++) {
      if(arr[j] < arr[min_idx]) {
        min_idx = j;
      }
    }
    [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
  }
  return arr;
}`,
    c: `void selectionSort(int arr[], int n) {
  int i, j, min_idx;
  for(i = 0; i < n-1; i++) {
    min_idx = i;
    for(j = i+1; j < n; j++) {
      if(arr[j] < arr[min_idx])
        min_idx = j;
    }
    int temp = arr[min_idx]; arr[min_idx] = arr[i]; arr[i] = temp;
  }
}`,
    cpp: `void selectionSort(std::vector<int>& arr) {
  int n = arr.size();
  for(int i = 0; i < n-1; i++) {
    int min_idx = i;
    for(int j = i+1; j < n; j++) {
      if(arr[j] < arr[min_idx]) {
        min_idx = j;
      }
    }
    std::swap(arr[i], arr[min_idx]);
  }
}`,
    java: `public static void selectionSort(int[] arr) {
  int n = arr.length;
  for(int i = 0; i < n-1; i++) {
    int min_idx = i;
    for(int j = i+1; j < n; j++) {
      if(arr[j] < arr[min_idx]) {
        min_idx = j;
      }
    }
    int temp = arr[min_idx]; arr[min_idx] = arr[i]; arr[i] = temp;
  }
}`,
    python: `def selection_sort(arr):
  n = len(arr)
  for i in range(n-1):
    min_idx = i
    for j in range(i+1, n):
      if arr[j] < arr[min_idx]:
        min_idx = j
    arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
  },
  heapSort: {
    javascript: `function heapSort(arr) {
  const n = arr.length;
  for(let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for(let i = n -1; i >=0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;
  if(l < n && arr[l] > arr[largest]) largest = l;
  if(r < n && arr[r] > arr[largest]) largest = r;
  if(largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
    c: `void heapify(int arr[], int n, int i) {
  int largest = i;
  int l = 2*i + 1;
  int r = 2*i + 2;
  if(l < n && arr[l] > arr[largest]) largest = l;
  if(r < n && arr[r] > arr[largest]) largest = r;
  if(largest != i) {
    int temp = arr[i]; arr[i] = arr[largest]; arr[largest] = temp;
    heapify(arr, n, largest);
  }
}

void heapSort(int arr[], int n) {
  for(int i = n/2 -1; i >= 0; i--)
    heapify(arr, n, i);
  for(int i = n -1; i >=0; i--) {
    int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;
    heapify(arr, i, 0);
  }
}`,
    cpp: `void heapify(std::vector<int>& arr, int n, int i) {
  int largest = i;
  int l = 2*i + 1;
  int r = 2*i + 2;
  if(l < n && arr[l] > arr[largest]) largest = l;
  if(r < n && arr[r] > arr[largest]) largest = r;
  if(largest != i) {
    std::swap(arr[i], arr[largest]);
    heapify(arr, n, largest);
  }
}

void heapSort(std::vector<int>& arr) {
  int n = arr.size();
  for(int i = n/2 -1; i >= 0; i--)
    heapify(arr, n, i);
  for(int i = n -1; i >=0; i--) {
    std::swap(arr[0], arr[i]);
    heapify(arr, i, 0);
  }
}`,
    java: `public static void heapSort(int arr[]) {
  int n = arr.length;
  for(int i = n / 2 -1; i >= 0; i--)
    heapify(arr, n, i);
  for(int i = n -1; i >=0; i--) {
    int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;
    heapify(arr, i, 0);
  }
}

public static void heapify(int arr[], int n, int i) {
  int largest = i;
  int l = 2*i + 1;
  int r = 2*i + 2;
  if(l < n && arr[l] > arr[largest]) largest = l;
  if(r < n && arr[r] > arr[largest]) largest = r;
  if(largest != i) {
    int swap = arr[i]; arr[i] = arr[largest]; arr[largest] = swap;
    heapify(arr, n, largest);
  }
}`,
    python: `def heapify(arr, n, i):
  largest = i
  l = 2 * i + 1
  r = 2 * i + 2
  if l < n and arr[l] > arr[largest]:
    largest = l
  if r < n and arr[r] > arr[largest]:
    largest = r
  if largest != i:
    arr[i], arr[largest] = arr[largest], arr[i]
    heapify(arr, n, largest)

def heap_sort(arr):
  n = len(arr)
  for i in range(n//2 -1, -1, -1):
    heapify(arr, n, i)
  for i in range(n-1, 0, -1):
    arr[i], arr[0] = arr[0], arr[i]
    heapify(arr, i, 0)`,
  },
  shellSort: {
    javascript: `function shellSort(arr) {
  const n = arr.length;
  for(let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
    for(let i = gap; i < n; i++) {
      const temp = arr[i];
      let j;
      for(j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      arr[j] = temp;
    }
  }
  return arr;
}`,
    c: `void shellSort(int arr[], int n) {
  for(int gap = n/2; gap > 0; gap /=2) {
    for(int i = gap; i < n; i++) {
      int temp = arr[i];
      int j;
      for(j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      arr[j] = temp;
    }
  }
}`,
    cpp: `void shellSort(std::vector<int>& arr) {
  int n = arr.size();
  for(int gap = n/2; gap > 0; gap /=2) {
    for(int i = gap; i < n; i++) {
      int temp = arr[i];
      int j;
      for(j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      arr[j] = temp;
    }
  }
}`,
    java: `public static void shellSort(int arr[]) {
  int n = arr.length;
  for(int gap = n/2; gap > 0; gap /=2) {
    for(int i = gap; i < n; i++) {
      int temp = arr[i];
      int j;
      for(j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      arr[j] = temp;
    }
  }
}`,
    python: `def shell_sort(arr):
  n = len(arr)
  gap = n // 2
  while gap > 0:
    for i in range(gap, n):
      temp = arr[i]
      j = i
      while j >= gap and arr[j - gap] > temp:
        arr[j] = arr[j - gap]
        j -= gap
      arr[j] = temp
    gap //= 2`,
  },
  countingSort: {
    javascript: `function countingSort(arr) {
  const n = arr.length;
  const output = new Array(n);
  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);
  for (let i = 0; i < n; i++) {
    count[arr[i]]++;
  }
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }
  for (let i = n - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
  return arr;
}`,
    c: `void countingSort(int arr[], int n) {
  int output[n];
  int max = arr[0];
  for (int i = 1; i < n; i++)
    if (arr[i] > max)
      max = arr[i];
  int count[max + 1];
  for (int i = 0; i <= max; ++i)
    count[i] = 0;
  for (int i = 0; i < n; i++)
    count[arr[i]]++;
  for (int i = 1; i <= max; i++)
    count[i] += count[i - 1];
  for (int i = n - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  for (int i = 0; i < n; i++)
    arr[i] = output[i];
}`,
    cpp: `void countingSort(std::vector<int>& arr) {
  int n = arr.size();
  std::vector<int> output(n);
  int max = *max_element(arr.begin(), arr.end());
  std::vector<int> count(max + 1, 0);
  for (int i = 0; i < n; i++)
    count[arr[i]]++;
  for (int i = 1; i <= max; i++)
    count[i] += count[i - 1];
  for (int i = n - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  for (int i = 0; i < n; i++)
    arr[i] = output[i];
}`,
    java: `public static void countingSort(int[] arr) {
  int n = arr.length;
  int max = Arrays.stream(arr).max().getAsInt();
  int[] count = new int[max + 1];
  int[] output = new int[n];
  for (int i = 0; i < n; i++)
    count[arr[i]]++;
  for (int i = 1; i <= max; i++)
    count[i] += count[i - 1];
  for (int i = n - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  System.arraycopy(output, 0, arr, 0, n);
}`,
    python: `def counting_sort(arr):
  n = len(arr)
  max_val = max(arr)
  count = [0] * (max_val + 1)
  for num in arr:
    count[num] += 1
  index = 0
  for i in range(len(count)):
    while count[i] > 0:
      arr[index] = i
      index += 1
      count[i] -= 1`,
  },
  radixSort: {
    javascript: `function radixSort(arr) {
  const max = Math.max(...arr);
  let exp = 1;
  while (Math.floor(max / exp) > 0) {
    countingSortByDigit(arr, exp);
    exp *= 10;
  }
  return arr;
}

function countingSortByDigit(arr, exp) {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);
  for (let i = 0; i < n; i++) {
    const index = Math.floor(arr[i] / exp) % 10;
    count[index]++;
  }
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  for (let i = n - 1; i >= 0; i--) {
    const index = Math.floor(arr[i] / exp) % 10;
    output[count[index] - 1] = arr[i];
    count[index]--;
  }
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}`,
    c: `void radixSort(int arr[], int n) {
  int max = arr[0];
  for(int i = 1; i < n; i++)
    if(arr[i] > max)
      max = arr[i];
  for(int exp = 1; max/exp > 0; exp *= 10)
    countingSortByDigit(arr, n, exp);
}

void countingSortByDigit(int arr[], int n, int exp) {
  int output[n];
  int i, count[10] = {0};
  for(i = 0; i < n; i++)
    count[(arr[i]/exp)%10]++;
  for(i = 1; i < 10; i++)
    count[i] += count[i -1];
  for(i = n -1; i >= 0; i--) {
    output[count[(arr[i]/exp)%10] -1] = arr[i];
    count[(arr[i]/exp)%10]--;
  }
  for(i = 0; i < n; i++)
    arr[i] = output[i];
}`,
    cpp: `void radixSort(std::vector<int>& arr) {
  int max = *max_element(arr.begin(), arr.end());
  for(int exp = 1; max/exp > 0; exp *= 10)
    countingSortByDigit(arr, exp);
}

void countingSortByDigit(std::vector<int>& arr, int exp) {
  int n = arr.size();
  std::vector<int> output(n);
  int count[10] = {0};
  for(int i = 0; i < n; i++)
    count[(arr[i]/exp)%10]++;
  for(int i = 1; i < 10; i++)
    count[i] += count[i -1];
  for(int i = n -1; i >= 0; i--) {
    output[count[(arr[i]/exp)%10] -1] = arr[i];
    count[(arr[i]/exp)%10]--;
  }
  for(int i = 0; i < n; i++)
    arr[i] = output[i];
}`,
    java: `public static void radixSort(int[] arr) {
  int max = Arrays.stream(arr).max().getAsInt();
  for(int exp = 1; max/exp > 0; exp *= 10)
    countingSortByDigit(arr, exp);
}

public static void countingSortByDigit(int[] arr, int exp) {
  int n = arr.length;
  int[] output = new int[n];
  int[] count = new int[10];
  for(int i = 0; i < n; i++)
    count[(arr[i]/exp)%10]++;
  for(int i = 1; i < 10; i++)
    count[i] += count[i -1];
  for(int i = n -1; i >= 0; i--) {
    output[count[(arr[i]/exp)%10] -1] = arr[i];
    count[(arr[i]/exp)%10]--;
  }
  System.arraycopy(output, 0, arr, 0, n);
}`,
    python: `def radix_sort(arr):
  max_val = max(arr)
  exp = 1
  while max_val // exp > 0:
    counting_sort_by_digit(arr, exp)
    exp *= 10

def counting_sort_by_digit(arr, exp):
  n = len(arr)
  output = [0] * n
  count = [0] * 10
  for i in range(n):
    index = arr[i] // exp
    count[index % 10] += 1
  for i in range(1, 10):
    count[i] += count[i -1]
  for i in range(n -1, -1, -1):
    index = arr[i] // exp
    output[count[index % 10] -1] = arr[i]
    count[index % 10] -=1
  for i in range(n):
    arr[i] = output[i]`,
  },
  bucketSort: {
    javascript: `function bucketSort(arr) {
  const n = arr.length;
  if (n <= 0) return arr;
  let min = Math.min(...arr);
  let max = Math.max(...arr);
  const bucketSize = Math.floor((max - min) / n) + 1;
  const buckets = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    const idx = Math.floor((arr[i] - min) / bucketSize);
    buckets[idx].push(arr[i]);
  }
  arr.length = 0;
  for (let i = 0; i < buckets.length; i++) {
    buckets[i].sort((a, b) => a - b);
    arr.push(...buckets[i]);
  }
  return arr;
}`,
    c: `// Bucket Sort in C is not as straightforward due to lack of dynamic arrays.
// Skipping C implementation for brevity.`,
    cpp: `void bucketSort(std::vector<float>& arr) {
  int n = arr.size();
  std::vector<std::vector<float>> buckets(n);
  for (int i = 0; i < n; i++) {
    int idx = n * arr[i];
    buckets[idx].push_back(arr[i]);
  }
  for (int i = 0; i < n; i++)
    std::sort(buckets[i].begin(), buckets[i].end());
  int index = 0;
  for (int i = 0; i < n; i++)
    for (int j = 0; j < buckets[i].size(); j++)
      arr[index++] = buckets[i][j];
}`,
    java: `public static void bucketSort(float[] arr) {
  int n = arr.length;
  List<Float>[] buckets = new List[n];
  for (int i = 0; i < n; i++)
    buckets[i] = new ArrayList<>();
  for (int i = 0; i < n; i++) {
    int idx = (int) (arr[i] * n);
    buckets[idx].add(arr[i]);
  }
  for (int i = 0; i < n; i++)
    Collections.sort(buckets[i]);
  int index = 0;
  for (int i = 0; i < n; i++)
    for (float val : buckets[i])
      arr[index++] = val;
}`,
    python: `def bucket_sort(arr):
  n = len(arr)
  if n == 0:
    return arr
  min_val = min(arr)
  max_val = max(arr)
  bucket_size = (max_val - min_val) / n + 1
  buckets = [[] for _ in range(n)]
  for num in arr:
    idx = int((num - min_val) // bucket_size)
    buckets[idx].append(num)
  arr.clear()
  for bucket in buckets:
    arr.extend(sorted(bucket))`,
  },
  combSort: {
    javascript: `function combSort(arr) {
  const n = arr.length;
  let gap = n;
  const shrink = 1.3;
  let sorted = false;
  while (!sorted) {
    gap = Math.floor(gap / shrink);
    if (gap <= 1) {
      gap = 1;
      sorted = true;
    } else {
      sorted = false;
    }
    for (let i = 0; i + gap < n; i++) {
      if (arr[i] > arr[i + gap]) {
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
        sorted = false;
      }
    }
  }
  return arr;
}`,
    c: `void combSort(int arr[], int n) {
  int gap = n;
  float shrink = 1.3;
  int sorted = 0;
  while (!sorted) {
    gap = (int)(gap / shrink);
    if (gap <= 1) {
      gap = 1;
      sorted = 1;
    }
    for (int i = 0; i + gap < n; i++) {
      if (arr[i] > arr[i + gap]) {
        int temp = arr[i]; arr[i] = arr[i + gap]; arr[i + gap] = temp;
        sorted = 0;
      }
    }
  }
}`,
    cpp: `void combSort(std::vector<int>& arr) {
  int n = arr.size();
  int gap = n;
  const double shrink = 1.3;
  bool sorted = false;
  while (!sorted) {
    gap = int(gap / shrink);
    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }
    for (int i = 0; i + gap < n; i++) {
      if (arr[i] > arr[i + gap]) {
        std::swap(arr[i], arr[i + gap]);
        sorted = false;
      }
    }
  }
}`,
    java: `public static void combSort(int[] arr) {
  int n = arr.length;
  int gap = n;
  double shrink = 1.3;
  boolean sorted = false;
  while (!sorted) {
    gap = (int)(gap / shrink);
    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }
    for (int i = 0; i + gap < n; i++) {
      if (arr[i] > arr[i + gap]) {
        int temp = arr[i]; arr[i] = arr[i + gap]; arr[i + gap] = temp;
        sorted = false;
      }
    }
  }
}`,
    python: `def comb_sort(arr):
  n = len(arr)
  gap = n
  shrink = 1.3
  sorted = False
  while not sorted:
    gap = int(gap / shrink)
    if gap <= 1:
      gap = 1
      sorted = True
    for i in range(n - gap):
      if arr[i] > arr[i + gap]:
        arr[i], arr[i + gap] = arr[i + gap], arr[i]
        sorted = False`,
  },
  timSort: {
    javascript: `function timSort(arr) {
  const RUN = 32;
  const n = arr.length;
  for (let i = 0; i < n; i += RUN) {
    insertionSort(arr, i, Math.min(i + RUN - 1, n - 1));
  }
  for (let size = RUN; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = left + size - 1;
      const right = Math.min((left + 2 * size - 1), (n - 1));
      if (mid < right)
        merge(arr, left, mid, right);
    }
  }
}

function insertionSort(arr, left, right) {
  for (let i = left + 1; i <= right; i++) {
    const temp = arr[i];
    let j = i - 1;
    while (j >= left && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
}

function merge(arr, l, m, r) {
  const len1 = m - l + 1;
  const len2 = r - m;
  const left = arr.slice(l, m + 1);
  const right = arr.slice(m + 1, r + 1);
  let i = 0, j = 0, k = l;
  while (i < len1 && j < len2) {
    if (left[i] <= right[j]) {
      arr[k++] = left[i++];
    } else {
      arr[k++] = right[j++];
    }
  }
  while (i < len1)
    arr[k++] = left[i++];
  while (j < len2)
    arr[k++] = right[j++];
}`,
    c: `// TimSort is complex and not commonly implemented in C.
// Skipping C implementation for brevity.`,
    cpp: `// TimSort is complex and not commonly implemented in C++.
// Skipping C++ implementation for brevity.`,
    java: `// Java uses TimSort as its default sorting algorithm.
// Implementing TimSort from scratch is complex.
// Skipping Java implementation for brevity.`,
    python: `# Python's built-in sorted() and list.sort() use TimSort.
def tim_sort(arr):
  arr.sort()`,
  },
};

const CodeModal: React.FC<CodeModalProps> = ({ algorithm, onClose }) => {
  const [language, setLanguage] = useState<LanguageName>("javascript");
  const [copied, setCopied] = useState<boolean>(false);

  // Get the code snippet based on the selected algorithm and language
  const codeSnippet = codeSnippets[algorithm]?.[language];

  const code =
    codeSnippet ||
    "Code snippet not available for this algorithm and language.";

  // Highlight the code using Prism
  const highlightedCode = Prism.highlight(
    code,
    Prism.languages[language === "cpp" ? "cpp" : language],
    language === "cpp" ? "cpp" : language,
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
            {algorithm.charAt(0).toUpperCase() +
              algorithm.slice(1).replace(/([A-Z])/g, " $1")}{" "}
            Code
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
              onChange={(e) => setLanguage(e.target.value as LanguageName)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
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
            <pre className={`language-${language} text-sm leading-relaxed`}>
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
