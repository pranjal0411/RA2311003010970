import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, MenuItem, Select } from '@mui/material';
import { fetchNotifications, ApiNotification } from '../api/notifications';
import { Log } from '../utils/logger';
import { NotificationCard } from '../components/NotificationCard';
import { FilterBar } from '../components/FilterBar';

const WEIGHTS: Record<string, number> = {
  placement: 3,
  result: 2,
  event: 1,
};

function getPriorityScore(n: ApiNotification, maxTime: number): number {
  const typeKey = n.Type ? n.Type.toLowerCase() : '';
  const weight = WEIGHTS[typeKey] ?? 0;
  const recency = new Date(n.Timestamp).getTime() / maxTime;
  return weight * 1000 + recency * 100;
}

export const PriorityNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<ApiNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');
  const [topN, setTopN] = useState(10);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    Log('info', 'component', 'PriorityNotifications component mounted');
    loadNotifications();
  }, [filter, topN]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const queryType = filter === 'All' ? undefined : filter.toLowerCase();
      const data = await fetchNotifications(queryType);
      
      if (data.length > 0) {
        const maxTime = Math.max(...data.map(n => new Date(n.Timestamp).getTime()));
        const sorted = data
          .map(n => ({ ...n, score: getPriorityScore(n, maxTime) }))
          .sort((a, b) => b.score - a.score)
          .slice(0, topN);
        setNotifications(sorted);
      } else {
        setNotifications([]);
      }
      
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = (id: string) => {
    setReadIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Priority Notifications</Typography>
        <Select
          value={topN}
          onChange={(e) => {
            Log('info', 'state', `User changed topN to ${e.target.value}`);
            setTopN(Number(e.target.value));
          }}
          size="small"
        >
          <MenuItem value={10}>Top 10</MenuItem>
          <MenuItem value={15}>Top 15</MenuItem>
          <MenuItem value={20}>Top 20</MenuItem>
        </Select>
      </Box>
      
      <FilterBar currentFilter={filter} onFilterChange={setFilter} />
      
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      
      {!loading && !error && notifications.map(n => (
        <NotificationCard 
          key={n.ID} 
          notification={n} 
          isRead={readIds.has(n.ID)} 
          onMarkRead={handleMarkRead} 
        />
      ))}
      {!loading && notifications.length === 0 && <Typography>No notifications found.</Typography>}
    </Box>
  );
};
