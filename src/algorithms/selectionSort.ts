// src/algorithms/selectionSort.ts

export function selectionSortAnimations(array: number[]): any[] {
  const animations: any[] = [];
  const arr = array.slice();
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let min_idx = i;
    for (let j = i + 1; j < n; j++) {
      animations.push(["compare", j, min_idx]);
      if (arr[j] < arr[min_idx]) {
        min_idx = j;
      }
    }
    if (min_idx !== i) {
      animations.push(["swap", i, min_idx]);
      [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
    }
  }
  return animations;
}
