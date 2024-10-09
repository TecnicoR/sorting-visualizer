// src/algorithms/quickSort.ts

export function quickSortAnimations(array: number[]): any[] {
  const animations: any[] = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(
  array: number[],
  low: number,
  high: number,
  animations: any[],
) {
  if (low < high) {
    const pi = partition(array, low, high, animations);
    quickSortHelper(array, low, pi - 1, animations);
    quickSortHelper(array, pi + 1, high, animations);
  }
}

function partition(
  array: number[],
  low: number,
  high: number,
  animations: any[],
): number {
  const pivot = array[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    animations.push(["compare", j, high]); // Comparing elements
    if (array[j] < pivot) {
      i++;
      animations.push(["swap", i, j]); // Swapping elements
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  animations.push(["swap", i + 1, high]);
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  return i + 1;
}
