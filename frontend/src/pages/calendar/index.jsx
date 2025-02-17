import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Grid,
  Button
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const CalendarScreen = () => {
  const navigate = useNavigate();
  const [currentDate] = useState(new Date());

  // Mock data for sessions - would come from API in real app
  const [sessions] = useState([
    {
      id: 1,
      title: 'Introduction to Calculus',
      subject: 'Mathematics',
      dateTime: '2024-02-20T14:00:00',
      color: '#e3f2fd'
    },
    {
      id: 2,
      title: 'Chemical Bonding',
      subject: 'Chemistry',
      dateTime: '2024-02-21T15:30:00',
      color: '#f3e5f5'
    },
    {
      id: 3,
      title: 'Physics Lab',
      subject: 'Physics',
      dateTime: '2024-02-22T10:00:00',
      color: '#e8f5e9'
    },
    {
      id: 4,
      title: 'Literature Review',
      subject: 'English',
      dateTime: '2024-02-23T13:00:00',
      color: '#fff3e0'
    }
  ]);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Sessions', icon: <VideoCallIcon />, path: '/sessions' },
    { text: 'Chats', icon: <ChatIcon />, path: '/chats' },
    { text: 'Calendar', icon: <CalendarMonthIcon />, path: '/calendar' }
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <Box sx={{ display: 'flex' }}>
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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: '64px',
          p: 3
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button startIcon={<ChevronLeftIcon />}>Previous Week</Button>
          <Typography variant="h5" sx={{ mx: 2 }}>
            Week of {currentDate.toLocaleDateString()}
          </Typography>
          <Button endIcon={<ChevronRightIcon />}>Next Week</Button>
        </Box>

        <Grid container spacing={2}>
          {weekDays.map((day, index) => (
            <Grid item xs={12} key={day}>
              <Paper 
                elevation={2}
                sx={{
                  p: 2,
                  minHeight: '120px',
                  backgroundColor: '#fafafa'
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, borderBottom: '1px solid #e0e0e0', pb: 1 }}>
                  {day}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {sessions.map((session, sIndex) => (
                    <Paper
                      key={session.id}
                      elevation={1}
                      sx={{
                        p: 1.5,
                        backgroundColor: session.color,
                        cursor: 'pointer',
                        '&:hover': {
                          opacity: 0.9
                        }
                      }}
                    >
                      <Typography variant="subtitle2">
                        {new Date(session.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {session.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {session.subject}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CalendarScreen;
