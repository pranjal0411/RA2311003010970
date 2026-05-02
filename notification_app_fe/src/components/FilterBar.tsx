import React from 'react';
import { Box, Chip } from '@mui/material';
import { Log } from '../utils/logger';

interface Props {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

export const FilterBar: React.FC<Props> = ({ currentFilter, onFilterChange }) => {
  const filters = ['All', 'Placement', 'Result', 'Event'];

  const handleClick = (filter: string) => {
    Log('info', 'state', `User applied filter: ${filter}`);
    onFilterChange(filter);
  };

  return (
    <Box display="flex" gap={1} mb={3} flexWrap="wrap">
      {filters.map(f => (
        <Chip
          key={f}
          label={f}
          color={currentFilter === f ? 'primary' : 'default'}
          onClick={() => handleClick(f)}
          clickable
        />
      ))}
    </Box>
  );
};
