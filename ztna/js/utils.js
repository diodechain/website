// Utility functions for the application

/**
 * Shortens an Ethereum address for display
 * @param {string} address - The full Ethereum address
 * @param {number} chars - Number of characters to show at start and end
 * @returns {string} Shortened address with ellipsis
 */
export function shortenAddress(address, chars = 6) {
  if (!address) return '';
  return `${address.substring(0, chars)}...${address.substring(address.length - 4)}`;
}

/**
 * Formats a Unix timestamp to a readable date
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {string} Formatted date string
 */
export function formatDate(timestamp) {
  if (!timestamp) return 'N/A';

  if (typeof timestamp === 'object') {
    return timestamp.toLocaleString();
  }

  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}

/**
 * Shows a toast notification
 * @param {Object} app - Vue app instance
 * @param {string} message - Message to display
 * @param {number} duration - Duration in milliseconds
 */
export function showToast(app, message, duration = 3000) {
  app.toastMessage = message;
  app.showToast = true;
  
  setTimeout(() => {
    app.showToast = false;
  }, duration);
}

/**
 * Shows a toast notification using the global app instance
 * @param {string} message - Message to display
 * @param {number} duration - Duration in milliseconds
 */
export function showToastMessage(message, duration = 3000) {
  if (window.app) {
    showToast(window.app, message, duration);
  } else {
    console.warn('Toast message could not be displayed: app instance not available', message);
  }
}

/**
 * Handles errors from contract interactions
 * @param {Object} app - Vue app instance
 * @param {Error} error - Error object
 */
export function handleError(app, error) {
  console.error('Error:', error);
  let message = 'An error occurred. Please try again.';
  
  if (error.message) {
    // Extract the error message from the error object
    if (error.message.includes('User denied transaction')) {
      message = 'Transaction was rejected by the user.';
    } else if (error.message.includes('execution reverted')) {
      // Try to extract the revert reason
      const revertReason = error.message.match(/reason="(.*?)"/);
      if (revertReason && revertReason[1]) {
        message = `Transaction failed: ${revertReason[1]}`;
      } else {
        message = 'Transaction failed on the blockchain.';
      }
    }
  }
  
  showToast(app, message, 5000);
}

// Add a safety timeout for isLoading
export const setLoadingWithSafety = (isLoadingState) => {
  console.log(`🛡️ setLoadingWithSafety: Setting isLoading = ${isLoadingState}`);
  window.app.isLoading = isLoadingState;
  
  // If we're turning on loading, set a safety timeout
  if (isLoadingState) {
    console.log('🛡️ setLoadingWithSafety: Setting safety timeout for 30 seconds');
    setTimeout(() => {
      if (window.app.isLoading) {
        console.warn('🛡️ setLoadingWithSafety: Safety timeout triggered! Force resetting isLoading = false');
        window.app.isLoading = false;
        showToastMessage('Loading timed out. Please try again.', 5000);
      }
    }, 120000); // 2 minutes timeout
  }
};

// Format a date for display
export const formatDateForDisplay = (date) => {
  if (!date) return '';
  
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return new Date(date).toLocaleDateString(undefined, options);
};

// Check if an address is a valid Ethereum address
export const isValidAddress = (address) => {
  if (!address) return false;
  
  // Basic validation - starts with 0x and has 42 characters
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}; 

// Lock display of the UI until the user interacts with MetaMask
export const lockUI = () => {
  window.app.isLocked++;
};

// Unlock the UI
export const unlockUI = () => {
  window.app.isLocked--;
};