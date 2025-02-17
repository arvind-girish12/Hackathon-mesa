import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Grid,
  Button,
  IconButton,
  styled,
  Drawer
} from '@mui/material';
import { 
  Layout,
  Video,
  MessageSquare,
  Calendar
} from 'react-feather';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
}));

const CalendarScreen = () => {
  const navigate = useNavigate();
  const [currentDate] = useState(new Date());
  const [activeItem, setActiveItem] = useState('/calendar');

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
    { text: 'Dashboard', icon: <Layout size={22} />, path: '/dashboard' },
    { text: 'Sessions', icon: <Video size={22} />, path: '/sessions' },
    { text: 'Chats', icon: <MessageSquare size={22} />, path: '/chats' },
    { text: 'Calendar', icon: <Calendar size={22} />, path: '/calendar' }
  ];

  const handleMenuClick = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const today = currentDate.getDate();
  const monthDays = Array.from({ length: daysInMonth - today + 1 }, (_, i) => today + i);

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
