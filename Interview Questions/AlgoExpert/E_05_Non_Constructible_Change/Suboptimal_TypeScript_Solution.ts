export function nonConstructibleChange(coins: number[]) {
    // Write your code here.
    let sortedArray: number[] = coins.sort((n1, n2) => n1 - n2);
    let calculatedValues: number[] = [];
    coins.forEach(coin => {
        let newValues: number[] = [];
        calculatedValues.forEach(previousValue => {
            newValues.push(previousValue + coin);
        })
        calculatedValues.push(coin);
        calculatedValues.push(...newValues);
        console.log(calculatedValues);
    });
    let calculatedValueSet = new Set<number>();
    let maxValue = 0;
    calculatedValues.forEach(value => {
        calculatedValueSet.add(value);
        if (maxValue < value) {
            maxValue = value;
        }
    });
    console.log(calculatedValueSet);
    let i = 1;
    let minImpossibleSum = -1;
    while (minImpossibleSum === -1 && i < maxValue) {
        if (!calculatedValueSet.has(i)) {
            minImpossibleSum = i;
        }
        i++;
    }
    if (minImpossibleSum === -1) {
        minImpossibleSum = i + 1;
    }
    if (coins.length === 0) {
        minImpossibleSum = 1;
    }
    return minImpossibleSum;
}
