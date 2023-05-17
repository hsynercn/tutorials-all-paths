export function binarySearch(array: number[], target: number): number {
  // Write your code here.
  return search(array, target, 0, array.length - 1);
}

function search(
  array: number[],
  target: number,
  startIndex: number,
  endIndex: number
): number {
  console.log("start " + startIndex + " end " + endIndex);
  if (!(startIndex < endIndex)) {
    return -1;
  }
  const midIndex = Math.floor((startIndex + endIndex) / 2);
  if (array[midIndex] === target) {
    return midIndex;
  }
  if (array[midIndex] > target) {
    let leftSegmentStart = startIndex;
    let leftSegmentEnd = midIndex - 1;
    return search(array, target, leftSegmentStart, leftSegmentEnd);
  } else {
    let rigthSegmentStart = midIndex + 1;
    let rigthegmentEnd = endIndex;
    return search(array, target, rigthSegmentStart, rigthegmentEnd);
  }
}
