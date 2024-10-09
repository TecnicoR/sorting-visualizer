// src/algorithms/timSort.ts

export function timSortAnimations(array: number[]): any[] {
  const animations: any[] = [];
  const arr = array.slice();
  const n = arr.length;
  const RUN = 32;

  // Sort individual subarrays of size RUN
  for (let i = 0; i < n; i += RUN) {
    insertionSort(arr, i, Math.min(i + RUN - 1, n - 1), animations);
  }

  // Merge sorted subarrays
  for (let size = RUN; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = left + size - 1;
      const right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) {
        merge(arr, left, mid, right, animations);
      }
    }
  }

  return animations;
}

function insertionSort(
  arr: number[],
  left: number,
  right: number,
  animations: any[],
) {
  for (let i = left + 1; i <= right; i++) {
    const temp = arr[i];
    let j = i - 1;
    while (j >= left && arr[j] > temp) {
      animations.push(["compare", j, j + 1]);
      animations.push(["overwrite", j + 1, arr[j]]);
      arr[j + 1] = arr[j];
      j--;
    }
    animations.push(["overwrite", j + 1, temp]);
    arr[j + 1] = temp;
  }
}

function merge(
  arr: number[],
  left: number,
  mid: number,
  right: number,
  animations: any[],
) {
  const len1 = mid - left + 1;
  const len2 = right - mid;
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  let i = 0;
  let j = 0;
  let k = left;

  while (i < len1 && j < len2) {
    animations.push(["compare", left + i, mid + 1 + j]);
    if (leftArr[i] <= rightArr[j]) {
      animations.push(["overwrite", k, leftArr[i]]);
      arr[k++] = leftArr[i++];
    } else {
      animations.push(["overwrite", k, rightArr[j]]);
      arr[k++] = rightArr[j++];
    }
  }

  while (i < len1) {
    animations.push(["overwrite", k, leftArr[i]]);
    arr[k++] = leftArr[i++];
  }

  while (j < len2) {
    animations.push(["overwrite", k, rightArr[j]]);
    arr[k++] = rightArr[j++];
  }
}
