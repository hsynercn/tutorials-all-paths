export function longestPeak(array: number[]) {
  // Write your code here.
  enum Direction {
    UP = "UP",
    DOWN = "DOWN",
    EQUAL = "EQUAL",
  }

  let len = 0;
  let maxLen = 0;
  let lastDirection =
    array[0] > array[1]
      ? Direction.DOWN
      : array[0] < array[1]
      ? Direction.UP
      : Direction.EQUAL;
  let peakOver = false;

  if (lastDirection !== Direction.EQUAL) {
    len++;
  }

  for (let i = 2; i < array.length; i++) {
    let direction =
      array[i - 1] > array[i]
        ? Direction.DOWN
        : array[i - 1] < array[i]
        ? Direction.UP
        : Direction.EQUAL;

    console.log(lastDirection + " > " + direction);

    if (lastDirection === Direction.UP && direction === Direction.DOWN) {
      peakOver = true;
      len++;
    } else if (lastDirection === Direction.UP && direction === Direction.UP) {
      len++;
    } else if (
      lastDirection === Direction.DOWN &&
      direction === Direction.DOWN
    ) {
      len++;
    } else {
      if (maxLen < len && peakOver) {
        maxLen = len;
      }
      len = 0;
      if (direction !== Direction.EQUAL) {
        len++;
      }
      peakOver = false;
    }
    if (maxLen < len && peakOver) {
      maxLen = len;
    }
    lastDirection = direction;
  }

  if (maxLen) {
    return maxLen + 1;
  }
  return 0;
}
