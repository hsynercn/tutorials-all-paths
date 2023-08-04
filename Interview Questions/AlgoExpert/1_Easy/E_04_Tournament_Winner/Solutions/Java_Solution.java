import java.util.*;

class Program {
  public String tournamentWinner(
    ArrayList<ArrayList<String>> competitions, ArrayList<Integer> results
  ) {
    HashMap<String, Integer> scoreMap = new HashMap<>();
    int i = 0;
    for(int result:results) {
      String home = competitions.get(i).get(0);
      String away = competitions.get(i).get(1);
      String winner = result == 1 ? home : away;
      if(!scoreMap.containsKey(winner)) {
        scoreMap.put(winner, 0);
      }
      scoreMap.put(winner, scoreMap.get(winner) + 1);
      i++;
    }
    int max = 0;
    String allWinner = null;
    for(Map.Entry<String, Integer> entry : scoreMap.entrySet()) {
      System.out.println("team:" + entry.getKey() + " score:" + entry.getValue());
      if(entry.getValue() > max) {
        allWinner = entry.getKey();
        max = entry.getValue();
      }
    }
    return allWinner;
  }
}