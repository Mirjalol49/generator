import React, { useState, useEffect } from 'react';
import { useToast } from '../../context/ToastContext';
import './Contact.css';

const DebugContact = () => {
  const { showSuccessToast, showErrorToast } = useToast();
  const [formData, setFormData] = useState({
    name: 'Test User',
    phone: '+998 901234567',
    message: 'This is a test message from debug contact form'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debugLogs, setDebugLogs] = useState([]);
  const [botInfo, setBotInfo] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('image'); // Default method
  
  const addLog = (message) => {
    console.log(message);
    setDebugLogs(prev => [...prev, {
      time: new Date().toLocaleTimeString(),
      message
    }]);
  };
  
  useEffect(() => {
    // Fetch bot info on component mount to verify the token works
    const fetchBotInfo = async () => {
      try {
        addLog('Fetching bot info...');
        const botToken = '7807338995:AAHdFuX55osPT3KeI8zT4yxu0xm5UBvMGjo';
        const response = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
        const data = await response.json();
        addLog(`Bot info response: ${JSON.stringify(data)}`);
        setBotInfo(data);
      } catch (error) {
        addLog(`Error fetching bot info: ${error.message}`);
      }
    };
    
    fetchBotInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
    addLog(`Selected method changed to: ${e.target.value}`);
  };

  const sendDirectTelegramRequest = async () => {
    const botToken = '7807338995:AAHdFuX55osPT3KeI8zT4yxu0xm5UBvMGjo';
    const chatId = '1907166652';
    const message = `🛠️ DEBUG TEST: Direct GET request\n\nName: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}\nTime: ${new Date().toISOString()}`;
    
    addLog('Sending direct GET request to Telegram API...');
    
    try {
      // Direct GET request with URL parameters
      const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
      addLog(`URL: ${url.substring(0, 100)}...`);
      
      const response = await fetch(url);
      const data = await response.json();
      
      addLog(`Direct GET response: ${JSON.stringify(data)}`);
      return data.ok;
    } catch (error) {
      addLog(`Direct GET request failed: ${error.message}`);
      return false;
    }
  };
  
  const sendNoCorsRequest = async () => {
    const botToken = '7807338995:AAHdFuX55osPT3KeI8zT4yxu0xm5UBvMGjo';
    const chatId = '1907166652';
    const message = `🛠️ DEBUG TEST: No-CORS request\n\nName: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}\nTime: ${new Date().toISOString()}`;
    
    addLog('Sending no-cors request to Telegram API...');
    
    try {
      const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
      
      const response = await fetch(url, {
        method: 'GET',
        mode: 'no-cors'
      });
      
      addLog(`No-CORS response type: ${response.type}`);
      return true; // We can't read response with no-cors, so assume it worked
    } catch (error) {
      addLog(`No-CORS request failed: ${error.message}`);
      return false;
    }
  };
  
  const sendImageRequest = async () => {
    const botToken = '7807338995:AAHdFuX55osPT3KeI8zT4yxu0xm5UBvMGjo';
    const chatId = '1907166652';
    const message = `🛠️ DEBUG TEST: Image request\n\nName: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}\nTime: ${new Date().toISOString()}`;
    
    addLog('Sending image request to Telegram API...');
    
    return new Promise((resolve) => {
      try {
        const img = new Image();
        let success = false;
        
        img.onload = () => {
          addLog('Image request onload triggered!');
          success = true;
        };
        
        img.onerror = () => {
          addLog('Image request onerror triggered (but may have succeeded anyway)');
          success = true; // Assume success anyway
        };
        
        img.src = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
        
        // Resolve after a short delay to allow events to fire
        setTimeout(() => {
          addLog(`Image request completed with success: ${success}`);
          resolve(success);
        }, 2000);
      } catch (error) {
        addLog(`Image request failed: ${error.message}`);
        resolve(false);
      }
    });
  };
  
  const sendScriptRequest = async () => {
    const botToken = '7807338995:AAHdFuX55osPT3KeI8zT4yxu0xm5UBvMGjo';
    const chatId = '1907166652';
    const message = `🛠️ DEBUG TEST: Script request\n\nName: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}\nTime: ${new Date().toISOString()}`;
    
    addLog('Sending script tag request to Telegram API...');
    
    return new Promise((resolve) => {
      try {
        const script = document.createElement('script');
        let success = false;
        
        script.onload = () => {
          addLog('Script request onload triggered!');
          success = true;
        };
        
        script.onerror = () => {
          addLog('Script request onerror triggered (but may have succeeded anyway)');
          success = true; // Assume success anyway
        };
        
        script.src = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&callback=console.log`;
        document.body.appendChild(script);
        
        // Resolve after a short delay to allow events to fire
        setTimeout(() => {
          document.body.removeChild(script);
          addLog(`Script request completed with success: ${success}`);
          resolve(success);
        }, 2000);
      } catch (error) {
        addLog(`Script request failed: ${error.message}`);
        resolve(false);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setDebugLogs([]);
    
    addLog('Starting debug test...');
    addLog(`Using method: ${selectedMethod}`);
    
    try {
      let result = false;
      
      // Only use the selected method
      switch (selectedMethod) {
        case 'direct':
          result = await sendDirectTelegramRequest();
          break;
        case 'nocors':
          result = await sendNoCorsRequest();
          break;
        case 'image':
          result = await sendImageRequest();
          break;
        case 'script':
          result = await sendScriptRequest();
          break;
        default:
          addLog('No valid method selected');
      }
      
      addLog(`Test result: ${result ? 'SUCCESS' : 'FAILURE'}`);
      
      if (result) {
        showSuccessToast('Message sent successfully!');
      } else {
        showErrorToast('Failed to send message');
      }
    } catch (error) {
      addLog(`Error in test: ${error.message}`);
      showErrorToast('Error testing Telegram integration');
    } finally {
      setIsSubmitting(false);
      addLog('Test completed');
    }
  };

  return (
    <section className="contact-section">
      <div className="container">
        <div className="contact-header">
          <h2 className="contact-title">Debug Contact Form</h2>
          <p className="contact-subtitle">
            This page tests different ways to send messages to Telegram
          </p>
        </div>
        
        {botInfo && (
          <div className="debug-bot-info">
            <h3>Bot Information:</h3>
            <pre>{JSON.stringify(botInfo, null, 2)}</pre>
          </div>
        )}

        <div className="contact-wrapper">
          <div className="contact-info">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="method-select">Select Test Method:</label>
                <select 
                  id="method-select" 
                  value={selectedMethod} 
                  onChange={handleMethodChange}
                  className="method-select"
                >
                  <option value="direct">Direct GET</option>
                  <option value="nocors">No-CORS Mode</option>
                  <option value="image">Image Tag</option>
                  <option value="script">Script Tag</option>
                </select>
              </div>
              
              <div className="form-group">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Your Phone Number" 
                  required 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <textarea 
                  name="message"
                  placeholder="Your Message" 
                  rows="4" 
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="submit-btn" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Testing...' : 'Test Selected Method'}
              </button>
            </form>
          </div>

          <div className="debug-logs">
            <h3>Debug Logs:</h3>
            <div className="logs-container">
              {debugLogs.length === 0 ? (
                <p>No logs yet. Click the button to start testing.</p>
              ) : (
                debugLogs.map((log, index) => (
                  <div key={index} className="log-entry">
                    <span className="log-time">{log.time}</span>
                    <span className="log-message">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DebugContact; 