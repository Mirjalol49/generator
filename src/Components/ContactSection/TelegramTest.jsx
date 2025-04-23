import React, { useState } from 'react';

const CreateNewBotInstructions = () => (
  <div style={{ 
    marginTop: '20px', 
    padding: '15px', 
    background: '#e8f5e9', 
    borderRadius: '8px',
    border: '1px solid #a5d6a7'
  }}>
    <h4 style={{ margin: '0 0 10px', color: '#2e7d32' }}>Telegram Bot Configured</h4>
    <p style={{ margin: '0 0 10px' }}>Your Telegram bot is now configured with:</p>
    <ul style={{ paddingLeft: '20px', margin: '0 0 10px' }}>
      <li>Bot Token: <code>8162919561:AAH--wx...E4M</code></li>
      <li>Chat ID: <code>5168537886</code></li>
    </ul>
    <p>For this to work properly:</p>
    <ol style={{ paddingLeft: '20px', margin: '0 0 10px' }}>
      <li>You must have started a chat with your bot in Telegram</li>
      <li>Send <code>/start</code> to your bot to activate it</li>
    </ol>
    <p>Try the test buttons below to check if it's working correctly.</p>
  </div>
);

const TelegramTest = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState('fetch'); // fetch, xhr, form
  const [showInstructions, setShowInstructions] = useState(false);
  
  const clearResults = () => {
    setResult(null);
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };
  
  const sendTestMessage = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      // Get bot token from environment variables
      const botToken = "8162919561:AAH--wxldv0Ynu0eDDUobBavacxWHgy9E4M";
      
      // Your personal chat ID
      const chatId = "5168537886";
      
      // Simple test message
      const message = `🧪 Test message from Contact Form (using ${method})`;
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      
      // Log the URL for debugging
      console.log("Testing with URL:", `${url}?chat_id=${chatId}&text=${encodeURIComponent(message)}`);
      
      let response;
      
      // Different methods for sending the message
      if (method === 'fetch') {
        // Fetch API
        response = await fetch(`${url}?chat_id=${chatId}&text=${encodeURIComponent(message)}`);
        const data = await response.json();
        
        if (data.error_code === 401) {
          throw new Error("Bot token is invalid or has expired. Please check your token.");
        }
        
        setResult({
          success: data.ok === true,
          method: 'fetch',
          status: response.status,
          statusText: response.statusText,
          data
        });
      } 
      else if (method === 'xhr') {
        // XMLHttpRequest
        response = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', `${url}?chat_id=${chatId}&text=${encodeURIComponent(message)}`, true);
          
          xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
              const data = JSON.parse(xhr.responseText);
              if (data.error_code === 401) {
                reject(new Error("Bot token is invalid or has expired. Please check your token."));
                return;
              }
              resolve({
                status: xhr.status,
                statusText: xhr.statusText,
                data
              });
            } else {
              const errorData = xhr.responseText ? JSON.parse(xhr.responseText) : {};
              if (errorData.error_code === 401) {
                reject(new Error("Bot token is invalid or has expired. Please check your token."));
                return;
              }
              reject({
                status: xhr.status,
                statusText: xhr.statusText,
                data: xhr.responseText
              });
            }
          };
          
          xhr.onerror = function() {
            reject({
              status: 0,
              statusText: 'Network Error',
              data: null
            });
          };
          
          xhr.send();
        });
        
        setResult({
          success: response.data.ok === true,
          method: 'xhr',
          status: response.status,
          statusText: response.statusText,
          data: response.data
        });
      }
      else if (method === 'form') {
        // Form submission
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url;
        form.target = '_blank';
        
        // Add chat_id field
        const chatIdField = document.createElement('input');
        chatIdField.type = 'hidden';
        chatIdField.name = 'chat_id';
        chatIdField.value = chatId;
        form.appendChild(chatIdField);
        
        // Add text field
        const textField = document.createElement('input');
        textField.type = 'hidden';
        textField.name = 'text';
        textField.value = message;
        form.appendChild(textField);
        
        // Append form to body and submit
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
        
        setResult({
          success: true,
          method: 'form',
          status: 'unknown',
          statusText: 'Form submitted in new window',
          data: null
        });
      }
    } catch (error) {
      console.error("Error sending test message:", error);
      
      if (error.message && error.message.includes("token is invalid")) {
        setShowInstructions(true);
      }
      
      setResult({
        success: false,
        method,
        status: error.status || 'error',
        statusText: error.statusText || error.message || 'Unknown error',
        data: error.data || null
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{ padding: '20px', marginTop: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h3>Telegram API Test</h3>
      <p>Test sending a message to Telegram using different methods.</p>
      
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={toggleInstructions}
          style={{
            padding: '8px 15px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '10px'
          }}
        >
          {showInstructions ? 'Hide Instructions' : 'View Bot Instructions'}
        </button>
        
        {showInstructions && <CreateNewBotInstructions />}
      </div>
      
      <div style={{ display: 'flex', marginBottom: '15px', gap: '10px' }}>
        {['fetch', 'xhr', 'form'].map(m => (
          <button 
            key={m}
            onClick={() => setMethod(m)}
            style={{
              padding: '8px 15px',
              background: method === m ? '#036aae' : '#e0e0e0',
              color: method === m ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>
      
      <button 
        onClick={sendTestMessage}
        disabled={loading}
        style={{
          padding: '10px 20px',
          background: loading ? '#ccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginRight: '10px'
        }}
      >
        {loading ? 'Sending...' : 'Send Test Message'}
      </button>
      
      <button 
        onClick={clearResults}
        disabled={!result}
        style={{
          padding: '10px 20px',
          background: !result ? '#ccc' : '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: !result ? 'not-allowed' : 'pointer'
        }}
      >
        Clear Result
      </button>
      
      {result && (
        <div style={{ 
          marginTop: '15px', 
          padding: '15px', 
          background: result.success ? '#e8f5e9' : '#ffebee',
          borderRadius: '4px',
          border: `1px solid ${result.success ? '#a5d6a7' : '#ef9a9a'}`
        }}>
          <h4 style={{ margin: '0 0 10px', color: result.success ? '#2e7d32' : '#c62828' }}>
            {result.success ? 'Success!' : 'Error'}
          </h4>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Method:</strong> {result.method.toUpperCase()}
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Status:</strong> {result.status} {result.statusText}
          </div>
          
          {result.data && (
            <div>
              <strong>Response:</strong>
              <pre style={{ 
                margin: '5px 0 0',
                padding: '10px', 
                background: '#f5f5f5', 
                borderRadius: '4px',
                overflow: 'auto',
                maxHeight: '150px',
                fontSize: '0.9rem'
              }}>
                {typeof result.data === 'object' ? JSON.stringify(result.data, null, 2) : result.data}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TelegramTest; 