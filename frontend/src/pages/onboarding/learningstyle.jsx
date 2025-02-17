import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel,
  Container,
  Paper,
  LinearProgress,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HearingIcon from '@mui/icons-material/Hearing';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BuildIcon from '@mui/icons-material/Build';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const LearningStyle = ({ onBack }) => {
  const [selectedStyle, setSelectedStyle] = useState('');
  const [learningMode, setLearningMode] = useState('');
  const navigate = useNavigate();
  const learningStyles = [
    {
      value: 'visual',
      title: 'Visual Learner',
      description: 'I learn best with images, diagrams, and charts.',
      icon: <VisibilityIcon sx={{ fontSize: 32 }} />
    },
    {
      value: 'reading',
      title: 'Reading/Writing Learner',
      description: 'I understand better through text-based materials.',
      icon: <MenuBookIcon sx={{ fontSize: 32 }} />
    },
    {
      value: 'kinesthetic',
      title: 'Kinesthetic Learner',
      description: 'I grasp concepts through hands-on practice and real-life examples.',
      icon: <BuildIcon sx={{ fontSize: 32 }} />
    },
    {
      value: 'mixed',
      title: 'Mixed Learning',
      description: 'I like a mix of everything.',
      icon: <ShuffleIcon sx={{ fontSize: 32 }} />
    }
  ];

  const steps = ['Background', 'Goals', 'Learning Style'];

  return (
    <Container component="main" maxWidth="lg" sx={{ 
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      maxWidth: '100vw' 
    }}>
      <Paper elevation={4} sx={{ 
        width: '100%',
        p: 4,
        borderRadius: 2
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          marginTop: '32px'
        }}>
          <Typography component="h1" variant="h4" align="center">
            How Do You Prefer to Learn?
          </Typography>

          <Typography variant="body1" color="text.secondary" align="center">
            This helps us tailor content to match your study style.
          </Typography>

          <Stepper activeStep={2} sx={{ width: '100%', mb: 2 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <LinearProgress 
            variant="determinate" 
            value={100} 
            sx={{ width: '100%', mb: 2 }}
          />

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
            Step 3 of 3
          </Typography>

          <Grid container spacing={2}>
            {learningStyles.map((style) => (
              <Grid item xs={6} key={style.value}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border: selectedStyle === style.value ? 2 : 1,
                    borderColor: selectedStyle === style.value ? 'primary.main' : 'grey.300',
                    '&:hover': { borderColor: 'primary.main' },
                    height: '100%'
                  }}
                  onClick={() => setSelectedStyle(style.value)}
                >
                  <CardContent sx={{ p: 1.5 }}>
                    <Stack spacing={1} alignItems="center">
                      {style.icon}
                      <Typography variant="subtitle1">{style.title}</Typography>
                      <Typography variant="body2" color="text.secondary" align="center" sx={{ fontSize: '0.8rem' }}>
                        {style.description}
                      </Typography>
                      <Radio
                        checked={selectedStyle === style.value}
                        onChange={(e) => setSelectedStyle(e.target.value)}
                        value={style.value}
                        size="small"
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Do you prefer structured or flexible learning?
            </Typography>
            <RadioGroup
              value={learningMode}
              onChange={(e) => setLearningMode(e.target.value)}
            >
              <FormControlLabel
                value="structured"
                control={<Radio size="small" />}
                label="Structured Learning - Step-by-step guided sessions"
              />
              <FormControlLabel
                value="flexible"
                control={<Radio size="small" />}
                label="Flexible Learning - Learn at your own pace, explore topics freely"
              />
            </RadioGroup>
          </Box>

          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              disabled={!selectedStyle}
              onClick={() => navigate('/dashboard')}
            >
              Finish
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default LearningStyle;
