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
  Stack
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const ChatsScreen = () => {
  const navigate = useNavigate();
  
  // Mock data - would come from API in real app
  const [chatSessions] = useState([
    {
      id: 1,
      title: 'Introduction to Calculus',
      lastMessage: 'Can you explain derivatives again?',
      timestamp: '2024-01-15 14:30'
    },
    {
      id: 2, 
      title: 'Linear Algebra Basics',
      lastMessage: 'I need help with matrix multiplication',
      timestamp: '2024-01-14 16:45'
    },
    {
      id: 3,
      title: 'Probability Theory',
      lastMessage: 'What is Bayes Theorem?',
      timestamp: '2024-01-13 09:15'
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
          Chat History
        </Typography>

        <Stack spacing={2}>
          {chatSessions.map((chat) => (
            <Card 
              key={chat.id}
              sx={{ cursor: 'pointer' }}
              onClick={() => handleChatClick(chat.id)}
            >
              <CardContent>
                <Typography variant="h6">
                  {chat.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last message: {chat.lastMessage}
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
