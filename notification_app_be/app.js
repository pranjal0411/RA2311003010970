const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { Log } = require('../logging-middleware/logger');

const app = express();
app.use(cors());
const port = 3000;

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwazc0MjZAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNDA4OSwiaWF0IjoxNzc3NzAzMTg5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYzNhZjdhYjYtZjYxMy00YTY5LTlkM2EtYjZlOWM5MDU0YjkwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicHJhbmphbCBraGFsaSIsInN1YiI6IjhmM2M5YmRlLTkxNDQtNDYwNi05YTRhLTY3Mzc1OGFkYmEzYyJ9LCJlbWFpbCI6InBrNzQyNkBzcm1pc3QuZWR1LmluIiwibmFtZSI6InByYW5qYWwga2hhbGkiLCJyb2xsTm8iOiJyYTIzMTEwMDMwMTA5NzAiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI4ZjNjOWJkZS05MTQ0LTQ2MDYtOWE0YS02NzM3NThhZGJhM2MiLCJjbGllbnRTZWNyZXQiOiJYd3pXc0ZnWGVmQmtxSFJKIn0.zg3QtvbgTh9Arj4ZiwltZ4jV_CYKPmceg1NZT0jsWA4';

const PRIORITY_WEIGHTS = {
  'Placement': 3,
  'Result': 2,
  'Event': 1
};

app.get('/api/notifications', async (req, res) => {
  try {
    const response = await axios.get('http://20.207.122.201/evaluation-service/notifications', {
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    });

    await Log('backend', 'info', 'service', 'fetched notifications', TOKEN);

    let notifications = response.data || [];
    if (!Array.isArray(notifications) && response.data.notifications) {
      notifications = response.data.notifications;
    }

    notifications.sort((a, b) => {
      const weightA = PRIORITY_WEIGHTS[a.Type] || 0;
      const weightB = PRIORITY_WEIGHTS[b.Type] || 0;

      if (weightA !== weightB) {
        return weightB - weightA;
      }

      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return timeB - timeA;
    });

    const top10 = notifications.slice(0, 10);
    res.json(top10);

  } catch (error) {
    console.error('Error fetching notifications:', error.message);
    await Log('backend', 'error', 'service', error.message, TOKEN);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
