export function bestSeat(seats: number[]) {
  // Write your code here.
  let i = 0;
  let emptySpaces = new Map<number, number>();
  while (i < seats.length) {
    if (seats[i] === 0) {
      let emptySpaceFirst = i;
      let size = 0;
      while (seats[i] === 0 && i < seats.length) {
        size++;
        i++;
      }
      emptySpaces.set(emptySpaceFirst, size);
    }
    i++;
  }
  console.log(emptySpaces);

  let maxSize = 0;
  let minStart = seats.length;

  emptySpaces.forEach((value, key) => {
    if (value > maxSize) {
      maxSize = value;
      minStart = key;
    } else if (value === maxSize) {
      if (minStart > key) {
        minStart = key;
      }
    }
  });

  if (maxSize === 0) {
    return -1;
  }

  const result = minStart + ((emptySpaces.get(minStart) as number) - 1) / 2;
  return Math.floor(result);
}
