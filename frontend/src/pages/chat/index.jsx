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
  styled,
  keyframes,
  useTheme as useMuiTheme
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

const pulse = keyframes`
  0% { opacity: .5; }
  50% { opacity: 1; }
  100% { opacity: .5; }
`;

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
  const theme = useMuiTheme();

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [activeItem, setActiveItem] = useState('/chat');

  const menuItems = [
    { text: 'Dashboard', icon: <Layout size={22} />, path: '/dashboard' },
    { text: 'Sessions', icon: <Video size={22} />, path: '/sessions' },
    { text: 'Chats', icon: <MessageSquare size={22} />, path: '/chats' },
    { text: 'Calendar', icon: <Calendar size={22} />, path: '/calendar' }
  ];

  const promptSuggestions = [
    "What is bulls eye framework?",
    "Test my understanding"
  ];

  const TypingIndicator = () => (
    <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
      <Paper
        sx={{
          p: 1.5,
          bgcolor: theme.palette.background.paper,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "grey.600",
                animation: `${pulse} 1.5s infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );

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
    setIsBotTyping(true);

    // Handle special quiz cases
    if (message.toLowerCase() === "test my understanding") {
      setTimeout(() => {
        const botMessage = BULLSEYE_FRAMEWORK_QUIZ
        setMessages((prev) => [...prev, botMessage]);
        setIsBotTyping(false);
      }, 1500);
      return;
    }

    if (message.toLowerCase() === "1-b, 2-c, 3-b") {
      setTimeout(() => {
        const botMessage = BULLSEYE_FRAMEWORK_QUIZ_2
        setMessages((prev) => [...prev, botMessage]);
        setIsBotTyping(false);
      }, 1500);
      return;
    }

    // Default API call for other messages
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
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsBotTyping(false);
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
              sx={{
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </StyledListItem>
          ))}
        </List>
      </StyledDrawer>

      {/* Main Chat Area */}
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

        {/* Messages Container */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
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
                    display: "inline-block",
                    p: 1.5,
                    maxWidth: "60%",
                    bgcolor:
                      message.sender === "user" ? "primary.main" : "grey.100",
                    color:
                      message.sender === "user"
                        ? "common.white"
                        : "text.primary",
                    borderRadius: 3,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ lineHeight: 1.4, textAlign: "left" }}
                  >
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      mt: 1,
                      textAlign: "right",
                      opacity: 0.7,
                    }}
                  >
                    {format(new Date(message.timestamp), "PPpp")}
                  </Typography>
                </Paper>
              </Box>
            ))}
            {isBotTyping && <TypingIndicator />}
          </Stack>
        </Box>

        {/* Input Area */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            position: "fixed",
            bottom: 0,
            left: 280,
            right: 0,
            p: 2,
            bgcolor: "background.paper",
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          {/* Prompt Suggestions */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {promptSuggestions.map((prompt, index) => (
              <Chip
                key={index}
                label={prompt}
                onClick={() => handlePromptClick(prompt)}
                sx={{ cursor: 'pointer' }}
                variant="outlined"
              />
            ))}
          </Box>
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
              sx={{ borderRadius: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
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
