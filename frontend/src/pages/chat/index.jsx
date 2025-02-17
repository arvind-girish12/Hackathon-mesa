import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
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
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SendIcon from "@mui/icons-material/Send";

const ChatScreen = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Sessions", icon: <VideoCallIcon />, path: "/sessions" },
    { text: "Chats", icon: <ChatIcon />, path: "/chats" },
    { text: "Calendar", icon: <CalendarMonthIcon />, path: "/calendar" },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    try {
      const response = await fetch("http://127.0.0.1:5000/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: inputMessage }),
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
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" align="left">
            Chat with Jarvis
          </Typography>
        </Toolbar>
      </AppBar>

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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          marginTop: "64px",
          p: 3,
          pb: 10,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            mb: 2,
          }}
        >
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
                      message.sender === "user" ? "primary.main" : "grey.100",
                    color: message.sender === "user" ? "white" : "text.primary",
                  }}
                >
                  <Typography variant="body1" align="left">
                    {message.text}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            position: "fixed",
            bottom: 0,
            left: 240,
            right: 0,
            p: 3,
            backgroundColor: "background.default",
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
