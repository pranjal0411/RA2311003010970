import { Log } from './utils/logger';

const API = 'http://20.207.122.201/evaluation-service/notifications';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwazc0MjZAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNjg2MiwiaWF0IjoxNzc3NzA1OTYyLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYjczODEwZDctOTIwYy00OGEyLWEzZDktZGZkM2IwM2QzNDZkIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicHJhbmphbCBraGFsaSIsInN1YiI6IjhmM2M5YmRlLTkxNDQtNDYwNi05YTRhLTY3Mzc1OGFkYmEzYyJ9LCJlbWFpbCI6InBrNzQyNkBzcm1pc3QuZWR1LmluIiwibmFtZSI6InByYW5qYWwga2hhbGkiLCJyb2xsTm8iOiJyYTIzMTEwMDMwMTA5NzAiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI4ZjNjOWJkZS05MTQ0LTQ2MDYtOWE0YS02NzM3NThhZGJhM2MiLCJjbGllbnRTZWNyZXQiOiJYd3pXc0ZnWGVmQmtxSFJKIn0.30LGkzR3cnHSEit0CSNQFNvLqc0SY7HtymKBu_HoVMM';

interface Notification {
  ID: string;
  Type: string;
  Message: string;
  Timestamp: string;
}

const WEIGHTS: Record<string, number> = {
  placement: 3,
  result: 2,
  event: 1,
};

function getPriorityScore(n: Notification, maxTime: number): number {
  const typeKey = n.Type ? n.Type.toLowerCase() : '';
  const weight = WEIGHTS[typeKey] ?? 0;
  const recency = new Date(n.Timestamp).getTime() / maxTime;
  return weight * 1000 + recency * 100;
}

async function getTopNotifications(topN = 10) {
  Log('info', 'api', `Fetching notifications for top ${topN}`);
  const res = await fetch(API, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  });
  
  const rawData = await res.json();
  const data: Notification[] = Array.isArray(rawData) ? rawData : (rawData.notifications || []);
  
  Log('info', 'util', `Received ${data.length} notifications`);
  
  const maxTime = Math.max(...data.map(n => new Date(n.Timestamp).getTime()));
  const sorted = data
    .map(n => ({ ...n, score: getPriorityScore(n, maxTime) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
    
  Log('info', 'util', `Top ${topN} notifications computed successfully`);
  console.log('TOP NOTIFICATIONS:', sorted); // only for screenshot
  return sorted;
}

getTopNotifications(10);
