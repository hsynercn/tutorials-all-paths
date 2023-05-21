function sortedSquaredArray(array) {
    // Write your code here.
    const positives = array.filter((n) => n >= 0).map((num) => num*num)
    const negatives = array.filter((n) => n < 0).map((num) => num*num)
    const reverseNegatives = []
    while(negatives.length){
      reverseNegatives.push(negatives.pop())
    }
    let i = 0;
    let j = 0;
    const result = []
    while (i < positives.length || j < reverseNegatives.length){
      if(positives[i] === undefined) {
        result.push(reverseNegatives[j])
        j++
      }
      else if(reverseNegatives[j] === undefined) {
        result.push(positives[i])
        i++
      }
      else if(positives[i] <= reverseNegatives[j]){
        result.push(positives[i])
        i++
      }
      else{
        result.push(reverseNegatives[j])
        j++
      }
    }
    return result
  }
  
  // Do not edit the line below.
  exports.sortedSquaredArray = sortedSquaredArray;
  