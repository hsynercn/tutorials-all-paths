function twoNumberSum(array, targetSum) {
    // Write your code here.
    const nums = new Set()
    for(const num of array){
      const numToFind = targetSum - num
      if(numToFind !== num && nums.has(numToFind)){
        return [num, numToFind]
      }
      nums.add(num)
    }
    return []
  }
  
  // Do not edit the line below.
  exports.twoNumberSum = twoNumberSum;
  