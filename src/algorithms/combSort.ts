// src/algorithms/combSort.ts

export function combSortAnimations(array: number[]): any[] {
  const animations: any[] = [];
  const arr = array.slice();
  const n = arr.length;
  let gap = n;
  const shrink = 1.3;
  let sorted = false;

  while (!sorted) {
    gap = Math.floor(gap / shrink);
    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }

    for (let i = 0; i + gap < n; i++) {
      animations.push(["compare", i, i + gap]);
      if (arr[i] > arr[i + gap]) {
        animations.push(["swap", i, i + gap]);
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
        sorted = false;
      }
    }
  }

  return animations;
}
