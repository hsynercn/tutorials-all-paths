import java.util.*;

class Program {
  public int[] sortedSquaredArray(int[] array) {
    int[] result = new int[array.length];
    int[] positives = Arrays.stream(array)
                                     .filter(num -> num >= 0)
                                     .toArray();
    int[] negatives = Arrays.stream(array)
                                     .filter(num -> num < 0)
                                     .toArray();
    int iP = 0;
    int iN = negatives.length - 1;
    int iR = 0;
    while(negatives.length > 0 && iN >= 0 && iP < positives.length) {
      if((-negatives[iN]) < positives[iP]) {
        result[iR] = negatives[iN] * negatives[iN];
        iN--;
      } else {
        result[iR] = positives[iP] * positives[iP];
        iP++;
      }
      iR++;
    }
    while(iN >= 0) {
      result[iR] = negatives[iN] * negatives[iN];
      iN--;
      iR++;
    }
    while(iP < positives.length) {
      result[iR] = positives[iP] * positives[iP];
      iP++;
      iR++;
    }
    return result;
  }
}