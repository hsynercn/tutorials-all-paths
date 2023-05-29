export function oneEdit(stringOne: string, stringTwo: string) {
  // Write your code here.
  let charsOne = [...stringOne];
  let charsTwo = [...stringTwo];
  let diff = 0;
  if (charsOne.length === charsTwo.length) {
    charsOne.forEach((value, index) => {
      if (value !== charsTwo[index]) {
        diff++;
      }
    });
    if (diff < 2) {
      return true;
    } else {
      return false;
    }
  }
  let shortString;
  let longString;
  if (charsOne.length > charsTwo.length) {
    shortString = charsTwo;
    longString = charsOne;
  } else {
    shortString = charsOne;
    longString = charsTwo;
  }
  if (longString.length - shortString.length > 1) {
    return false;
  }
  let i = 0,
    j = 0;
  while (i < shortString.length && j < longString.length) {
    if (shortString[i] !== longString[j]) {
      diff++;
      j++;
    } else {
      i++;
      j++;
    }
  }
  if (diff < 2) {
    return true;
  } else {
    return false;
  }
}
