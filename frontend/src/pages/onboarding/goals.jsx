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
  LinearProgress,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Paper
} from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

const Goals = ({ onBack, onNext }) => {
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

  const populateFields = () => {
    setFormData({
      targetIndustry: 'Technology',
      desiredRole: 'Product Manager',
      shortTermGoals: `1️⃣ Enhance Data-Driven Decision Making
"Develop proficiency in SQL and analytics tools like Mixpanel or Amplitude to make better product decisions."

2️⃣ Improve Stakeholder Communication
"Refine my ability to communicate product vision and priorities effectively with engineers, designers, and executives."

3️⃣ Increase Customer Understanding
"Conduct at least 10 user interviews per quarter to gain deeper insights into customer pain points and needs."`,
      longTermGoals: `1️⃣ Grow into a Senior Product Manager Role
"Take ownership of larger product initiatives, drive cross-functional alignment, and mentor junior PMs."

2️⃣ Build a Strong Personal Brand in Product Management
"Share insights through LinkedIn, blog posts, or public speaking to establish thought leadership in the industry."`
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    onNext()
  };

  const steps = ['Background', 'Goals', 'Learning Style'];

  return (
    <Container component="main" maxWidth="sm" sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <Paper elevation={4} sx={{ 
        width: '100%',
        p: 4,
        borderRadius: 2
      }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography component="h1" variant="h4">
              What are your Career Goals?
            </Typography>
            <IconButton
              onClick={populateFields}
              sx={{ color: 'primary.main' }}
              title="Auto-fill form"
            >
              <AutoFixHighIcon />
            </IconButton>
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
            Knowing your goals helps us highlight relevant opportunities and content for your journey
          </Typography>

          <Stepper activeStep={1} sx={{ width: '100%', mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <LinearProgress 
            variant="determinate" 
            value={66.66} 
            sx={{ width: '100%', mb: 4 }}
          />
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Step 2 of 3
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
                rows={6}
                label="Short-term Career Goals (1-2 years post MBA)"
                placeholder="Briefly describe..."
                value={formData.shortTermGoals}
                onChange={(e) => setFormData(prev => ({ ...prev, shortTermGoals: e.target.value }))}
              />

              <TextField
                required
                multiline
                rows={4}
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
                Continue
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
      </Paper>
    </Container>
  );
};

export default Goals;
