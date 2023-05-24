export function arrayOfProducts(array: number[]) {
  // Write your code here.
  let products: number[] = [];
  for (let i = 0; i < array.length; i++) {
    let result = 1;
    for (let j = 0; j < array.length; j++) {
      if (i !== j) {
        result *= array[j];
      }
    }
    products.push(result);
  }
  return products;
}
