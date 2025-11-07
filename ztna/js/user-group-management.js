import { showToastMessage, setLoadingWithSafety } from './utils.js';
import * as fleetOperations from './fleet-operations.js';

// Load all user groups in the fleet
export const loadUserGroups = async () => {
  try {
    setLoadingWithSafety(true);
    
    // Get all user groups
    const groupIds = await fleetOperations.getAllUserGroups(window.app.managedFleet);
    
    // Load group details
    window.userGroups = [];
    
    for (const groupId of groupIds) {
      try {
        const groupData = await fleetOperations.getUserGroup(window.app.managedFleet, groupId);
        
        window.userGroups.push({
          id: groupData.id,
          name: groupData.name,
          description: groupData.description,
          createdAt: new Date(Number(groupData.createdAt) * 1000),
          createdBy: groupData.createdBy,
          active: groupData.active
        });
      } catch (error) {
        console.error(`Error loading group ${groupId}:`, error);
      }
    }
  } catch (error) {
    console.error('Error loading user groups:', error);
    showToastMessage('Failed to load user groups: ' + error.message);
  } finally {
    setLoadingWithSafety(false);
  }
};

// Select a user group for viewing/editing
export const selectUserGroup = (groupId) => {
  const group = window.userGroups.find(g => g.id === groupId);
  if (group) {
    window.selectedUserGroup = group;
    
    // Copy group data to form
    window.newUserGroupData = {
      name: group.name,
      description: group.description
    };
    
    // Load group members
    loadGroupMembers(groupId);
  }
};

// Load members of a user group
export const loadGroupMembers = async (groupId) => {
  try {
    setLoadingWithSafety(true);
    
    // Get group members
    const memberAddresses = await fleetOperations.getGroupUsers(window.app.managedFleet, groupId);
    
    // Load member details
    window.userGroupMembers = [];
    
    for (const memberAddress of memberAddresses) {
      try {
        const userData = await fleetOperations.getUser(window.app.managedFleet, memberAddress);
        
        window.userGroupMembers.push({
          address: userData.user,
          nickname: userData.nickname,
          email: userData.email,
          avatarURI: userData.avatarURI,
          isAdmin: userData.isAdmin,
          createdAt: new Date(Number(userData.createdAt) * 1000),
          active: userData.active
        });
      } catch (error) {
        console.error(`Error loading user ${memberAddress}:`, error);
        
        // Add basic info if detailed info fails
        window.userGroupMembers.push({
          address: memberAddress,
          nickname: '',
          email: '',
          avatarURI: '',
          isAdmin: false,
          createdAt: new Date(),
          active: true
        });
      }
    }
  } catch (error) {
    console.error('Error loading group members:', error);
    showToastMessage('Failed to load group members: ' + error.message);
  } finally {
    setLoadingWithSafety(false);
  }
};

// Create a new user group
export const createUserGroup = async () => {
  try {
    if (!window.newUserGroupData.name) {
      showToastMessage('Please enter a group name');
      return;
    }
    
    setLoadingWithSafety(true);
    
    await fleetOperations.createUserGroup(
      window.app.managedFleet,
      window.newUserGroupData.name,
      window.newUserGroupData.description || ''
    );
    
    // Refresh user group list
    await loadUserGroups();
    
    // Reset form
    window.newUserGroupData = { name: '', description: '' };
    
    showToastMessage('User group created successfully!');
  } catch (error) {
    console.error('Error creating user group:', error);
    showToastMessage('Failed to create user group: ' + error.message);
  } finally {
    setLoadingWithSafety(false);
  }
};

// Update user group details
export const updateUserGroup = async () => {
  try {
    if (!window.selectedUserGroup) {
      showToastMessage('No user group selected');
      return;
    }
    
    if (!window.newUserGroupData.name) {
      showToastMessage('Please enter a group name');
      return;
    }
    
    setLoadingWithSafety(true);
    
    await fleetOperations.updateUserGroup(
      window.app.managedFleet,
      window.selectedUserGroup.id,
      window.newUserGroupData.name,
      window.newUserGroupData.description || ''
    );
    
    // Refresh user group list
    await loadUserGroups();
    
    // Reset selection
    window.selectedUserGroup = null;
    window.newUserGroupData = { name: '', description: '' };
    window.userGroupMembers = [];
    
    showToastMessage('User group updated successfully!');
  } catch (error) {
    console.error('Error updating user group:', error);
    showToastMessage('Failed to update user group: ' + error.message);
  } finally {
    setLoadingWithSafety(false);
  }
};

// Remove a user group
export const removeUserGroup = async () => {
  try {
    if (!window.selectedUserGroup) {
      showToastMessage('No user group selected');
      return;
    }
    
    if (!confirm('Are you sure you want to remove this user group?')) {
      return;
    }
    
    setLoadingWithSafety(true);
    
    await fleetOperations.removeUserGroup(window.app.managedFleet, window.selectedUserGroup.id);
    
    // Refresh user group list
    await loadUserGroups();
    
    // Reset selection
    window.selectedUserGroup = null;
    window.newUserGroupData = { name: '', description: '' };
    window.userGroupMembers = [];
    
    showToastMessage('User group removed successfully!');
  } catch (error) {
    console.error('Error removing user group:', error);
    showToastMessage('Failed to remove user group: ' + error.message);
  } finally {
    setLoadingWithSafety(false);
  }
};

// Add a user to a group
export const addUserToGroup = async (userAddress) => {
  try {
    if (!window.selectedUserGroup) {
      showToastMessage('No user group selected');
      return;
    }
    
    if (!window.isValidAddress(userAddress)) {
      showToastMessage('Please enter a valid Ethereum address');
      return;
    }
    
    setLoadingWithSafety(true);
    
    await fleetOperations.addUserToGroup(
      window.app.managedFleet,
      userAddress,
      window.selectedUserGroup.id
    );
    
    // Refresh group members
    await loadGroupMembers(window.selectedUserGroup.id);
    
    showToastMessage('User added to group successfully!');
  } catch (error) {
    console.error('Error adding user to group:', error);
    showToastMessage('Failed to add user to group: ' + error.message);
  } finally {
    setLoadingWithSafety(false);
  }
};

// Remove a user from a group
export const removeUserFromGroup = async (userAddress) => {
  try {
    if (!window.selectedUserGroup) {
      showToastMessage('No user group selected');
      return;
    }
    
    if (!confirm('Are you sure you want to remove this user from the group?')) {
      return;
    }
    
    setLoadingWithSafety(true);
    
    await fleetOperations.removeUserFromGroup(
      window.app.managedFleet,
      userAddress,
      window.selectedUserGroup.id
    );
    
    // Refresh group members
    await loadGroupMembers(window.selectedUserGroup.id);
    
    showToastMessage('User removed from group successfully!');
  } catch (error) {
    console.error('Error removing user from group:', error);
    showToastMessage('Failed to remove user from group: ' + error.message);
  } finally {
    setLoadingWithSafety(false);
  }
}; 