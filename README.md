# React Power Company Website

This is a React-based website for a Power Company, featuring multi-language support, product showcases, and a contact form with Telegram integration.

## Contact Form Telegram Integration

The website includes a contact form that sends submissions directly to Telegram. Here's how to set it up:

### Step 1: Create a Telegram Bot

1. Open Telegram and search for the "BotFather" bot
2. Start a chat with BotFather and send the command `/newbot`
3. Follow the instructions to create a new bot
4. Once created, BotFather will provide you with a token. Save this token, you'll need it later

### Step 2: Get Your Chat ID

1. Start a chat with your newly created bot
2. Start a chat with another bot called "userinfobot" to get your Chat ID
3. The userinfobot will reply with your Chat ID (it's a number, like `123456789`)

### Step 3: Configure the Website

1. Create a `.env` file in the root of the project (copy from `.env.example`)
2. Add the following environment variables:
   ```
   REACT_APP_TELEGRAM_BOT_TOKEN=your_bot_token_here
   REACT_APP_TELEGRAM_CHAT_ID=your_chat_id_here
   ```
3. Replace `your_bot_token_here` with the token from Step 1
4. Replace `your_chat_id_here` with the Chat ID from Step 2

### Step 4: Test the Integration

1. Start the development server with `npm start`
2. Fill out and submit the contact form
3. You should receive the message in Telegram

## Other Features

- Multi-language support (English, Russian, Uzbek)
- Product showcase with detailed product pages
- Responsive design for all devices
- Toast notifications for user feedback

## Available Scripts

In the project directory, you can run:

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

## Learn More

To learn more about React, check out the [React documentation](https://reactjs.org/).
