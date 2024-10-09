// src/algorithms/mergeSort.ts

export function mergeSortAnimations(array: number[]): any[] {
  const animations: any[] = [];
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray: number[],
  startIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: any[],
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray: number[],
  startIdx: number,
  middleIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: any[],
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;

  while (i <= middleIdx && j <= endIdx) {
    animations.push(["compare", i, j]); // Comparing elements
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push(["overwrite", k, auxiliaryArray[i]]); // Overwriting element
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push(["overwrite", k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  while (i <= middleIdx) {
    animations.push(["compare", i, i]);
    animations.push(["overwrite", k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }

  while (j <= endIdx) {
    animations.push(["compare", j, j]);
    animations.push(["overwrite", k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
