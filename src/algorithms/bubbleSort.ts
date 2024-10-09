// src/algorithms/bubbleSort.ts

export function bubbleSortAnimations(array: number[]): any[] {
  const animations: any[] = [];
  const n = array.length;
  const arr = array.slice();
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push(["compare", j, j + 1]);
      if (arr[j] > arr[j + 1]) {
        animations.push(["swap", j, j + 1]);
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return animations;
}
