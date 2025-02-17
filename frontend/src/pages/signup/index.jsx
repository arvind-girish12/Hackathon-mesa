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
  Checkbox,
  FormControlLabel,
  Paper,
  Card,
  CardContent,
  Stack,
  Avatar,
  IconButton,
  CircularProgress,
  Snackbar
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PsychologyIcon from '@mui/icons-material/Psychology';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import MuiAlert from '@mui/material/Alert';

const SignUpScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    mobileNumber: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const features = [
    {
      icon: <CalendarMonthIcon />,
      title: 'Structured Learning Path',
      description: 'Follow a carefully designed curriculum that adapts to your progress'
    },
    {
      icon: <SchoolIcon />,
      title: 'Expert-Curated Content',
      description: 'Access premium MBA materials from top business schools'
    },
    {
      icon: <VideoCallIcon />,
      title: 'Interactive Sessions',
      description: 'Engage in AI-powered study sessions for better retention'
    },
    {
      icon: <PsychologyIcon />,
      title: 'Smart Insights',
      description: 'Get personalized recommendations based on your learning style'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'agreeToTerms' ? checked : value
    }));
  };

  const populateFields = () => {
    setFormData({
      fullName: 'John Smith',
      email: 'john.smith@mba.edu',
      password: 'Test123!@#',
      mobileNumber: '+1234567890',
      agreeToTerms: true
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/onboarding');
      }, 1000);
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw'
    }}>
      {/* Left Side - Mind Palace Info */}
      <Box sx={{ 
        flex: 1, 
        bgcolor: 'primary.main', 
        color: 'white',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}>
        <Box>
          <Typography variant="h3" gutterBottom align="left">
            Mind Palace
          </Typography>
          <Typography variant="h5" gutterBottom align="left">
            Your AI Study Companion for MBA Success
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

      {/* Right Side - Signup Form */}
      <Paper elevation={3} sx={{ 
        width: '400px',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
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
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography component="h1" variant="h4" gutterBottom align="left">
                Create Account
              </Typography>
              <IconButton 
                onClick={populateFields}
                sx={{ color: 'primary.main' }}
                title="Auto-fill form"
              >
                <AutoFixHighIcon />
              </IconButton>
            </Box>

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
                id="fullName"
                label="Your Name"
                name="fullName"
                placeholder="Enter your full name"
                autoComplete="name"
                autoFocus
                value={formData.fullName}
                onChange={handleInputChange}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                placeholder="Your MBA email"
                autoComplete="email"
                type="email"
                value={formData.email}
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
                placeholder="Create a strong password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleInputChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="mobileNumber"
                label="Mobile Number"
                type="tel"
                id="mobileNumber"
                placeholder="Your phone number"
                autoComplete="tel"
                value={formData.mobileNumber}
                onChange={handleInputChange}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the{' '}
                    <Link href="#" underline="hover">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="#" underline="hover">Privacy Policy</Link>
                  </Typography>
                }
                sx={{ mt: 2 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign Up'}
              </Button>

              <Button
                fullWidth
                variant="outlined"
                sx={{ mb: 1 }}
              >
                Sign up with Google
              </Button>

              <Button
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              >
                Sign up with LinkedIn
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Link 
                  href="#" 
                  variant="body2"
                  onClick={() => navigate('/login')}
                >
                  Already have an account? Log In
                </Link>
              </Box>
            </Box>
          </Box>
        </Container>
      </Paper>

      <Snackbar 
        open={showSuccess} 
        autoHideDuration={2000} 
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert severity="success" elevation={6} variant="filled">
          Account created successfully!
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default SignUpScreen;
