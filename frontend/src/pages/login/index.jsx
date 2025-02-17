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
import logo from '../../assets/logo.svg';

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
      icon: <PsychologyIcon />,
      title: "Personalized Learning",
      description: "AI adapts to your style—Visual, Auditory, or Kinesthetic."
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      width: '100%',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      {/* Left Side - Feature Showcase */}
      <Box 
        sx={{ 
          width: '50%',
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: 'white',
          p: 6,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <img src={logo} alt="Mind Palace Logo" style={{ height: '200px' }} />
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Mind Palace
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ opacity: 0.9, mb: 3 }}>
            Your AI-Powered MBA Study Companion
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            Elevate your MBA journey with intelligent learning assistance and structured guidance
          </Typography>
        </Box>

        <Stack spacing={3} sx={{ flex: 1 }}>
          {features.map((feature, index) => (
            <Card key={index} sx={{ 
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 2
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 3 }}>
                <Avatar sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  width: 56,
                  height: 56
                }}>
                  {feature.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: 'white', textAlign: 'left' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 600, color: 'white', textAlign: 'left' }}>
                    {feature.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      {/* Right Side - Login Form */}
      <Box sx={{ 
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 6
      }}>
        <Paper elevation={3} sx={{ 
          p: 6,
          borderRadius: 3,
          width: '100%',
          maxWidth: 480
        }}>
          <Container>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
              Welcome Back
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="emailUsername"
                label="Email Address"
                name="emailUsername"
                placeholder="Enter your email"
                autoComplete="email"
                autoFocus
                value={formData.emailUsername}
                onChange={handleInputChange}
                sx={{ mb: 3 }}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
                sx={{ mb: 4 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ 
                  py: 2,
                  mb: 3,
                  borderRadius: 2,
                  fontSize: '1.1rem'
                }}
              >
                Sign In
              </Button>

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Link 
                  href="#" 
                  variant="body1"
                  onClick={() => navigate('/forgot-password')}
                  sx={{ textDecoration: 'none' }}
                >
                  Forgot Password?
                </Link>
                <Link 
                  href="#" 
                  variant="body1"
                  onClick={() => navigate('/signup')}
                  sx={{ textDecoration: 'none' }}
                >
                  Create Account
                </Link>
              </Box>
            </Box>
          </Container>
        </Paper>
      </Box>
    </Box>
  );
};

export default LogInScreen;
