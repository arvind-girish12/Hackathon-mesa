import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  LinearProgress,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Divider,
  styled
} from '@mui/material';
import { 
  Layout,
  Video,
  MessageSquare,
  Calendar
} from 'react-feather';
import logo from '../../assets/logo.svg';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';

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

const DashboardScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [activeItem, setActiveItem] = useState('/dashboard');

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

  return (
    <Box sx={{ display: 'flex' }}>

      {/* Left Menu */}
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

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          maxWidth: '100vw'
        }}
      >
        {/* Search and Filters */}
        <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
          <TextField
            placeholder="Search courses..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flexGrow: 1 }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />
            }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Filter By</InputLabel>
            <Select
              value={filterBy}
              label="Filter By"
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="upcoming">Upcoming</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="progress">Progress</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Live Courses */}
        <Typography variant="h5" sx={{ mb: 3 }}>
          Live Courses
        </Typography>
        
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6">
              Launching & Leading Startups: MVP to Market
            </Typography>
            <LinearProgress variant="determinate" value={60} sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Progress: 60% Complete
            </Typography>
            
            <Typography variant="subtitle1" sx={{ mb: 2 }}>Course Outline:</Typography>
            <List>
              {['Idea Validation', 'MVP Development', 'Market Fit Strategies', 'Traction'].map((topic) => (
                <ListItem key={topic}>
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ mb: 2 }}>Past Sessions:</Typography>
            <Stack spacing={2}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2">Startup Idea Validation</Typography>
                  <Chip label="Recorded" size="small" color="secondary" />
                </CardContent>
              </Card>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2">Building an MVP</Typography>
                  <Chip label="Recorded" size="small" color="secondary" />
                </CardContent>
              </Card>
            </Stack>

            <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>Upcoming Session:</Typography>
            <Card 
              variant="outlined" 
              onClick={() => navigate('/sessions')} 
              sx={{ 
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 2
                }
              }}
            >
              <CardContent>
                <Typography variant="subtitle2">Traction</Typography>
                <Typography variant="body2" color="text.secondary">March 12, 2025</Typography>
                <Chip label="Scheduled" size="small" color="primary" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Previous Courses */}
        <Typography variant="h5" sx={{ mb: 3 }}>
          Previous Courses
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {['Crafting Marketing Strategies', 'Business Analytics', 'Entrepreneurial Finance'].map((course) => (
            <Grid item xs={12} md={4} key={course}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{course}</Typography>
                  <Chip label="Completed" size="small" color="success" sx={{ mt: 1 }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Upcoming Courses */}
        <Typography variant="h5" sx={{ mb: 3 }}>
          Upcoming Courses
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Digital Marketing</Typography>
                <Chip label="Coming Soon" size="small" color="warning" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardScreen;
