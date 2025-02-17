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
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  TextField,
  CircularProgress,
  Fab,
  styled
} from '@mui/material';
import { 
  Layout,
  Video,
  MessageSquare,
  Calendar
} from 'react-feather';
import ChatIcon from '@mui/icons-material/Chat';
import UploadIcon from '@mui/icons-material/Upload';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../../assets/logo.svg';

// Styled components for sidebar
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 280,
  '& .MuiDrawer-paper': {
    width: 280,
    backgroundColor: '#f8f9fa',
    border: 'none',
    boxShadow: '1px 0 8px rgba(0,0,0,0.05)',
    borderRadius: '0 12px 12px 0',
    padding: theme.spacing(2, 0)
  }
}));

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  margin: theme.spacing(0.5, 2),
  padding: theme.spacing(1.5, 2),
  borderRadius: 8,
  fontFamily: "'Inter', sans-serif",
  transition: 'all 0.2s ease',
  
  '& .MuiListItemIcon-root': {
    minWidth: 42,
    color: active ? theme.palette.primary.main : '#64748b',
    transition: 'color 0.2s ease'
  },
  
  '& .MuiListItemText-primary': {
    fontSize: '0.95rem',
    fontWeight: active ? 600 : 500,
    color: active ? theme.palette.primary.main : '#334155',
    letterSpacing: '0.02em'
  },

  ...(active && {
    backgroundColor: '#e8f2ff',
  }),

  '&:hover': {
    backgroundColor: active ? '#e8f2ff' : '#f1f5f9',
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main
    },
    '& .MuiListItemText-primary': {
      color: theme.palette.primary.main
    }
  }
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#fafafa',
  borderRadius: 12,
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  marginBottom: theme.spacing(3),
  '& .MuiCardContent-root': {
    padding: theme.spacing(3)
  }
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  borderBottom: '2px solid #f0f0f0'
}));

const SessionScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeItem, setActiveItem] = useState('/sessions');
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
    { text: 'Dashboard', icon: <Layout size={22} />, path: '/dashboard' },
    { text: 'Sessions', icon: <Video size={22} />, path: '/sessions' },
    { text: 'Chats', icon: <MessageSquare size={22} />, path: '/chats' },
    { text: 'Calendar', icon: <Calendar size={22} />, path: '/calendar' }
  ];

  const handleChatbotClick = () => {
    navigate('/chatbot');
  };

  const handleMenuClick = (path) => {
    setActiveItem(path);
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
      <StyledDrawer variant="permanent">
        <Box sx={{ p: 2, mt: 0 }}>
          <img src={logo} alt="Mind Palace Logo" style={{ height: '150px' }} />
        </Box>
        <List>
          {menuItems.map((item) => (
            <StyledListItem
              button
              key={item.text}
              active={activeItem === item.path ? 1 : 0}
              onClick={() => handleMenuClick(item.path)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </StyledListItem>
          ))}
        </List>
      </StyledDrawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          backgroundColor: '#f5f5f5'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600 }} align="left">
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
          <StyledCard>
            <CardContent>
              <SectionTitle variant="h6" gutterBottom align="left">
                Session Summary
              </SectionTitle>
              <Typography variant="body1" align="left">
                {sessionData.summary || 'Session summary will be available after content upload.'}
              </Typography>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <SectionTitle variant="h6" gutterBottom align="left">
                Key Questions
              </SectionTitle>
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
          </StyledCard>

          <StyledCard>
            <CardContent>
              <SectionTitle variant="h6" gutterBottom align="left">
                Insights & Learning Focus
              </SectionTitle>
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
          </StyledCard>

          <StyledCard>
            <CardContent>
              <SectionTitle variant="h6" gutterBottom align="left">
                Preparation Materials
              </SectionTitle>
              <Stack spacing={1}>
                {sessionData.preparationMaterials.map((material, index) => (
                  <Typography key={index} variant="body1" align="left">
                    • {material}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <SectionTitle variant="h6" gutterBottom align="left">
                Session Notes
              </SectionTitle>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Take notes during the session..."
                variant="outlined"
              />
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <SectionTitle variant="h6" gutterBottom align="left">
                Session Feedback
              </SectionTitle>
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
          </StyledCard>
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
