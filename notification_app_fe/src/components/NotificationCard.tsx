import React, { useEffect, useRef } from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { ApiNotification } from '../api/notifications';

interface Props {
  notification: ApiNotification;
  isRead: boolean;
  onMarkRead: (id: string) => void;
}

export const NotificationCard: React.FC<Props> = ({ notification, isRead, onMarkRead }) => {
  const isIntersecting = useRef(false);

  useEffect(() => {
    // If we wanted to mark read on scroll, we could use IntersectionObserver here.
    // For simplicity, we just mark it read after 2 seconds of being rendered, 
    // or we can let the parent handle clicking to read. 
  }, [notification.ID]);

  const getColor = (type: string) => {
    const t = type.toLowerCase();
    if (t === 'placement') return 'error';
    if (t === 'result') return 'warning';
    return 'info';
  };

  return (
    <Card 
      onClick={() => onMarkRead(notification.ID)}
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        opacity: isRead ? 0.6 : 1,
        transition: 'opacity 0.2s',
        borderLeft: `6px solid ${isRead ? '#ccc' : '#1976d2'}`
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Chip label={notification.Type} color={getColor(notification.Type)} size="small" />
          <Typography variant="caption" color="textSecondary">
            {new Date(notification.Timestamp).toLocaleString()}
          </Typography>
        </Box>
        <Typography variant={isRead ? 'body1' : 'subtitle1'} sx={{ fontWeight: isRead ? 'normal' : 'bold' }}>
          {notification.Message}
        </Typography>
      </CardContent>
    </Card>
  );
};
