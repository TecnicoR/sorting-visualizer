// src/algorithms/insertionSort.ts

export function insertionSortAnimations(array: number[]): any[] {
  const animations: any[] = [];
  const arr = array.slice();
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      animations.push(["compare", j, j + 1]);
      animations.push(["overwrite", j + 1, arr[j]]);
      arr[j + 1] = arr[j];
      j--;
    }
    animations.push(["overwrite", j + 1, key]);
    arr[j + 1] = key;
  }
  return animations;
}
