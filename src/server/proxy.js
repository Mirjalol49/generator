// This is a simple Express server that acts as a proxy for Telegram API requests
// Install required packages: npm install express cors axios
// Run this server with: node src/server/proxy.js

import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { createServer } from 'http';

const app = express();
const PORT = 3001;

// Enable CORS
app.use(cors());
app.use(express.json());

// Route for sending messages to Telegram
app.post('/send-telegram', async (req, res) => {
  try {
    const { botToken, chatId, message } = req.body;
    
    if (!botToken || !chatId || !message) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Missing required parameters: botToken, chatId, or message' 
      });
    }
    
    console.log('Received request to send Telegram message:', {
      chatId,
      message: message.substring(0, 50) + (message.length > 50 ? '...' : '')
    });
    
    // Forward the request to Telegram API
    const response = await axios.post(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Telegram API response:', response.data);
    
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error forwarding request to Telegram:', error);
    
    // Send detailed error information
    return res.status(500).json({
      ok: false,
      error: error.message,
      details: error.response ? error.response.data : null
    });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Proxy server is running' });
});

// Create HTTP server
const server = createServer(app);

// Start the server
server.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Use /send-telegram endpoint to send messages to Telegram`);
  console.log(`Use /health endpoint to check if the server is running`);
});

// Handle server shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server has been gracefully terminated');
    process.exit(0);
  });
}); 