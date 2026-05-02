import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { AllNotifications } from './pages/AllNotifications';
import { PriorityNotifications } from './pages/PriorityNotifications';

const NavButtons = () => {
  const location = useLocation();
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
      <Button 
        color="inherit" 
        component={Link} 
        to="/"
        sx={{ fontWeight: location.pathname === '/' ? 'bold' : 'normal', borderBottom: location.pathname === '/' ? '2px solid white' : 'none' }}
      >
        All
      </Button>
      <Button 
        color="inherit" 
        component={Link} 
        to="/priority"
        sx={{ fontWeight: location.pathname === '/priority' ? 'bold' : 'normal', borderBottom: location.pathname === '/priority' ? '2px solid white' : 'none' }}
      >
        Priority
      </Button>
    </Box>
  );
};

function App() {
  return (
    <Router>
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ mr: 4 }}>
              Campus Notifications
            </Typography>
            <NavButtons />
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<AllNotifications />} />
            <Route path="/priority" element={<PriorityNotifications />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
