const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwazc0MjZAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNjg2MiwiaWF0IjoxNzc3NzA1OTYyLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYjczODEwZDctOTIwYy00OGEyLWEzZDktZGZkM2IwM2QzNDZkIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicHJhbmphbCBraGFsaSIsInN1YiI6IjhmM2M5YmRlLTkxNDQtNDYwNi05YTRhLTY3Mzc1OGFkYmEzYyJ9LCJlbWFpbCI6InBrNzQyNkBzcm1pc3QuZWR1LmluIiwibmFtZSI6InByYW5qYWwga2hhbGkiLCJyb2xsTm8iOiJyYTIzMTEwMDMwMTA5NzAiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI4ZjNjOWJkZS05MTQ0LTQ2MDYtOWE0YS02NzM3NThhZGJhM2MiLCJjbGllbnRTZWNyZXQiOiJYd3pXc0ZnWGVmQmtxSFJKIn0.30LGkzR3cnHSEit0CSNQFNvLqc0SY7HtymKBu_HoVMM';
const LOG_API = '/evaluation-service/log';

type Level = 'info' | 'warn' | 'error' | 'fatal' | 'debug';
type Package = 'component' | 'api' | 'state' | 'util';

export const Log = async (level: Level, pkg: Package, message: string): Promise<void> => {
  try {
    await fetch(LOG_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify({ stack: 'frontend', level, package: pkg, message })
    });
  } catch (err) {
    // silent fail — do not use console.log
  }
};
