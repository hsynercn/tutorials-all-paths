function moveElementToEnd(array, toMove) {
  // Write your code here.
  let backPtr = array.length - 1;
  let fwdPtr = 0;
  while (fwdPtr < backPtr) {
    const num = array[fwdPtr];
    console.log(fwdPtr, backPtr, array[fwdPtr], array[backPtr]);
    if (num === toMove) {
      if (num === array[backPtr]) {
        backPtr--;
      } else {
        swap(array, fwdPtr, backPtr);
        fwdPtr++;
        backPtr--;
      }
    } else {
      fwdPtr++;
    }
  }
  return array;
}

function swap(array, idx1, idx2) {
  const temp = array[idx1];
  array[idx1] = array[idx2];
  array[idx2] = temp;
}

// Do not edit the line below.
exports.moveElementToEnd = moveElementToEnd;
