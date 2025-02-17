import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UploadIcon from '@mui/icons-material/Upload';

const SessionScreen = () => {
  const navigate = useNavigate();
  // Mock data - would come from API in real app
  const [sessionData] = useState({
    title: 'Introduction to Calculus',
    summary: 'This session covers the fundamental concepts of calculus including limits, derivatives, and basic integration. We\'ll focus on building intuition for these concepts through practical examples.',
    keyQuestions: [
      'What is the relationship between derivatives and rates of change?',
      'How do we interpret the geometric meaning of derivatives?',
      'What are the basic rules of differentiation?'
    ],
    insights: [
      'Students often struggle with visualizing derivatives geometrically',
      'Understanding limits is crucial for grasping derivatives',
      'Practice with real-world applications helps cement understanding'
    ],
    preparationMaterials: [
      'Chapter 1-2 from Stewart Calculus',
      'Pre-recorded video on limits',
      'Practice problems set'
    ]
  });

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Sessions', icon: <VideoCallIcon />, path: '/sessions' },
    { text: 'Chats', icon: <ChatIcon />, path: '/chats' },
    { text: 'Calendar', icon: <CalendarMonthIcon />, path: '/calendar' }
  ];

  const handleChatbotClick = () => {
    navigate('/chatbot');
  };

  const handleMenuClick = (path) => {
    navigate(path);
  };

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">
            {sessionData.title}
          </Typography>
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            sx={{ height: 'fit-content' }}
          >
            Upload Resources
          </Button>
        </Box>

        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Session Summary
              </Typography>
              <Typography variant="body1">
                {sessionData.summary}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Key Questions
              </Typography>
              <Stack spacing={1}>
                {sessionData.keyQuestions.map((question, index) => (
                  <Typography key={index} variant="body1">
                    • {question}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Insights & Learning Focus
              </Typography>
              <Stack spacing={1}>
                {sessionData.insights.map((insight, index) => (
                  <Typography key={index} variant="body1">
                    • {insight}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Preparation Materials
              </Typography>
              <Stack spacing={1}>
                {sessionData.preparationMaterials.map((material, index) => (
                  <Typography key={index} variant="body1">
                    • {material}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Button
            variant="contained"
            size="large"
            startIcon={<ChatIcon />}
            onClick={handleChatbotClick}
            sx={{ mt: 2 }}
          >
            Chat with Jarvis
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default SessionScreen;
