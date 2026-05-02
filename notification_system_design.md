# Notification System Design

**Problem:** 
Need to fetch campus notifications, filter the top 10 most important ones based on some priority rules, and log everything properly using an external logging service.

**How I solved it:**
- Used Node.js and Express for the backend. Axios for fetching data.
- Built a basic React frontend to show the data.
- The notifications API returns an array of objects.
- Added a `logger.js` middleware that posts logs (info and errors) to the logging server using my access token.

**Priority Logic:**
I gave custom values to each notification type:
- Placement = 3 (most important)
- Result = 2
- Event = 1 (least important)

**Sorting Method:**
I just used the normal array `.sort()` function in Javascript.
First it compares the custom weights of the notification Type. If the weights are exactly the same (e.g. both are Placement), it looks at the timestamp and puts the newest one first. After sorting the whole array, I slice the first 10 items.

**Handling new notifications:**
If the app gets a stream of new notifications, sorting the entire array every time would be slow. A better way could be using a Min Heap of size 10 to just keep track of the top 10 at any time, or inserting new ones into an already sorted array using binary search so we don't have to re-sort. 
