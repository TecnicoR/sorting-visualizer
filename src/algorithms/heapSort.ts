// src/algorithms/heapSort.ts

export function heapSortAnimations(array: number[]): any[] {
  const animations: any[] = [];
  const arr = array.slice();
  const n = arr.length;

  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, animations);
  }

  // One by one extract an element from heap
  for (let i = n - 1; i > 0; i--) {
    animations.push(["swap", 0, i]);
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // call max heapify on the reduced heap
    heapify(arr, i, 0, animations);
  }

  return animations;
}

function heapify(arr: number[], n: number, i: number, animations: any[]) {
  let largest = i; // Initialize largest as root
  const l = 2 * i + 1; // left = 2*i + 1
  const r = 2 * i + 2; // right = 2*i + 2

  // If left child is larger than root
  if (l < n) {
    animations.push(["compare", l, largest]);
    if (arr[l] > arr[largest]) {
      largest = l;
    }
  }

  // If right child is larger than largest so far
  if (r < n) {
    animations.push(["compare", r, largest]);
    if (arr[r] > arr[largest]) {
      largest = r;
    }
  }

  // If largest is not root
  if (largest !== i) {
    animations.push(["swap", i, largest]);
    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest, animations);
  }
}
