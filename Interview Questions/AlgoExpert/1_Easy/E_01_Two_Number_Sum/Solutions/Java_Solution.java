import java.util.*;

class Program {
  public static int[] twoNumberSum(int[] array, int targetSum) {
    Set<Integer> sumSet = new HashSet<>();
    int[] result = new int[0];
    int i = 0;
    while(result.length == 0 && i < array.length) {
      if(sumSet.contains(targetSum - array[i])) {
        result = new int[]{array[i], targetSum - array[i]};
      }
      sumSet.add(array[i]);
      i++;
    }
    return result;
  }
}