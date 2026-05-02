import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { fetchNotifications, ApiNotification } from '../api/notifications';
import { Log } from '../utils/logger';
import { NotificationCard } from '../components/NotificationCard';
import { FilterBar } from '../components/FilterBar';

export const AllNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<ApiNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    Log('info', 'component', 'AllNotifications component mounted');
    loadNotifications();
  }, [filter]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const queryType = filter === 'All' ? undefined : filter.toLowerCase();
      const data = await fetchNotifications(queryType);
      
      // Sort newest first
      data.sort((a, b) => new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime());
      
      setNotifications(data);
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
      <Typography variant="h4" mb={2}>All Notifications</Typography>
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
