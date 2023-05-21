function classPhotos(redShirtHeights, blueShirtHeights) {
  // Write your code here.
  redShirtHeights = redShirtHeights.sort((a, b) => b - a);
  blueShirtHeights = blueShirtHeights.sort((a, b) => b - a);
  const redsInTheBack = calculateRedsInTheBack(
    redShirtHeights[0],
    blueShirtHeights[0]
  );
  for (let i = 0; i < redShirtHeights.length; i++) {
    if (redsInTheBack === 0) return false;
    const redInTheBackForThisSeat = calculateRedsInTheBack(
      redShirtHeights[i],
      blueShirtHeights[i]
    );
    if (redsInTheBack !== redInTheBackForThisSeat) {
      return false;
    }
  }
  return true;
}

function calculateRedsInTheBack(red, blue) {
  return red > blue ? 1 : red === blue ? 0 : -1;
}

// Do not edit the line below.
exports.classPhotos = classPhotos;
