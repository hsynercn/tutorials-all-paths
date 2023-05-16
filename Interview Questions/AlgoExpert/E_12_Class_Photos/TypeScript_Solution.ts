export function classPhotos(
  redShirtHeights: number[],
  blueShirtHeights: number[]
) {
  // Write your code here.
  const redRow = redShirtHeights.sort((a, b) => a - b);
  const blueRow = blueShirtHeights.sort((a, b) => a - b);
  let isRedBack = false;
  if (redRow[0] > blueRow[0]) {
    isRedBack = true;
  } else {
    isRedBack = false;
  }
  let backRowTaller = true;
  let index = 0;
  while (backRowTaller && index < redRow.length) {
    if (isRedBack) {
      if (redRow[index] <= blueRow[index]) {
        backRowTaller = false;
      }
    } else {
      if (redRow[index] >= blueRow[index]) {
        backRowTaller = false;
      }
    }
    index++;
  }
  return backRowTaller;
}
