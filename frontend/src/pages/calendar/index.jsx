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
  Button,
  IconButton
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

  const [sessions] = useState([
    {
      id: 1,
      title: 'Traction',
      course: 'Launching & Leading Startups',
      dateTime: '2025-02-05T09:00:00',
      color: '#e3f2fd'
    },
    {
      id: 2,
      title: 'Funding Models',
      course: 'Entrepreneurial Strategy',
      dateTime: '2025-02-05T11:00:00',
      color: '#f3e5f5'
    },
    {
      id: 3,
      title: 'Cohort Analysis',
      course: 'Product Metrics & Execution',
      dateTime: '2025-02-05T14:00:00',
      color: '#e8f5e9'
    },
    {
      id: 4,
      title: 'Case Study Discussion: Bullseye Framework',
      course: 'Traction',
      dateTime: '2025-02-05T16:00:00',
      color: '#fff3e0'
    },
    {
      id: 5,
      title: 'MVP Development Strategies',
      course: 'Launching & Leading Startups',
      dateTime: '2025-02-12T09:30:00',
      color: '#e3f2fd'
    },
    {
      id: 6,
      title: 'Investor Pitch Practice',
      course: 'Entrepreneurial Strategy',
      dateTime: '2025-02-12T13:00:00',
      color: '#f3e5f5'
    },
    {
      id: 7,
      title: 'Customer Retention Metrics',
      course: 'Product Metrics & Execution',
      dateTime: '2025-02-12T15:00:00',
      color: '#e8f5e9'
    },
    {
      id: 8,
      title: 'Bullseye Framework',
      course: 'Traction',
      dateTime: '2025-02-20T10:00:00',
      color: '#e3f2fd'
    },
    {
      id: 9,
      title: 'Debt vs Equity Funding Deep-Dive',
      course: 'Entrepreneurial Strategy',
      dateTime: '2025-02-20T12:30:00',
      color: '#f3e5f5'
    },
    {
      id: 10,
      title: 'Understanding Funnel Drop-off',
      course: 'Product Metrics & Execution',
      dateTime: '2025-02-20T14:30:00',
      color: '#e8f5e9'
    },
    {
      id: 11,
      title: 'Panel Discussion with ESG Experts',
      course: 'Open Session',
      dateTime: '2025-02-20T16:00:00',
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

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const today = currentDate.getDate();
  const monthDays = Array.from({ length: daysInMonth - today + 1 }, (_, i) => today + i);

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
          <Button startIcon={<ChevronLeftIcon />}>Previous Month</Button>
          <Typography variant="h5" sx={{ mx: 2 }}>
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </Typography>
          <Button endIcon={<ChevronRightIcon />}>Next Month</Button>
        </Box>

        <Grid container spacing={2}>
          {monthDays.map((day) => {
            const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const daysSessions = sessions.filter(session => 
              new Date(session.dateTime).toDateString() === currentDay.toDateString()
            );

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={day}>
                <Paper 
                  elevation={2}
                  sx={{
                    p: 2,
                    minHeight: '200px',
                    backgroundColor: '#fafafa'
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, borderBottom: '1px solid #e0e0e0', pb: 1 }}>
                    {currentDay.toLocaleDateString('default', { weekday: 'long', day: 'numeric' })}
                  </Typography>
                  <Box 
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                    onClick={() => navigate('/sessions')}
                  >
                    {daysSessions.map((session) => (
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
                          {session.course}
                        </Typography>
                      </Paper>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default CalendarScreen;
