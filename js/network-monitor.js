// Network Status Monitor for Enhanced Stability
class NetworkMonitor {
  constructor() {
    this.isOnline = navigator.onLine;
    this.statusElement = null;
    this.retryQueue = [];
    this.maxRetries = 3;
    
    this.init();
  }
  
  init() {
    try {
      this.createStatusElement();
      this.setupEventListeners();
      this.monitorConnection();
      console.log('Network monitor initialized');
    } catch (error) {
      console.error('Failed to initialize network monitor:', error);
    }
  }
  
  createStatusElement() {
    this.statusElement = document.createElement('div');
    this.statusElement.className = 'network-status';
    this.statusElement.setAttribute('role', 'status');
    this.statusElement.setAttribute('aria-live', 'polite');
    document.body.appendChild(this.statusElement);
  }
  
  setupEventListeners() {
    window.addEventListener('online', () => {
      this.handleOnline();
    });
    
    window.addEventListener('offline', () => {
      this.handleOffline();
    });
    
    // Monitor fetch failures
    this.interceptFetch();
  }
  
  handleOnline() {
    this.isOnline = true;
    this.showStatus('Back online', 'online');
    this.processRetryQueue();
    
    // Hide status after 3 seconds
    setTimeout(() => {
      this.hideStatus();
    }, 3000);
  }
  
  handleOffline() {
    this.isOnline = false;
    this.showStatus('No internet connection', 'offline');
  }
  
  showStatus(message, type) {
    if (this.statusElement) {
      this.statusElement.textContent = message;
      this.statusElement.className = `network-status ${type} show`;
    }
  }
  
  hideStatus() {
    if (this.statusElement) {
      this.statusElement.classList.remove('show');
    }
  }
  
  // Intercept fetch requests to handle failures
  interceptFetch() {
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        
        if (!response.ok) {
          this.handleFetchError(args[0], response.status);
        }
        
        return response;
      } catch (error) {
        this.handleFetchError(args[0], 'network');
        throw error;
      }
    };
  }
  
  handleFetchError(url, status) {
    console.warn(`Fetch failed for ${url}:`, status);
    
    if (!this.isOnline) {
      this.addToRetryQueue(url);
    }
  }
  
  addToRetryQueue(url) {
    if (!this.retryQueue.find(item => item.url === url)) {
      this.retryQueue.push({
        url,
        attempts: 0,
        timestamp: Date.now()
      });
    }
  }
  
  async processRetryQueue() {
    if (this.retryQueue.length === 0) return;
    
    console.log(`Processing ${this.retryQueue.length} queued requests`);
    
    const queue = [...this.retryQueue];
    this.retryQueue = [];
    
    for (const item of queue) {
      if (item.attempts < this.maxRetries) {
        try {
          await fetch(item.url);
          console.log(`Successfully retried: ${item.url}`);
        } catch (error) {
          item.attempts++;
          if (item.attempts < this.maxRetries) {
            this.retryQueue.push(item);
          } else {
            console.error(`Max retries exceeded for: ${item.url}`);
          }
        }
      }
    }
  }
  
  // Monitor connection quality
  monitorConnection() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      
      const updateConnectionInfo = () => {
        const effectiveType = connection.effectiveType;
        const downlink = connection.downlink;
        
        // Warn about slow connections
        if (effectiveType === 'slow-2g' || effectiveType === '2g') {
          this.showSlowConnectionWarning();
        }
        
        console.log(`Connection: ${effectiveType}, Downlink: ${downlink} Mbps`);
      };
      
      connection.addEventListener('change', updateConnectionInfo);
      updateConnectionInfo();
    }
  }
  
  showSlowConnectionWarning() {
    const warning = document.createElement('div');
    warning.className = 'network-status slow-connection show';
    warning.textContent = 'Slow connection detected';
    warning.setAttribute('role', 'alert');
    
    document.body.appendChild(warning);
    
    setTimeout(() => {
      if (warning.parentNode) {
        warning.parentNode.removeChild(warning);
      }
    }, 5000);
  }
  
  // Public method to check if online
  isConnected() {
    return this.isOnline;
  }
  
  // Public method to retry failed requests
  retryFailedRequests() {
    if (this.isOnline) {
      this.processRetryQueue();
    }
  }
}

// Initialize network monitor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.networkMonitor = new NetworkMonitor();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NetworkMonitor;
}