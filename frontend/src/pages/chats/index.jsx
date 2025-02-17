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
  Stack,
  Chip,
  styled
} from '@mui/material';
import { 
  Layout,
  Video,
  MessageSquare,
  Calendar
} from 'react-feather';
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

const ChatsScreen = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('/chats');
  
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
    { text: 'Dashboard', icon: <Layout size={22} />, path: '/dashboard' },
    { text: 'Sessions', icon: <Video size={22} />, path: '/sessions' },
    { text: 'Chats', icon: <MessageSquare size={22} />, path: '/chats' },
    { text: 'Calendar', icon: <Calendar size={22} />, path: '/calendar' }
  ];

  const handleMenuClick = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
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
