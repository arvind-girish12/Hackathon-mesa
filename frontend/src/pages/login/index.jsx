import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Container,
  Alert
} from '@mui/material';

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
          Welcome
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
  );
};

export default LogInScreen;
