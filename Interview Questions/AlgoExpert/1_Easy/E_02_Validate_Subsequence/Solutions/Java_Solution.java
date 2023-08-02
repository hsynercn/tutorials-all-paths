import java.util.*;

class Program {
  public static boolean isValidSubsequence(
    List<Integer> array, List<Integer> sequence
  ) {
    int arrayIndex = 0;
    int sequenceIndex = 0;
    while(array.size() > arrayIndex && sequence.size() > sequenceIndex) {
      if(array.get(arrayIndex) == sequence.get(sequenceIndex)) {
        sequenceIndex++;
      }
      arrayIndex++;
    }
    return sequenceIndex == sequence.size();
  }
}