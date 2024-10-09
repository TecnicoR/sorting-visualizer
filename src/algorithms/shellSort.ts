// src/algorithms/shellSort.ts

export function shellSortAnimations(array: number[]): any[] {
  const animations: any[] = [];
  const arr = array.slice();
  const n = arr.length;

  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Do a gapped insertion sort for this gap size.
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap) {
        animations.push(["compare", j - gap, j]);
        if (arr[j - gap] > temp) {
          animations.push(["overwrite", j, arr[j - gap]]);
          arr[j] = arr[j - gap];
        } else {
          break;
        }
        j -= gap;
      }
      animations.push(["overwrite", j, temp]);
      arr[j] = temp;
    }
  }
  return animations;
}
