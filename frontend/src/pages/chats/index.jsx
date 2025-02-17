import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  AppBar,
  Toolbar,
  Stack,
  Chip
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const ChatsScreen = () => {
  const navigate = useNavigate();
  
  const [chatSessions] = useState([
    {
      id: 1,
      course: 'Launching & Leading Startups: MVP to Market',
      session: 'Traction',
      userMessage: 'What is traction for a circular economy startup?',
      botMessage: 'Traction is measurable progress, such as CO2 offsets achieved or ESG partnership sign-ups.',
      timestamp: '2024-01-15 14:30'
    },
    {
      id: 2,
      course: 'Entrepreneurial Strategy',
      session: 'Funding Models',
      userMessage: 'Explain the difference between seed and series A funding.',
      botMessage: 'Seed funding helps validate your idea, while Series A is for scaling with a proven business model.',
      timestamp: '2024-01-14 16:45'
    },
    {
      id: 3,
      course: 'Product Metrics & Execution',
      session: 'Cohort Analysis',
      userMessage: 'How can cohort analysis help a climate-tech startup?',
      botMessage: 'It identifies user retention trends, e.g., tracking whether ESG webinar attendees are more loyal customers.',
      timestamp: '2024-01-13 09:15'
    },
    {
      id: 4,
      course: 'Launching & Leading Startups: MVP to Market',
      session: 'Traction',
      userMessage: 'Name one traction channel most suitable for B2B climate-tech startups.',
      botMessage: 'Industry partnerships with ESG-focused enterprises are a strong channel.',
      timestamp: '2024-01-12 11:20'
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

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Learning Assistant
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
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
        <Typography variant="h4" sx={{ mb: 3 }}>
          Chat History (Last 10 Chats)
        </Typography>

        <Stack spacing={2}>
          {chatSessions.map((chat) => (
            <Card 
              key={chat.id}
              sx={{ cursor: 'pointer' }}
              onClick={() => handleChatClick(chat.id)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Chip label={chat.course} color="primary" />
                  <Chip label={chat.session} color="secondary" />
                </Box>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>You:</strong> {chat.userMessage}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Jarvis:</strong> {chat.botMessage}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {chat.timestamp}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default ChatsScreen;
