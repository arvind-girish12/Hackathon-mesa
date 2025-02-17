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
  FormControlLabel
} from '@mui/material';

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

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'agreeToTerms' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    try {
      // TODO: Implement actual signup logic here
      navigate('/onboarding');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Create Account
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
          >
            Sign Up
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
  );
};

export default SignUpScreen;
