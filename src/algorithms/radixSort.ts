// src/algorithms/radixSort.ts

export function radixSortAnimations(array: number[]): any[] {
  const animations: any[] = [];
  const arr = array.slice();
  const max = Math.max(...arr);
  let exp = 1;

  while (Math.floor(max / exp) > 0) {
    countSort(arr, exp, animations);
    exp *= 10;
  }

  return animations;
}

function countSort(arr: number[], exp: number, animations: any[]) {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);

  // Store count of occurrences in count[]
  for (let i = 0; i < n; i++) {
    const index = Math.floor(arr[i] / exp) % 10;
    count[index]++;
  }

  // Change count[i] so that count[i] now contains actual
  // position of this digit in output[]
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build the output array
  for (let i = n - 1; i >= 0; i--) {
    const index = Math.floor(arr[i] / exp) % 10;
    output[count[index] - 1] = arr[i];
    count[index]--;
  }

  // Copy the output array to arr[], so that arr[] now
  // contains sorted numbers according to current digit
  for (let i = 0; i < n; i++) {
    animations.push(["overwrite", i, output[i]]);
    arr[i] = output[i];
  }
}
