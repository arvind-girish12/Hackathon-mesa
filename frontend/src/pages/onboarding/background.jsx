import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Autocomplete,
  Chip,
  Stack,
  LinearProgress,
  Divider,
  Paper,
  Stepper,
  Step,
  StepLabel,
  CircularProgress
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const Background = ({ onNext }) => {
  const [formData, setFormData] = useState({
    education: null,
    experience: null,
    skills: [],
    resume: null
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Sample options - would come from API in real app
  const educationOptions = [
    'Bachelor of Engineering',
    'Bachelor of Science', 
    'Bachelor of Commerce',
    'Master of Business Administration',
    'Master of Science'
  ];

  const industryOptions = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Manufacturing',
    'Retail'
  ];

  const skillOptions = [
    'Financial Analysis',
    'Project Management',
    'Data Analysis',
    'Software Development',
    'Digital Marketing',
    'Business Strategy'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsProcessing(true);
      setFormData(prev => ({ ...prev, resume: file }));
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate parsed resume data
      setFormData(prev => ({
        ...prev,
        education: 'Bachelor of Engineering',
        experience: 'Technology',
        skills: ['Software Development'],
        resume: file
      }));
      
      setIsProcessing(false);
    }
  };

  const steps = ['Background', 'Preferences', 'Learning Style'];

  return (
    <Container component="main" maxWidth="sm" sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      maxWidth: '100vw'
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
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Tell us about your Background
          </Typography>
          
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            This helps us personalize your session materials
          </Typography>

          <Stepper activeStep={0} sx={{ width: '100%', mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <LinearProgress 
            variant="determinate" 
            value={33.33} 
            sx={{ width: '100%', mb: 4 }}
          />
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Step 1 of 3
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Stack spacing={3}>
              <Button
                component="label"
                variant="outlined"
                startIcon={isProcessing ? <CircularProgress size={20} /> : <UploadFileIcon />}
                sx={{ mb: 2 }}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing Resume...' : 'Upload Resume'}
                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  disabled={isProcessing}
                />
              </Button>
              {formData.resume && !isProcessing && (
                <Typography variant="body2" color="text.secondary">
                  Uploaded: {formData.resume.name}
                </Typography>
              )}

              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Or fill in manually
                </Typography>
              </Divider>

              <Autocomplete
                value={formData.education}
                onChange={(event, newValue) => {
                  setFormData(prev => ({ ...prev, education: newValue }));
                }}
                options={educationOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required={!formData.resume}
                    label="Previous Education (Major/Degree)"
                    placeholder="e.g., Bachelor of Engineering"
                  />
                )}
              />

              <Autocomplete
                value={formData.experience}
                onChange={(event, newValue) => {
                  setFormData(prev => ({ ...prev, experience: newValue }));
                }}
                options={industryOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required={!formData.resume}
                    label="Work Experience (Industry)"
                    placeholder="e.g., Finance, Technology"
                  />
                )}
              />

              <Autocomplete
                multiple
                value={formData.skills}
                onChange={(event, newValue) => {
                  setFormData(prev => ({ ...prev, skills: newValue }));
                }}
                options={skillOptions}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Relevant Skills/Expertise"
                    placeholder="e.g., Financial Analysis"
                  />
                )}
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
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Background;
