import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  AppBar,
  Toolbar,
  Stack,
  Paper
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SendIcon from '@mui/icons-material/Send';

const ChatScreen = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Sessions', icon: <VideoCallIcon />, path: '/sessions' },
    { text: 'Chats', icon: <ChatIcon />, path: '/chats' },
    { text: 'Calendar', icon: <CalendarMonthIcon />, path: '/calendar' }
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    try {
      // TODO: Replace with actual API call
      const response = await new Promise(resolve => 
        setTimeout(() => resolve({ text: "This is a mock response from the chatbot." }), 1000)
      );

      // Add bot message
      const botMessage = {
        text: response.text,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" align="left">
            Chat with Jarvis
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
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '64px',
          p: 3,
          pb: 10 // Add bottom padding to ensure input bar is visible
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            mb: 2
          }}
        >
          <Stack spacing={2}>
            {messages.length === 0 ? (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Paper sx={{ p: 2, maxWidth: '70%', backgroundColor: 'grey.100' }}>
                    <Typography variant="body1" align="left">
                      Hello! I'm Jarvis, your AI learning assistant. How can I help you today?
                    </Typography>
                  </Paper>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Paper sx={{ p: 2, maxWidth: '70%', backgroundColor: 'primary.main', color: 'white' }}>
                    <Typography variant="body1" align="left">
                      Hi Jarvis! Can you help me understand calculus better?
                    </Typography>
                  </Paper>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Paper sx={{ p: 2, maxWidth: '70%', backgroundColor: 'grey.100' }}>
                    <Typography variant="body1" align="left">
                      Of course! I'd be happy to help you with calculus. What specific topics would you like to explore?
                    </Typography>
                  </Paper>
                </Box>
              </>
            ) : (
              messages.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start'
                  }}
                >
                  <Paper
                    sx={{
                      p: 2,
                      maxWidth: '70%',
                      backgroundColor: message.sender === 'user' ? 'primary.main' : 'grey.100',
                      color: message.sender === 'user' ? 'white' : 'text.primary'
                    }}
                  >
                    <Typography variant="body1" align="left">
                      {message.text}
                    </Typography>
                  </Paper>
                </Box>
              ))
            )}
          </Stack>
        </Box>

        <Box 
          sx={{ 
            display: 'flex', 
            gap: 1, 
            position: 'fixed',
            bottom: 0,
            left: 240, // Account for drawer width
            right: 0,
            p: 3,
            backgroundColor: 'background.default'
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button
            variant="contained"
            onClick={handleSendMessage}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatScreen;
