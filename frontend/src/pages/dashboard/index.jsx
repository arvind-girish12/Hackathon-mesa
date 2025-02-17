import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const DashboardScreen = () => {
  const navigate = useNavigate();
  // Temporary mock data - would come from API/props in real app
  const [upcomingSessions] = useState([
    {
      id: 1,
      title: 'Introduction to Calculus',
      subject: 'Mathematics',
      dateTime: '2024-02-20T14:00:00',
      status: 'Pre-reads Ready'
    },
    {
      id: 2, 
      title: 'Chemical Bonding',
      subject: 'Chemistry',
      dateTime: '2024-02-21T15:30:00',
      status: 'Upcoming'
    }
  ]);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Sessions', icon: <VideoCallIcon />, path: '/sessions' },
    { text: 'Chats', icon: <ChatIcon />, path: '/chats' },
    { text: 'Calendar', icon: <CalendarMonthIcon />, path: '/calendar' }
  ];

  const handleSessionClick = (sessionId) => {
    navigate(`/sessions`);
  };

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Top Header App Bar */}
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Mind Palace
          </Typography>
          <Typography variant="subtitle1" sx={{ ml: 2 }}>
            Your Personal Learning Companion
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Left Menu */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          '& .MuiDrawer-paper': {
            width: 240,
            marginTop: '64px'
          }
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text}
              onClick={() => handleMenuClick(item.path)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: '64px',
          p: 3
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Dashboard
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Welcome, John Doe!
        </Typography>

        <Typography variant="h5" sx={{ mb: 2 }}>
          Upcoming Sessions
        </Typography>

        <Stack spacing={2} sx={{ width: '100%' }}>
          {upcomingSessions.map((session) => (
            <Card key={session.id}>
              <CardActionArea onClick={() => handleSessionClick(session.id)}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h6" component="div">
                      {session.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {session.subject}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(session.dateTime).toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Chip 
                      label={session.status}
                      color={session.status === 'Pre-reads Ready' ? 'primary' : 'default'}
                      size="small"
                    />
                    <IconButton edge="end" aria-label="details">
                      <ChevronRightIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default DashboardScreen;
