import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Container,
  Alert,
  Grid,
  Card,
  CardContent,
  Stack,
  Avatar,
  Paper
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PsychologyIcon from '@mui/icons-material/Psychology';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const LogInScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailUsername: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // TODO: Implement actual login logic here
      // For now, just navigate to dashboard on any submission
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const features = [
    {
      icon: <VideoCallIcon />,
      title: "Sessions",
      description: "Attend interactive AI-powered study sessions based on your needs."
    },
    {
      icon: <SchoolIcon />,
      title: "Courses", 
      description: "Structured modules crafted for deep MBA learning."
    },
    {
      icon: <CalendarMonthIcon />,
      title: "Calendar",
      description: "Plan your study schedule with an integrated smart calendar."
    },
    {
      icon: <PsychologyIcon />,
      title: "Personalized Learning",
      description: "AI adapts to your style—Visual, Auditory, or Kinesthetic."
    }
  ];

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw'
    }}>
      {/* Left Side - Mind Palace Intro */}
      <Box 
        sx={{ 
          width: '50%',
          maxWidth: '800px',
          bgcolor: 'primary.main',
          color: 'white',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" gutterBottom align="left">
            Mind Palace
          </Typography>
          <Typography variant="h5" gutterBottom align="left">
            Your AI-Powered MBA Study Companion
          </Typography>
          <Typography variant="body1" align="left">
            Master MBA concepts effortlessly with AI-driven insights and structured learning.
          </Typography>
        </Box>

        <Stack spacing={3} sx={{ flex: 1, overflow: 'hidden' }}>
          {features.map((feature, index) => (
            <Card key={index} sx={{ bgcolor: 'primary.dark' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.light' }}>
                  {feature.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6" color="white" align="left">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="primary.light" align="left">
                    {feature.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Box sx={{ mt: 4 }}>
          <Card sx={{ bgcolor: 'primary.dark', mb: 3 }}>
            <CardContent>
              <FormatQuoteIcon sx={{ fontSize: 40, color: 'primary.light' }} />
              <Typography variant="body1" color="white" gutterBottom align="left">
                "Mind Palace helped me ace my MBA sessions! The AI-driven summaries are a game-changer."
              </Typography>
              <Typography variant="subtitle2" color="primary.light" align="left">
                - John D., MBA Student, ISB
              </Typography>
            </CardContent>
          </Card>

          <Typography variant="h6" align="left">
            Join 5,000+ MBA students excelling with Mind Palace!
          </Typography>
        </Box>
      </Box>

      {/* Right Side - Login Form */}
      <Paper elevation={3} sx={{ 
        width: '400px',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto'
      }}>
        <Container maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              py: 4
            }}
          >
            <Typography component="h1" variant="h4" gutterBottom align="left">
              Welcome Back
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="emailUsername"
                label="Email Address or Username"
                name="emailUsername"
                placeholder="Your email or username"
                autoComplete="email"
                autoFocus
                value={formData.emailUsername}
                onChange={handleInputChange}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                placeholder="Your password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link 
                  href="#" 
                  variant="body2" 
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot Password?
                </Link>
                <Link 
                  href="#" 
                  variant="body2" 
                  onClick={() => navigate('/signup')}
                >
                  Don't have an account? Sign Up
                </Link>
              </Box>
            </Box>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
};

export default LogInScreen;
