/**
 * Utility functions for sending messages to Telegram
 */

/**
 * Sends a message to Telegram
 * @param {string} message - The formatted message to send
 * @returns {Promise} - The result of the Telegram API call
 */
export const sendToTelegram = async (message) => {
  try {
    // Get bot token and chat ID from environment variables
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    
    // Validate credentials
    if (!botToken || !chatId) {
      throw new Error("Missing Telegram credentials. Please check your environment variables.");
    }
    
    // Build the API URL
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
    
    // Send the request
    const response = await fetch(url);
    const result = await response.json();
    
    if (!result.ok) {
      throw new Error(result.description || "Failed to send message to Telegram");
    }
    
    return result;
  } catch (error) {
    console.error("Error sending to Telegram:", error);
    throw error;
  }
};

/**
 * Formats a contact form submission for Telegram
 * @param {Object} data - The form data (name, phone, request)
 * @param {string} language - The current language 
 * @returns {string} - Formatted message
 */
export const formatContactMessage = (data, language) => {
  // Clean the phone number
  const cleanPhone = data.phone.replace(/\s+/g, '');

  // Create a formatted message
  return `
New Contact Request:
Name: ${data.name}
Phone: ${cleanPhone}
Request: ${data.request}
Language: ${language}
Time: ${new Date().toLocaleString()}
  `;
}; 