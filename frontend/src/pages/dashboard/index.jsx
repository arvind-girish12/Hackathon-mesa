import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Stack,
  IconButton
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DashboardScreen = () => {
  const navigate = useNavigate();
  // Temporary mock data - would come from API/props in real app
  const [upcomingSessions] = useState([
    {
      id: 1,
      title: 'Introduction to Calculus',
      subject: 'Mathematics',
      dateTime: '2024-02-20T14:00:00',
      status: 'Pre-reads Ready'
    },
    {
      id: 2, 
      title: 'Chemical Bonding',
      subject: 'Chemistry',
      dateTime: '2024-02-21T15:30:00',
      status: 'Upcoming'
    }
  ]);

  const handleSessionClick = (sessionId) => {
    navigate(`/session/${sessionId}`);
  };

  return (
    <Container component="main">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography component="h1" variant="h4" gutterBottom>
          Dashboard
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Welcome, John Doe!
        </Typography>

        <Typography variant="h5" sx={{ mb: 2 }}>
          Upcoming Sessions
        </Typography>

        <Stack spacing={2}>
          {upcomingSessions.map((session) => (
            <Card key={session.id}>
              <CardActionArea onClick={() => handleSessionClick(session.id)}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h6" component="div">
                      {session.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {session.subject}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(session.dateTime).toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Chip 
                      label={session.status}
                      color={session.status === 'Pre-reads Ready' ? 'primary' : 'default'}
                      size="small"
                    />
                    <IconButton edge="end" aria-label="details">
                      <ChevronRightIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default DashboardScreen;
