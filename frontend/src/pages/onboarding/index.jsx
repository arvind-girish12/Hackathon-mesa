import { useState } from 'react';
import { Box } from '@mui/material';
import Background from './background';
import Goals from './goals';
import LearningStyle from './learningstyle';

const OnboardingScreen = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <Box>
      {step === 1 && (
        <Background 
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <Goals
          onBack={handleBack}
          onNext={handleNext}
        />
      )}
      {step === 3 && (
        <LearningStyle
          onBack={handleBack}
        />
      )}
    </Box>
  );
};

export default OnboardingScreen;
