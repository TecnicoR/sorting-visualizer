// src/algorithms/countingSort.ts

export function countingSortAnimations(array: number[]): any[] {
  const animations: any[] = [];
  const arr = array.slice();
  const n = arr.length;
  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);

  // Store count of each element
  for (let i = 0; i < n; i++) {
    count[arr[i]]++;
  }

  // Build the output array
  let index = 0;
  for (let i = 0; i <= max; i++) {
    while (count[i] > 0) {
      animations.push(["overwrite", index, i]);
      arr[index] = i;
      index++;
      count[i]--;
    }
  }

  return animations;
}
