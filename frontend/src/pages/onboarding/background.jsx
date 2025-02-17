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
  Divider
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const Background = ({ onNext }) => {
  const [formData, setFormData] = useState({
    education: null,
    experience: null,
    skills: [],
    resume: null
  });

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

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
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

        <LinearProgress 
          variant="determinate" 
          value={50} 
          sx={{ width: '100%', mb: 4 }}
        />
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Step 1 of 2
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Stack spacing={3}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<UploadFileIcon />}
              sx={{ mb: 2 }}
            >
              Upload Resume
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
              />
            </Button>
            {formData.resume && (
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
    </Container>
  );
};

export default Background;
