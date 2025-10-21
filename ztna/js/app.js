import registryAbi from './registry-abi.js';
import * as wallet from './wallet.js';
import * as fleetOperations from './fleet-operations.js';
import * as registryOperations from './registry-operations.js';
import * as userManagement from './user-management.js';
import * as userGroupManagement from './user-group-management.js';
import * as bnsOperations from './bns-operations.js';
import { DeviceManagementComponent } from './device-management.js';
import { TagManagementComponent } from './tag-management.js';
import { UserManagementComponent } from './user-management.js';
import * as navigation from './navigation.js';
import * as utils from './utils.js';

const { createApp, ref, computed, onMounted } = Vue;

// Create the app instance
const app = createApp({
  setup() {
    // State
    const isConnected = ref(false);
    const userWalletAddress = ref('');
    const account = ref('');
    const ethereum = ref(null);
    const web3 = ref(null);
    const ownFleetCount = ref(0);
    const ownFleets = ref([]);
    const sharedFleets = ref([]);
    const selectedFleet = ref(null);
    const fleetDetails = ref({});
    const perimeterOperators = ref([]);
    const isLoading = ref(false);
    const isLocked = ref(0);
    const isCreatingFleet = ref(false);
    const showingAddUserModal = ref(false);
    const targetFleetForUser = ref(null);
    const newUserAddress = ref('');
    const isAddingUser = ref(false);
    const availableAccounts = ref([]);
    const selectedAccountIndex = ref(0);
    const showPerimeterManagementModal = ref(false);
    const managedFleet = ref('');
    const perimeterUsers = ref([]);
    const newFleetUserAddress = ref('');
    const showToast = ref(false);
    const toastMessage = ref('');
    const newFleetLabel = ref('');
    const fleetLabel = ref('');
    const isUpdatingLabel = ref(false);
    const showNetworkSelector = ref(false);
    const selectedNetworkIndex = ref(0);
    const networks = ref(wallet.networks);
    // New state variables for enhanced fleet management
    const activeTab = ref('users'); // users, devices, userGroups, tags
    
    // User management extended
    const fleetAllUsers = ref([]);
    const selectedUser = ref(null);
    const newUserData = ref({ address: '', nickname: '', email: '', avatarURI: '' });
    
    // User Group management
    const userGroups = ref([]);
    const selectedUserGroup = ref(null);
    const newUserGroupData = ref({ name: '', description: '' });
    const userGroupMembers = ref([]);
    
    // Device management
    const devices = ref([]);
    const selectedDevice = ref(null);
    const newDeviceData = ref({ 
      name: '', 
      description: '', 
      deviceType: '', 
      location: '', 
      properties: {} 
    });
    const deviceTags = ref([]);
    const selectedTagToAdd = ref('');
    const showDeviceTransferModal = ref(false);
    const newDeviceOwner = ref('');
    
    // New state variables for address validation
    const addressValidationState = ref(''); // 'valid', 'invalid', or ''
    const validationTimeout = ref(null);
    
    // Computed properties
    const groupedSharedFleets = computed(() => {
      const grouped = {};
      sharedFleets.value.forEach(fleet => {
        if (!grouped[fleet.owner]) {
          grouped[fleet.owner] = [];
        }
        grouped[fleet.owner].push(fleet);
      });
      return grouped;
    });

    // Handle account changes
    const handleAccountsChanged = async (accounts) => {
      if (accounts.length === 0) {
        isConnected.value = false;
        account.value = '';
        utils.showToastMessage('Please connect to MetaMask.');
      } else if (accounts[0] !== account.value) {
        account.value = accounts[0];
        let userWallet = await wallet.ensureUserWallet();
        userWalletAddress.value = userWallet.address;
        isConnected.value = true;
        await loadUserData();
      }
    };

    // Connect wallet
    const connectWallet = async () => {
      try {
        utils.setLoadingWithSafety(true);

        if (!ethereum.value || !await wallet.getAccount()) {
          return;
        }
  
        
        try {
          // Request accounts
          console.log('Requesting accounts');
          const accounts = await ethereum.value.request({ method: 'eth_requestAccounts' });

          // Check the chain
          const chain = await wallet.getCurrentChain();

          if (!chain) {
            utils.showToastMessage('Please switch to the correct network.');
            await wallet.switchNetwork(0);
            return;
          }

          console.log('Current Chain:', chain);
          selectedNetworkIndex.value = chain.index;

          // Initialize Web3
          web3.value = new Web3(ethereum.value);
          
          // Load user's fleets
          await handleAccountsChanged(accounts);
          
        } catch (walletError) {
          if (walletError.message && walletError.message.includes('MetaMask is not installed')) {
            utils.showToastMessage('MetaMask is not installed. Please install MetaMask to use this application.');
            console.warn('MetaMask is not installed. The application will have limited functionality.');
          } else {
            throw walletError; // Re-throw other errors to be caught by the outer catch block
          }
        }
        
      } catch (error) {
        console.error('Error connecting wallet:', error);
        utils.showToastMessage('Failed to connect wallet: ' + error.message);
      } finally {
        utils.setLoadingWithSafety(false);
      }
    };

    // Load user data (fleets)
    const loadUserData = async () => {
      try {
        console.log('Loading user data');
        if (!isConnected.value) return;
        
        utils.setLoadingWithSafety(true);
        
        // Get available accounts
        availableAccounts.value = await web3.value.eth.getAccounts();
        let userWallet = await wallet.ensureUserWallet();

        // Get own fleet count
        ownFleetCount.value = await registryOperations.getOwnFleetCount();
        console.log('Own fleet count:', ownFleetCount.value);
        
        // Get own fleets
        ownFleets.value = [];
        for (let i = 0; i < ownFleetCount.value; i++) {
          const fleet = await registryOperations.getOwnFleet(i);
          
          // Get fleet label
          let fleetLabel = '';
          try {
            fleetLabel = await fleetOperations.getFleetLabel(fleet.fleet);
          } catch (error) {
            console.warn(`Could not get label for fleet ${fleet.fleet}:`, error);
          }
          
          ownFleets.value.push({
            owner: fleet.owner,
            fleet: fleet.fleet,
            createdAt: new Date(fleet.createdAt * 1000),
            updatedAt: new Date(fleet.updatedAt * 1000),
            label: fleetLabel || ''
          });
        }
        
        // Get shared fleets
        sharedFleets.value = [];
        
        // Get sharing user count
        const sharingUserCount = await registryOperations.getSharingUserCount();
        console.log('Sharing user count:', sharingUserCount);
        
        // Get shared fleets for each sharing user
        for (let i = 0; i < sharingUserCount; i++) {
          const sharingUser = await registryOperations.getSharingUser(i);
          
          const sharedFleetCount = await registryOperations.getSharedFleetCount(sharingUser);
          
          for (let j = 0; j < sharedFleetCount; j++) {
            const fleet = await registryOperations.getSharedFleet(sharingUser, j);
            
            // Get fleet label
            let fleetLabel = '';
            try {
              fleetLabel = await fleetOperations.getFleetLabel(fleet.fleet);
            } catch (error) {
              console.warn(`Could not get label for shared fleet ${fleet.fleet}:`, error);
            }
            
            sharedFleets.value.push({
              owner: fleet.owner,
              fleet: fleet.fleet,
              createdAt: new Date(fleet.createdAt * 1000),
              updatedAt: new Date(fleet.updatedAt * 1000),
              label: fleetLabel || ''
            });
          }
        }
        
      } catch (error) {
        console.error('Error loading user data:', error);
        utils.showToastMessage('Failed to load fleet data: ' + error.message);
      } finally {
        utils.setLoadingWithSafety(false);
      }
    };

    // Switch account
    const switchAccount = async (index) => {
      try {
        if (index >= 0 && index < availableAccounts.value.length) {
          selectedAccountIndex.value = index;
          account.value = availableAccounts.value[index];
          await loadUserData();
        }
      } catch (error) {
        console.error('Error switching account:', error);
        utils.showToastMessage('Failed to switch account: ' + error.message);
      }
    };

    // Switch network
    const switchNetwork = async (index) => {
      console.log('Switching network:', index);
      await wallet.switchNetwork(index);
      selectedNetworkIndex.value = index;
      console.log('Switching network done');
      await connectWallet();
      console.log('Switching network done reload');
    };

    // Change account (MetaMask)
    const changeAccount = async () => {
      try {
        await ethereum.value.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        });
      } catch (error) {
        console.error('Error changing account:', error);
      }
    };

    // Open add user modal
    const openAddUserModal = (fleetAddress) => {
      targetFleetForUser.value = fleetAddress;
      showingAddUserModal.value = true;
      newUserAddress.value = '';
    };

    // Close fleet management modal
    const closePerimeterManagementModal = () => {
      showPerimeterManagementModal.value = false;
      managedFleet.value = '';
      perimeterOperators.value = [];
      newFleetUserAddress.value = '';
    };

    // Manage fleet
    const manageFleet = async (fleetAddress) => {
      try {
        utils.setLoadingWithSafety(true);
        
        managedFleet.value = fleetAddress;
        
        // Get operators
        perimeterOperators.value = [];
        const operatorCount = await registryOperations.getFleetOperatorCount(fleetAddress);
        
        for (let i = 0; i < operatorCount; i++) {
          const operatorAddress = await registryOperations.getFleetOperator(fleetAddress, i);
          perimeterOperators.value.push(operatorAddress);
        }
        
        showPerimeterManagementModal.value = true;
      } catch (error) {
        console.error('Error managing fleet:', error);
        utils.showToastMessage('Failed to load fleet data: ' + error.message);
      } finally {
        utils.setLoadingWithSafety(false);
      }
    };

    // Add fleet user from manager
    const addFleetUserFromManager = async () => {
      try {
        if (!utils.isValidAddress(newFleetUserAddress.value)) {
          utils.showToastMessage('Please enter a valid Ethereum address');
          return;
        }
        
        utils.setLoadingWithSafety(true);
        
        await fleetOperations.addFleetUser(
          managedFleet.value,
          newFleetUserAddress.value
        );
        
        // Refresh fleet users
        perimeterUsers.value.push(newFleetUserAddress.value);
        
        newFleetUserAddress.value = '';
        utils.showToastMessage('User added successfully!');
      } catch (error) {
        console.error('Error adding fleet user:', error);
        utils.showToastMessage('Failed to add user: ' + error.message);
      } finally {
        utils.setLoadingWithSafety(false);
      }
    };

    // Update fleet label
    const updateFleetLabelImpl = async () => {
      try {
        if (!managedFleet.value) {
          utils.showToastMessage('No fleet selected');
          return;
        }

        if (!fleetLabel.value) {
          utils.showToastMessage('Please enter a fleet label');
          return;
        }

        isUpdatingLabel.value = true;
        
        await fleetOperations.updateFleetLabel(managedFleet.value, fleetLabel.value);
        utils.showToastMessage('Fleet label updated successfully!');
      } catch (error) {
        console.error('Error updating fleet label:', error);
        utils.showToastMessage('Failed to update fleet label: ' + error.message);
      } finally {
        isUpdatingLabel.value = false;
      }
    };

    // Initialize
    onMounted(async () => {
      try {
        ethereum.value = await wallet.initializeMetaMask();
        await connectWallet();
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    });

    // Create a new fleet
    const createFleet = async () => {
      try {
        if (!isConnected.value) {
          utils.showToastMessage('Please connect your wallet first');
          return;
        }
        
        isCreatingFleet.value = true;
        const result = await registryOperations.createFleet(newFleetLabel.value);
        console.log('Fleet created:', result);
        await loadUserData();
        utils.showToastMessage('Fleet created successfully!');
        newFleetLabel.value = '';
        navigation.showDashboard();
      } catch (error) {
        console.error('Error creating fleet:', error);
        utils.showToastMessage('Failed to create fleet: ' + error.message);
      } finally {
        isCreatingFleet.value = false;
      }
    };

    // Load user data
    window.loadUserData = () => loadUserData(); 
    window.connectWallet = () => connectWallet();

    // Validate address with debouncing
    const validateAddress = async (address) => {
      if (!address) {
        addressValidationState.value = '';
        return;
      }
      
      // Check if it's a BNS name (contains a dot) or an Ethereum address
      if (address.startsWith('0x') && address.length == 42) {
        addressValidationState.value = 'valid';
      } else {
        let resolvedAddress = await bnsOperations.resolveName(address);
        if (resolvedAddress) {
          addressValidationState.value = 'valid';
        } else {
          addressValidationState.value = 'invalid';
        }
      }
    };

    const debouncedValidateAddress = (event) => {
      if (validationTimeout.value) {
        clearTimeout(validationTimeout.value);
      }
      
      validationTimeout.value = setTimeout(() => {
        validateAddress(event.target.value);
      }, 300); // 300ms debounce
    };

    // Reset validation state when modal is closed
    const closeAddUserModal = () => {
      showingAddUserModal.value = false;
      targetFleetForUser.value = null;
      newUserAddress.value = '';
      isAddingUser.value = false;
      isLoading.value = false;
      addressValidationState.value = '';
      if (validationTimeout.value) {
        clearTimeout(validationTimeout.value);
      }
    };

    // Return all functions and state variables
    return {
      showToastMessage: utils.showToastMessage,
      isConnected,
      userWalletAddress,
      account,
      ownFleetCount,
      ownFleets,
      sharedFleets,
      selectedFleet,
      fleetDetails,
      perimeterOperators,
      isLoading,
      isLocked,
      isCreatingFleet,
      showingAddUserModal,
      newUserAddress,
      isAddingUser,
      groupedSharedFleets,
      availableAccounts,
      selectedAccountIndex,
      showPerimeterManagementModal,
      managedFleet,
      perimeterUsers,
      newFleetUserAddress,
      showToast,
      toastMessage,
      newFleetLabel,
      fleetLabel,
      isUpdatingLabel,
      showNetworkSelector,
      selectedNetworkIndex,
      networks,
      switchNetwork,
      
      // New state variables for enhanced fleet management
      activeTab,
      
      // User management extended
      fleetAllUsers,
      selectedUser,
      newUserData,
      
      // User Group management
      userGroups,
      selectedUserGroup,
      newUserGroupData,
      userGroupMembers,
      
      // Device management
      devices,
      selectedDevice,
      newDeviceData,
      deviceTags,
      selectedTagToAdd,
      showDeviceTransferModal,
      newDeviceOwner,
      
      // Tag management variables removed - now handled by TagManagementComponent
      
      // Methods
      connectWallet,
      createFleet,
      addFleetUser: async (fleetAddress, userAddress) => {
        await fleetOperations.addFleetUser(fleetAddress, userAddress);
        await closeAddUserModal();
        await loadUserData();
      },
      removeFleetUser: fleetOperations.removeFleetUser,
      closePerimeterManagementModal,
      addFleetUserFromManager,
      updateFleetLabel: updateFleetLabelImpl,
      
      // Utility functions
      shortenAddress: utils.shortenAddress,
      formatDate: utils.formatDate,
      isValidAddress: utils.isValidAddress,
      switchAccount,
      changeAccount,
      manageFleet,
           
      // User Group management
      loadUserGroups: userGroupManagement.loadUserGroups,
      selectUserGroup: userGroupManagement.selectUserGroup,
      loadGroupMembers: userGroupManagement.loadGroupMembers,
      createUserGroup: userGroupManagement.createUserGroup,
      updateUserGroup: userGroupManagement.updateUserGroup,
      removeUserGroup: userGroupManagement.removeUserGroup,
      addUserToGroup: userGroupManagement.addUserToGroup,
      removeUserFromGroup: userGroupManagement.removeUserFromGroup,
      
      // Navigation
      activePage: ref('dashboard'),
      showDashboard: navigation.showDashboard,
      showCreateFleetView: navigation.showCreateFleetView,
      showPerimeterManagement: navigation.showPerimeterManagement,
      copyUserWalletAddress: () => {
        navigator.clipboard.writeText(userWalletAddress.value);
        utils.showToastMessage('Copied to clipboard');
      },
      
      // Modal state
      showingAddUserModal,
      targetFleetForUser,
      closeAddUserModal,
      openAddUserModal,
      addressValidationState,
      debouncedValidateAddress
    };
  }
});

// Mount the app
app.component('device-management-component', DeviceManagementComponent);
app.component('tag-management-component', TagManagementComponent);
app.component('user-management-component', UserManagementComponent);
const mountedApp = app.mount('#app');

// Store the app reference in the window object for external access
window.app = mountedApp;
