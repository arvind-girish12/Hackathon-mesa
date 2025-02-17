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
  keyframes,
  useTheme,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";

import ChatIcon from "@mui/icons-material/Chat";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SendIcon from "@mui/icons-material/Send";
import { BULLSEYE_FRAMEWORK_QUIZ, BULLSEYE_FRAMEWORK_QUIZ_2 } from "./constant";

const pulse = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

const ChatScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Sessions", icon: <VideoCallIcon />, path: "/sessions" },
    { text: "Chats", icon: <ChatIcon />, path: "/chats" },
    { text: "Calendar", icon: <CalendarMonthIcon />, path: "/calendar" },
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
    <Box
      sx={{
        display: "flex",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      {/* Top App Bar */}
      <AppBar position="fixed" elevation={1}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Chat with Jarvis
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            mt: "64px", // offset for AppBar
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleMenuClick(item.path)}
              sx={{
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <ListItemIcon sx={{ color: "text.secondary" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Chat Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          mt: "64px", // offset for AppBar
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
                    sx={{ lineHeight: 1.4, textAlign: "left" }} // <--- Left aligned
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
            gap: 1,
            position: "fixed",
            bottom: 0,
            left: 240,
            right: 0,
            p: 2,
            bgcolor: "background.paper",
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
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
  );
};

export default ChatScreen;
