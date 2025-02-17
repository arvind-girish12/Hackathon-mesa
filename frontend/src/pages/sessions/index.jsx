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
  TextField,
  CircularProgress,
  Fab
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UploadIcon from '@mui/icons-material/Upload';
import PersonIcon from '@mui/icons-material/Person';

const SessionScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sessionData, setSessionData] = useState({
    title: 'The Bullseye Framework for Traction',
    instructor: 'Ray Titus',
    summary: '',
    keyQuestions: [],
    insights: [],
    preparationMaterials: [
      'Introduction to The Bullseye Framework (PDF)',
      '19 Traction Channels Overview (Video – 7 minutes)'
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

  const handleUploadResources = async () => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSessionData({
      ...sessionData,
      summary: "This session deep-dives into applying The Bullseye Framework to drive traction for a climate-tech startup focused on circular economy solutions. We'll explore how Yashovardhan's GTM strategies from Bombay Shaving Company and Berry Box can be adapted to prioritize traction channels effectively.",
      keyQuestions: [
        'How can the Bullseye Framework help a circular economy startup find its strongest traction channel?',
        'Which traction channels are most effective for B2B climate-tech startups?',
        'How can sustainability metrics (e.g., CO2 offsets) be used as traction signals?'
      ],
      insights: [
        'Top-of-Funnel Channels: Webinars, Industry Reports, ESG Partnerships',
        'Middle-of-Funnel Channel: Referral programs with carbon offset buyers',
        'Bottom-of-Funnel Channel: Partnerships with ESG certification bodies',
        'Learning from Experience: Applying B2C GTM lessons from Bombay Shaving Company to B2B traction for climate-tech',
        'Data-Driven Traction: Using ESG and SBTi reporting as traction signals for investors'
      ],
      preparationMaterials: [
        'The Bullseye Framework – Mastering Traction Channels (PDF)',
        'Case Study: Applying the Bullseye Framework to Climate-Tech Startups (Slide Deck)',
        'Circular Economy & Traction Metrics (Reading)'
      ]
    });
    
    setLoading(false);
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
          <Box>
            <input
              type="file"
              id="resource-upload"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files?.length) {
                  handleUploadResources(e.target.files[0]);
                }
              }}
            />
            <Button
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <UploadIcon />}
              sx={{ height: 'fit-content' }}
              onClick={() => document.getElementById('resource-upload').click()}
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload Resources'}
            </Button>
          </Box>
        </Box>

        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom align="left">
                Session Summary
              </Typography>
              <Typography variant="body1" align="left">
                {sessionData.summary || 'Session summary will be available after content upload.'}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom align="left">
                Key Questions
              </Typography>
              <Stack spacing={1}>
                {sessionData.keyQuestions.length > 0 ? (
                  sessionData.keyQuestions.map((question, index) => (
                    <Typography key={index} variant="body1" align="left">
                      • {question}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body1" align="left">
                    Key questions will be available after content upload.
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom align="left">
                Insights & Learning Focus
              </Typography>
              <Stack spacing={1}>
                {sessionData.insights.length > 0 ? (
                  sessionData.insights.map((insight, index) => (
                    <Typography key={index} variant="body1" align="left">
                      • {insight}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body1" align="left">
                    Insights will be available after content upload.
                  </Typography>
                )}
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
        </Stack>

        <Fab
          color="primary"
          aria-label="chat with Jarvis AI"
          onClick={handleChatbotClick}
          sx={{
            position: 'fixed',
            bottom: 64,
            right: 64,
            '&:hover': {
              '& .MuiSvgIcon-root': {
                transform: 'scale(1.1)'
              }
            }
          }}
        >
          <ChatIcon />
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              top: -24,
              backgroundColor: 'primary.main',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '4px',
              whiteSpace: 'nowrap'
            }}
          >
            Chat with Jarvis AI
          </Typography>
        </Fab>
      </Box>
    </Box>
  );
};

export default SessionScreen;
