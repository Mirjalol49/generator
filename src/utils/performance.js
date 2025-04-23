import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);  // Cumulative Layout Shift
    getFID(onPerfEntry);  // First Input Delay
    getFCP(onPerfEntry);  // First Contentful Paint
    getLCP(onPerfEntry);  // Largest Contentful Paint
    getTTFB(onPerfEntry); // Time to First Byte
  }
};

// Custom performance monitoring
export const measurePerformance = (metricName) => {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`${metricName}: ${duration}ms`);
    }
    
    // You can also send this to your analytics service
    // analyticsService.logPerformance(metricName, duration);
  };
};

export default reportWebVitals; 