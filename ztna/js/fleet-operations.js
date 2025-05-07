// Fleet operations for the Perimeter Manager application
import * as wallet from './wallet.js';
import fleetContractAbi from './perimeter-abi.js';
import * as bnsOperations from './bns-operations.js';

// Helper function for sending transactions
async function doSend(fleetAddress, method, args, successMessage) {
  return await wallet.send(fleetContractAbi, fleetAddress, method, args, successMessage);
}

// Helper function for calling view methods
async function doCall(fleetAddress, method, args) {
  return await wallet.call(fleetContractAbi, fleetAddress, method, args);
}

// Update fleet label
export async function updateFleetLabel(fleetAddress, label) {
  return doSend(fleetAddress, 'updateLabel', [label], 'Fleet label updated successfully!');
}

// Get users of a fleet
export async function getOperator(fleetAddress) {
  return doCall(fleetAddress, 'operator', []);
}

// Get users of a fleet
export async function getPerimeterUsers(fleetAddress) {
  return doCall(fleetAddress, 'getAllUsers', []);
}

// Add a user to a fleet
export async function addFleetUser(fleetAddress, userAddress, nickname = '', email = '', avatarURI = '') {
  // Check if user is an address or a BNS name
  if (userAddress.includes('.') || !userAddress.startsWith('0x')) {
    // It's a BNS name, resolve it to an address
    const resolvedAddress = await bnsOperations.resolveName(userAddress);
    if (!resolvedAddress) {
      throw new Error('Invalid BNS name');
    }
    userAddress = resolvedAddress;
  }

  return doSend(
    fleetAddress, 
    'createUser', 
    [userAddress, nickname, email, avatarURI], 
    'User added to fleet successfully!'
  );
}

// Remove a user from a fleet
export async function removeFleetUser(fleetAddress, userAddress) {
  return doSend(fleetAddress, 'removeUser', [userAddress], 'User removed from fleet successfully!');
}

// Get details for a specific user
export async function getUser(fleetAddress, userAddress) {
  return doCall(fleetAddress, 'getUser', [userAddress]);
}

// Create a new user
export async function createUser(fleetAddress, address, nickname, email, avatarURI) {
  return doSend(fleetAddress, 'createUser', [address, nickname, email, avatarURI], 'User created successfully!');
}

// Update user details
export async function updateUser(fleetAddress, address, nickname, email, avatarURI) {
  return doSend(fleetAddress, 'updateUser', [address, nickname, email, avatarURI], 'User updated successfully!');
}

// Set user admin status
export async function setUserAdmin(fleetAddress, userAddress, isAdmin) {
  return doSend(fleetAddress, 'setUserAdmin', [userAddress, isAdmin], 'User admin status updated successfully!');
}

// Check if a user is an admin
export async function isUserAdmin(fleetAddress, userAddress) {
  return await doCall(fleetAddress, 'isUserAdmin', [userAddress]);
}

// Get all tags in a fleet
export async function getAllTags(fleetAddress) {
  return doCall(fleetAddress, 'getAllTags', []);
}

// Get specific tag details
export async function getTag(fleetAddress, tagId) {
  return doCall(fleetAddress, 'getTag', [tagId]);
}

// Get devices for a specific tag
export async function getTagDevices(fleetAddress, tagId) {
  return doCall(fleetAddress, 'getTagDevices', [tagId]);
}

// Get device details
export async function getDevice(fleetAddress, deviceId) {
  return doCall(fleetAddress, 'getDevice', [deviceId]);
}

// Create a new tag
export async function createTag(fleetAddress, name, description, color) {
  return doSend(fleetAddress, 'createTag', [name, description, color], 'Tag created successfully!');
}

// Update tag details
export async function updateTag(fleetAddress, tagId, name, description, color) {
  return doSend(fleetAddress, 'updateTag', [tagId, name, description, color], 'Tag updated successfully!');
}

// Set tag property
export async function setTagProperty(fleetAddress, tagId, key, value) {
  return doSend(fleetAddress, 'setTagProperty', [tagId, key, value], 'Tag property set successfully!');
}

// Remove a tag
export async function removeTag(fleetAddress, tagId) {
  return doSend(fleetAddress, 'removeTag', [tagId], 'Tag removed successfully!');
}

// Remove device from tag
export async function removeDeviceFromTag(fleetAddress, deviceId, tagId) {
  return doSend(fleetAddress, 'removeDeviceFromTag', [deviceId, tagId], 'Device removed from tag successfully!');
}

// Get all user groups in the fleet
export async function getAllUserGroups(fleetAddress) {
  return doCall(fleetAddress, 'getAllUserGroups', []);
}

// Get specific user group details
export async function getUserGroup(fleetAddress, groupId) {
  return doCall(fleetAddress, 'getUserGroup', [groupId]);
}

// Get users in a group
export async function getGroupUsers(fleetAddress, groupId) {
  return doCall(fleetAddress, 'getGroupUsers', [groupId]);
}

// Create a user group
export async function createUserGroup(fleetAddress, name, description) {
  return doSend(fleetAddress, 'createUserGroup', [name, description], 'User group created successfully!');
}

// Update a user group
export async function updateUserGroup(fleetAddress, groupId, name, description) {
  return doSend(fleetAddress, 'updateUserGroup', [groupId, name, description], 'User group updated successfully!');
}

// Remove a user group
export async function removeUserGroup(fleetAddress, groupId) {
  return doSend(fleetAddress, 'removeUserGroup', [groupId], 'User group removed successfully!');
}

// Add user to group
export async function addUserToGroup(fleetAddress, userAddress, groupId) {
  return doSend(fleetAddress, 'addUserToGroup', [userAddress, groupId], 'User added to group successfully!');
}

// Remove user from group
export async function removeUserFromGroup(fleetAddress, userAddress, groupId) {
  return doSend(fleetAddress, 'removeUserFromGroup', [userAddress, groupId], 'User removed from group successfully!');
}

// Get all devices in the fleet
export async function getAllDevices(fleetAddress) {
  return doCall(fleetAddress, 'getAllDevices', []);
}

// Get device tags
export async function getDeviceTags(fleetAddress, deviceId) {
  return doCall(fleetAddress, 'getDeviceTags', [deviceId]);
}

// Create device
export async function createDevice(fleetAddress, deviceId, name, description, deviceType, location) {
  return doSend(fleetAddress, 'createDevice', [deviceId, name, description, deviceType, location], 'Device created successfully!');
}

// Update device
export async function updateDevice(fleetAddress, deviceId, name, description, deviceType, location) {
  return doSend(fleetAddress, 'updateDevice', [deviceId, name, description, deviceType, location], 'Device updated successfully!');
}

// Set device property
export async function setDeviceProperty(fleetAddress, deviceId, key, value) {
  return doSend(fleetAddress, 'setDeviceProperty', [deviceId, key, value], 'Device property set successfully!');
}

// Get device property
export async function getDeviceProperty(fleetAddress, deviceId, key) {
  return doCall(fleetAddress, 'getDeviceProperty', [deviceId, key]);
}

// Update device last seen
export async function updateDeviceLastSeen(fleetAddress, deviceId) {
  return doSend(fleetAddress, 'updateDeviceLastSeen', [deviceId], 'Device last seen updated successfully!');
}

// Transfer device ownership
export async function transferDeviceOwnership(fleetAddress, deviceId, newOwner) {
  return doSend(fleetAddress, 'transferDeviceOwnership', [deviceId, newOwner], 'Device ownership transferred successfully!');
}

// Remove device
export async function removeDevice(fleetAddress, deviceId) {
  return doSend(fleetAddress, 'removeDevice', [deviceId], 'Device removed successfully!');
}

// Add device to tag
export async function addDeviceToTag(fleetAddress, deviceId, tagId) {
  return doSend(fleetAddress, 'addDeviceToTag', [deviceId, tagId], 'Tag added to device successfully!');
}

// Get fleet label
export async function getFleetLabel(fleetAddress) {
  return doCall(fleetAddress, 'label', []);
}
