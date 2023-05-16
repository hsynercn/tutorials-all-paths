export function tandemBicycle(
  redShirtSpeeds: number[],
  blueShirtSpeeds: number[],
  fastest: boolean
) {
  // Write your code here.
  const sortedRedSpeeds = redShirtSpeeds.sort((a, b) => a - b);
  let sortedBlueSpeeds = blueShirtSpeeds.sort((a, b) =>
    fastest ? b - a : a - b
  );
  let sum = 0;
  for (let i = 0; i < sortedBlueSpeeds.length; i++) {
    sum +=
      sortedRedSpeeds[i] > sortedBlueSpeeds[i]
        ? sortedRedSpeeds[i]
        : sortedBlueSpeeds[i];
  }
  return sum;
}
