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
  AppBar,
  Toolbar,
  Stack,
  Paper,
  CircularProgress,
  Chip,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import ChatIcon from "@mui/icons-material/Chat";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SendIcon from "@mui/icons-material/Send";
import { BULLSEYE_FRAMEWORK_QUIZ, BULLSEYE_FRAMEWORK_QUIZ_2 } from "./constant";

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

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Sessions", icon: <VideoCallIcon />, path: "/sessions" },
    { text: "Chats", icon: <ChatIcon />, path: "/chats" },
    { text: "Calendar", icon: <CalendarMonthIcon />, path: "/calendar" },
  ];

  const defaultPrompts = [
    "What is Bulls eye framework",
    "Test my understanding"
  ];

  const handleMenuClick = (path) => {
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
      {/* AppBar */}
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Chat with Jarvis
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            marginTop: "64px",
          },
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleMenuClick(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          marginTop: "64px",
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
            left: 240,
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
