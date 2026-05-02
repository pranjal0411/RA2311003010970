const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwazc0MjZAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNTcwOSwiaWF0IjoxNzc3NzA0ODA5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNGEzMzFmNGItOTkxMy00NGViLTgxMTgtMzg1OGE5ZWE3ODQ0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicHJhbmphbCBraGFsaSIsInN1YiI6IjhmM2M5YmRlLTkxNDQtNDYwNi05YTRhLTY3Mzc1OGFkYmEzYyJ9LCJlbWFpbCI6InBrNzQyNkBzcm1pc3QuZWR1LmluIiwibmFtZSI6InByYW5qYWwga2hhbGkiLCJyb2xsTm8iOiJyYTIzMTEwMDMwMTA5NzAiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI4ZjNjOWJkZS05MTQ0LTQ2MDYtOWE0YS02NzM3NThhZGJhM2MiLCJjbGllbnRTZWNyZXQiOiJYd3pXc0ZnWGVmQmtxSFJKIn0.HCBOBhgd1-FEDnqGZyHQv-x_uSLTQ_UI7cbqWHLxQUE';
const LOG_API = 'http://20.207.122.201/evaluation-service/log'; // Used 20.207.122.201 because 34.2.123.21 is given in example but 20.207.122.201 is the actual IP used in Step 2.

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
