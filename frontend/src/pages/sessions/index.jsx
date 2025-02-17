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
  ListItemText,
  Rating,
  TextField
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UploadIcon from '@mui/icons-material/Upload';
import PersonIcon from '@mui/icons-material/Person';

const SessionScreen = () => {
  const navigate = useNavigate();
  const [sessionData] = useState({
    title: 'Traction',
    instructor: 'Ray Titus',
    summary: 'Focuses on strategies to achieve early traction and customer acquisition.',
    keyQuestions: [
      'What are key traction channels for startups?',
      'How to measure traction effectively?',
      'Which channels work best for B2B vs B2C?'
    ],
    insights: [
      'Importance of setting KPIs for traction',
      'Leveraging marketing channels for growth',
      'Focus on one channel at a time initially'
    ],
    preparationMaterials: [
      'Reading: "Bullseye Framework for Traction" (PDF)',
      'Case Study: "AirBnB Growth Strategy"',
      'Pre-session worksheet'
    ],
    notes: '',
    rating: 0,
    feedback: ''
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
          <Typography variant="h6" noWrap component="div" align="left">
            Mind Palace
          </Typography>
          <Typography variant="subtitle1" sx={{ ml: 2 }} align="left">
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
          <Box>
            <Typography variant="h4" align="left">
              {sessionData.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <PersonIcon sx={{ mr: 1 }} />
              <Typography variant="subtitle1" align="left">
                Instructor: {sessionData.instructor} (Live session with Q&A)
              </Typography>
            </Box>
          </Box>
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
              <Typography variant="h6" gutterBottom align="left">
                Session Summary
              </Typography>
              <Typography variant="body1" align="left">
                {sessionData.summary}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom align="left">
                Key Questions
              </Typography>
              <Stack spacing={1}>
                {sessionData.keyQuestions.map((question, index) => (
                  <Typography key={index} variant="body1" align="left">
                    • {question}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom align="left">
                Insights & Learning Focus
              </Typography>
              <Stack spacing={1}>
                {sessionData.insights.map((insight, index) => (
                  <Typography key={index} variant="body1" align="left">
                    • {insight}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom align="left">
                Preparation Materials
              </Typography>
              <Stack spacing={1}>
                {sessionData.preparationMaterials.map((material, index) => (
                  <Typography key={index} variant="body1" align="left">
                    • {material}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom align="left">
                Session Notes
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Take notes during the session..."
                variant="outlined"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom align="left">
                Session Feedback
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom align="left">
                  Rate this session:
                </Typography>
                <Rating size="large" />
              </Box>
              <TextField
                fullWidth
                multiline
                rows={2}
                placeholder="Share your thoughts about the session..."
                variant="outlined"
              />
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
