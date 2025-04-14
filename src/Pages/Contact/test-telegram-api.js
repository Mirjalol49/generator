// Simple Node.js script to test sending a message to Telegram
import https from 'https';

// Your Telegram bot token
const botToken = '7807338995:AAHdFuX55osPT3KeI8zT4yxu0xm5UBvMGjo';

// Your chat ID
const chatId = '1907166652';

// Test message
const message = '🧪 Test message from Node.js script: ' + new Date().toISOString();

// Prepare the request options
const postData = JSON.stringify({
  chat_id: chatId,
  text: message
});

const options = {
  hostname: 'api.telegram.org',
  port: 443,
  path: `/bot${botToken}/sendMessage`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('Sending test message to Telegram...');

// Make the request
const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const responseData = JSON.parse(data);
      console.log('Response data:', responseData);
      
      if (responseData.ok) {
        console.log('✅ Message sent successfully!');
      } else {
        console.log('❌ Failed to send message:', responseData.description);
      }
    } catch (e) {
      console.error('Error parsing response:', e);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('Error making request:', e.message);
});

// Write data to request body
req.write(postData);
req.end();

console.log('Request sent, waiting for response...');

// Run this script with:
// node src/Pages/Contact/test-telegram-api.js 