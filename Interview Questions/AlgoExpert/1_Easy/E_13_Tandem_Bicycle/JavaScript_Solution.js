function tandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest) {
  // Write your code here.
  redShirtSpeeds = redShirtSpeeds.sort((a, b) => a - b);
  blueShirtSpeeds = blueShirtSpeeds.sort((a, b) => (fastest ? b - a : a - b));
  return redShirtSpeeds.reduce(
    (sum, v, i) => sum + Math.max(v, blueShirtSpeeds[i]),
    0
  );
}

// Do not edit the line below.
exports.tandemBicycle = tandemBicycle;
