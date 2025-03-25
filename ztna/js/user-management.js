import { showToastMessage, setLoadingWithSafety } from './utils.js';
import * as fleetOperations from './fleet-operations.js';

// Load all users in the fleet
export const loadAllUsers = async () => {
  try {
    setLoadingWithSafety(true);
    
    // Get all users
    const userAddresses = await fleetOperations.getFleetUsers(window.app.managedFleet);
    
    // Load user details
    window.fleetAllUsers = [];
    
    for (const userAddress of userAddresses) {
      try {
        const userData = await fleetOperations.getUser(window.app.managedFleet, userAddress);
        
        window.fleetAllUsers.push({
          address: userData.user,
          nickname: userData.nickname,
          email: userData.email,
          avatarURI: userData.avatarURI,
          isAdmin: userData.isAdmin,
          createdAt: new Date(userData.createdAt * 1000),
          active: userData.active
        });
      } catch (error) {
        console.error(`Error loading user ${userAddress}:`, error);
      }
    }
  } catch (error) {
    console.error('Error loading users:', error);
    showToastMessage('Failed to load users: ' + error.message);
  } finally {
    setLoadingWithSafety(false);
  }
};

// Select a user for viewing/editing
export const selectUser = (userAddress) => {
  const user = window.fleetAllUsers.find(u => u.address === userAddress);
  if (user) {
    window.selectedUser = user;
    
    // Copy user data to form
    window.newUserData = {
      address: user.address,
      nickname: user.nickname,
      email: user.email,
      avatarURI: user.avatarURI
    };
    
    window.isUserAdmin = user.isAdmin;
  }
};

// Create a new user
export const createNewUser = async () => {
  try {
    if (!window.isValidAddress(window.newUserData.address)) {
      showToastMessage('Please enter a valid Ethereum address');
      return;
    }
    
    setLoadingWithSafety(true);
    
    await fleetOperations.createUser(
      window.app.managedFleet,
      window.newUserData.address,
      window.newUserData.nickname || '',
      window.newUserData.email || '',
      window.newUserData.avatarURI || ''
    );
    
    // Refresh user list
    await loadAllUsers();
    
    // Reset form
    window.newUserData = { address: '', nickname: '', email: '', avatarURI: '' };
  } catch (error) {
    console.error('Error creating user:', error);
    showToastMessage('Failed to create user: ' + error.message);
  } finally {
    setLoadingWithSafety(false);
  }
};

// Update user details
export const updateUserDetails = async () => {
  try {
    if (!window.selectedUser) {
      showToastMessage('No user selected');
      return;
    }
    
    setLoadingWithSafety(true);
    
    await fleetOperations.updateUser(
      window.app.managedFleet,
      window.selectedUser.address,
      window.newUserData.nickname || '',
      window.newUserData.email || '',
      window.newUserData.avatarURI || ''
    );
    
    // Update user admin status if changed
    if (window.selectedUser.isAdmin !== window.isUserAdmin) {
      await fleetOperations.setUserAdmin(
        window.app.managedFleet,
        window.selectedUser.address,
        window.isUserAdmin
      );
    }
    
    // Refresh user list
    await loadAllUsers();
    
    // Reset selection
    window.selectedUser = null;
    window.newUserData = { address: '', nickname: '', email: '', avatarURI: '' };
  } catch (error) {
    console.error('Error updating user:', error);
    showToastMessage('Failed to update user: ' + error.message);
  } finally {
    setLoadingWithSafety(false);
  }
};

// Remove a user from the system
export const removeUserFromSystem = async () => {
  try {
    if (!window.selectedUser) {
      showToastMessage('No user selected');
      return;
    }
    
    if (!confirm('Are you sure you want to remove this user?')) {
      return;
    }
    
    setLoadingWithSafety(true);
    
    await fleetOperations.removeFleetUser(window.app.managedFleet, window.selectedUser.address);
    
    // Refresh user list
    await loadAllUsers();
    
    // Reset selection
    window.selectedUser = null;
    window.newUserData = { address: '', nickname: '', email: '', avatarURI: '' };
  } catch (error) {
    console.error('Error removing user:', error);
    showToastMessage('Failed to remove user: ' + error.message);
  } finally {
    setLoadingWithSafety(false);
  }
};

// Check if a user is an admin
export const checkIsUserAdmin = async (userAddress) => {
  try {
    return await fleetOperations.isUserAdmin(window.app.managedFleet, userAddress);
  } catch (error) {
    console.error('Error checking if user is admin:', error);
    return false;
  }
}; 