import React from 'react';

const ErrorFallback = () => {
  return (
    <div className="error-container">
      <h1>Something went wrong</h1>
      <p>We're having trouble loading the application. Please try:</p>
      <ul>
        <li>Refreshing the page</li>
        <li>Clearing your browser cache</li>
        <li>Checking your internet connection</li>
      </ul>
      <button onClick={() => window.location.reload()}>
        Refresh Page
      </button>
    </div>
  );
};

export default ErrorFallback; 