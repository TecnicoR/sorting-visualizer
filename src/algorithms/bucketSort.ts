// src/algorithms/bucketSort.ts

export function bucketSortAnimations(array: number[]): any[] {
  const animations: any[] = [];
  const arr = array.slice();
  const n = arr.length;
  if (n <= 0) return animations;

  // Create n empty buckets
  const buckets: number[][] = Array.from({ length: n }, () => []);

  // Put array elements in different buckets
  const max = Math.max(...arr);
  for (let i = 0; i < n; i++) {
    const idx = Math.floor((arr[i] / (max + 1)) * n);
    buckets[idx].push(arr[i]);
  }

  // Sort individual buckets and concatenate
  let index = 0;
  for (let i = 0; i < n; i++) {
    buckets[i].sort((a, b) => a - b); // You can use any sorting algorithm here
    for (let j = 0; j < buckets[i].length; j++) {
      animations.push(["overwrite", index, buckets[i][j]]);
      arr[index++] = buckets[i][j];
    }
  }

  return animations;
}
