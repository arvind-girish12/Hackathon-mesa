import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  Stack,
  Paper,
  CircularProgress,
  Chip,
  styled
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { 
  Layout,
  Video,
  MessageSquare,
  Calendar
} from 'react-feather';
import SendIcon from "@mui/icons-material/Send";
import { BULLSEYE_FRAMEWORK_QUIZ, BULLSEYE_FRAMEWORK_QUIZ_2 } from "./constant";
import logo from '../../assets/logo.svg';

// Styled components for sidebar
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 280,
  '& .MuiDrawer-paper': {
    width: 280,
    backgroundColor: '#f8f9fa',
    border: 'none',
    boxShadow: '1px 0 8px rgba(0,0,0,0.05)',
    borderRadius: '0 12px 12px 0',
    padding: theme.spacing(2, 0)
  }
}));

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  margin: theme.spacing(0.5, 2),
  padding: theme.spacing(1.5, 2),
  borderRadius: 8,
  fontFamily: "'Inter', sans-serif",
  transition: 'all 0.2s ease',
  
  '& .MuiListItemIcon-root': {
    minWidth: 42,
    color: active ? theme.palette.primary.main : '#64748b',
    transition: 'color 0.2s ease'
  },
  
  '& .MuiListItemText-primary': {
    fontSize: '0.95rem',
    fontWeight: active ? 600 : 500,
    color: active ? theme.palette.primary.main : '#334155',
    letterSpacing: '0.02em'
  },

  ...(active && {
    backgroundColor: '#e8f2ff',
  }),
}));

const ChatScreen = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      text: "Hey, How can I help you?",
      sender: "bot",
      timestamp: new Date().toISOString(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeItem, setActiveItem] = useState('/chat');

  const menuItems = [
    { text: 'Dashboard', icon: <Layout size={22} />, path: '/dashboard' },
    { text: 'Sessions', icon: <Video size={22} />, path: '/sessions' },
    { text: 'Chats', icon: <MessageSquare size={22} />, path: '/chats' },
    { text: 'Calendar', icon: <Calendar size={22} />, path: '/calendar' }
  ];

  const defaultPrompts = [
    "What is Bulls eye framework",
    "Test my understanding"
  ];

  const handleMenuClick = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  const handlePromptClick = (prompt) => {
    setInputMessage(prompt);
    handleSendMessage(prompt);
  };

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return;

    const userMessage = {
      text: message,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    const loadingMessage = {
      text: "...",
      sender: "bot",
      timestamp: new Date().toISOString(),
      isLoading: true
    };
    setMessages(prev => [...prev, loadingMessage]);

    if (message.trim().toLowerCase() === "test my understanding") {
      // Show loading for 1.5 seconds before showing quiz
      setTimeout(() => {
        const botResponse = BULLSEYE_FRAMEWORK_QUIZ;
        setMessages((prev) => prev.filter(msg => !msg.isLoading).concat([botResponse]));
        setIsLoading(false);
      }, 1500);
      return;
    }
    // Check for quiz answers
    const answer1B2C3B = message === "1-B, 2-C, 3-B";
    if (answer1B2C3B) {
      setTimeout(() => {
        const botResponse = BULLSEYE_FRAMEWORK_QUIZ_2;
        setMessages((prev) => prev.filter(msg => !msg.isLoading).concat([botResponse]));
        setIsLoading(false);
      }, 1500);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: message }),
      });

      const data = await response.json();

      // Add bot response
      const botMessage = {
        text: data.answer || "I'm sorry, I didn't understand that.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => prev.filter(msg => !msg.isLoading).concat([botMessage]));
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        text: "Sorry, there was an error processing your request.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => prev.filter(msg => !msg.isLoading).concat([errorMessage]));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Drawer */}
      <StyledDrawer variant="permanent">
        <Box sx={{ p: 2, mt: 0 }}>
          <img src={logo} alt="Mind Palace Logo" style={{ height: '150px' }} />
        </Box>
        <List>
          {menuItems.map((item) => (
            <StyledListItem
              button
              key={item.text}
              active={activeItem === item.path ? 1 : 0}
              onClick={() => handleMenuClick(item.path)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </StyledListItem>
          ))}
        </List>
      </StyledDrawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          p: 3,
          pb: 20,
        }}
      >
        {/* Message Display */}
        <Box sx={{ flexGrow: 1, mb: 2 }}>
          <Stack spacing={2}>
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    message.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    maxWidth: "70%",
                    backgroundColor:
                      message.sender === "user" ? "#1976d2" : "#f5f5f5",
                    color: message.sender === "user" ? "#fff" : "#000",
                    borderRadius:
                      message.sender === "user"
                        ? "15px 15px 0px 15px"
                        : "15px 15px 15px 0px",
                  }}
                >
                  {message.isLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <>
                      {/* Left-align text */}
                      <Typography
                        variant="body1"
                        sx={{ textAlign: "left" }}
                      >
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                      </Typography>

                      {/* Timestamp */}
                      <Typography
                        variant="caption"
                        align="right"
                        sx={{ display: "block", mt: 1 }}
                      >
                        {format(new Date(message.timestamp), "PPpp")}
                      </Typography>
                    </>
                  )}
                </Paper>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Input Box */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            position: "fixed",
            bottom: 0,
            left: 280,
            right: 0,
            p: 3,
            backgroundColor: "#fff",
          }}
        >
          {/* Suggested Prompts */}
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            {defaultPrompts.map((prompt) => (
              <Chip
                key={prompt}
                label={prompt}
                onClick={() => handlePromptClick(prompt)}
                clickable
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>

          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <Button
              variant="contained"
              onClick={() => handleSendMessage()}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatScreen;
