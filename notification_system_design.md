# Notification System Design

## Stage 1
### Priority Algorithm
Notifications are ranked using a priority score formula:
priorityScore = (typeWeight * 1000) + recencyScore

Type weights: placement=3, result=2, event=1
Recency score: normalised timestamp (0-100)

### Handling Continuous Incoming Notifications
A Min-Heap of fixed size N is maintained.
- New notification arrives → compute its priority score
- If score > heap minimum → replace minimum with new item
- Heap always holds the top N priority notifications
- Time complexity: O(log N) per insertion
- Space complexity: O(N)

### Why this approach?
Re-sorting the entire list on each new notification would be O(M log M) where M is total notifications. The heap approach reduces this to O(log N) where N is fixed (e.g. 10).

## Stage 2
React frontend with MUI, two pages, read/unread tracking via React state, filter by notification type, responsive layout for mobile and desktop.
