export function nonConstructibleChange(coins: number[]) {
    // Write your code here.
    let sortedArray: number[] = coins.sort((n1, n2) => n1 - n2);
    let sum = 0
    for (const coin of sortedArray) {
        if (coin > sum + 1) return sum + 1
        sum += coin
    }
    return sum + 1;
}
