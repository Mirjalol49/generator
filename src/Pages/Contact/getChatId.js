// This is a script to help you get your chat ID
// Simply run this script with Node.js after setting your bot token
// Then send any message to your bot, and it will log your chat ID

import https from 'https';

// Your bot token
const botToken = '7807338995:AAHdFuX55osPT3KeI8zT4yxu0xm5UBvMGjo';

// URL for getting updates from the bot
const url = `https://api.telegram.org/bot${botToken}/getUpdates`;

// Make a GET request to the Telegram API
https.get(url, (res) => {
  let data = '';

  // A chunk of data has been received
  res.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received
  res.on('end', () => {
    const response = JSON.parse(data);
    
    if (response.ok && response.result.length > 0) {
      // Extract chat IDs from all updates
      const chatIds = response.result.map(update => {
        if (update.message) {
          return {
            chatId: update.message.chat.id,
            username: update.message.chat.username || 'No username',
            firstName: update.message.chat.first_name || 'No first name',
            lastName: update.message.chat.last_name || 'No last name'
          };
        }
        return null;
      }).filter(Boolean);
      
      console.log('Found the following chat IDs:');
      chatIds.forEach((chat, index) => {
        console.log(`${index + 1}. Chat ID: ${chat.chatId} (${chat.firstName} ${chat.lastName} - @${chat.username})`);
      });
      
      console.log('\nUse one of these chat IDs in your Contact.jsx component.');
    } else {
      console.log('No updates found or error in response.');
      console.log('Make sure you have sent at least one message to your bot.');
      console.log('Response:', response);
    }
  });
}).on('error', (err) => {
  console.log('Error: ', err.message);
});

// Instructions:
// 1. Save this file
// 2. Run it with Node.js: node src/Pages/Contact/getChatId.js
// 3. Send a message to your bot (@hikenpower_bot)
// 4. Run the script again to see your chat ID
// 5. Use that chat ID in your Contact.jsx component 