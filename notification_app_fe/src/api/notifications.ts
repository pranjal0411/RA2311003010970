import { Log } from '../utils/logger';

const BASE = '/evaluation-service';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwazc0MjZAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNjg2MiwiaWF0IjoxNzc3NzA1OTYyLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYjczODEwZDctOTIwYy00OGEyLWEzZDktZGZkM2IwM2QzNDZkIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicHJhbmphbCBraGFsaSIsInN1YiI6IjhmM2M5YmRlLTkxNDQtNDYwNi05YTRhLTY3Mzc1OGFkYmEzYyJ9LCJlbWFpbCI6InBrNzQyNkBzcm1pc3QuZWR1LmluIiwibmFtZSI6InByYW5qYWwga2hhbGkiLCJyb2xsTm8iOiJyYTIzMTEwMDMwMTA5NzAiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI4ZjNjOWJkZS05MTQ0LTQ2MDYtOWE0YS02NzM3NThhZGJhM2MiLCJjbGllbnRTZWNyZXQiOiJYd3pXc0ZnWGVmQmtxSFJKIn0.30LGkzR3cnHSEit0CSNQFNvLqc0SY7HtymKBu_HoVMM';
const headers = {
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type': 'application/json'
};

export interface ApiNotification {
  ID: string;
  Type: string;
  Message: string;
  Timestamp: string;
}

export const fetchNotifications = async (type?: string): Promise<ApiNotification[]> => {
  Log('info', 'api', `Fetching notifications, type=${type ?? 'all'}`);
  const url = type ? `${BASE}/notifications?type=${type}` : `${BASE}/notifications`;
  
  const res = await fetch(url, { headers });
  if (!res.ok) {
    Log('error', 'api', `Fetch failed with status ${res.status}`);
    throw new Error('Failed to fetch');
  }
  
  const rawData = await res.json();
  const data = Array.isArray(rawData) ? rawData : (rawData.notifications || []);
  Log('info', 'api', `Received ${data.length} notifications`);
  
  return data;
};
