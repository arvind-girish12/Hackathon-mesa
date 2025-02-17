import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Autocomplete,
  Stack,
  LinearProgress
} from '@mui/material';

const Goals = ({ onBack }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    targetIndustry: null,
    desiredRole: null, 
    shortTermGoals: '',
    longTermGoals: ''
  });

  // Sample options - would come from API in real app
  const industryOptions = [
    'Consulting',
    'Investment Banking',
    'Technology',
    'Healthcare',
    'Consumer Goods',
    'Manufacturing'
  ];

  const roleOptions = [
    'Strategy Consultant',
    'Investment Banker',
    'Product Manager',
    'Business Development',
    'Operations Manager',
    'Marketing Director'
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
          What are your Career Goals?
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
          Knowing your goals helps us highlight relevant opportunities and content for your journey
        </Typography>

        <LinearProgress 
          variant="determinate" 
          value={100} 
          sx={{ width: '100%', mb: 4 }}
        />
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Step 2 of 2
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Stack spacing={3}>
            <Autocomplete
              value={formData.targetIndustry}
              onChange={(event, newValue) => {
                setFormData(prev => ({ ...prev, targetIndustry: newValue }));
              }}
              options={industryOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Industry you are targeting after MBA"
                  placeholder="e.g., Consulting"
                />
              )}
            />

            <Autocomplete
              value={formData.desiredRole}
              onChange={(event, newValue) => {
                setFormData(prev => ({ ...prev, desiredRole: newValue }));
              }}
              options={roleOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Desired Role/Function"
                  placeholder="e.g., Strategy Consultant"
                />
              )}
            />

            <TextField
              required
              multiline
              rows={3}
              label="Short-term Career Goals (1-2 years post MBA)"
              placeholder="Briefly describe..."
              value={formData.shortTermGoals}
              onChange={(e) => setFormData(prev => ({ ...prev, shortTermGoals: e.target.value }))}
            />

            <TextField
              required
              multiline
              rows={3}
              label="Long-term Career Aspirations (5+ years post MBA)"
              placeholder="Briefly describe..."
              value={formData.longTermGoals}
              onChange={(e) => setFormData(prev => ({ ...prev, longTermGoals: e.target.value }))}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
            >
              Complete Profile
            </Button>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={onBack}
            >
              Back
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Goals;
