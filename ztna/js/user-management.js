// User management operations for the Perimeter Manager application
import { showToastMessage, setLoadingWithSafety } from './utils.js';
import * as fleetOperations from './fleet-operations.js';
import * as bnsOperations from './bns-operations.js';
// User Management Component
export const UserManagementComponent = {
  props: {
    managedFleet: {
      type: String,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      users: [],
      operator: null,
      selectedUser: null,
      newUserData: {
        address: '',
        nickname: '',
        email: '',
        avatarURI: ''
      },
      showAddUserModal: false,
      showEditUserModal: false,
      addressValidationState: '',
      validationTimeout: null
    }
  },

  template: `
    <div>
      <!-- Header with Add User Button -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">Users</h3>
        <button 
          @click="showAddUserModal = true" 
          class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
          Add User
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-4 text-gray-500">
        <p>Loading users...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="users.length === 0" class="text-center py-4 text-gray-500">
        <p>No users found in this perimeter.</p>
      </div>

      <!-- User List -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Address</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nickname</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.address">
              <td class="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">{{ user.address }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.nickname }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button 
                  @click="editUserDialog(user.address)" 
                  class="text-blue-600 hover:text-blue-900">
                  Edit
                </button>
                <button 
                  @click="removeUser(user.address)" 
                  class="text-red-600 hover:text-red-900">
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add User Modal -->
      <div v-if="showAddUserModal" class="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
        <div class="fixed inset-0 bg-black opacity-50"></div>
        <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800">Add User to Perimeter</h3>
          </div>
          
          <div class="p-6">
            <form @submit.prevent="addUser">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">User Address or BNS name</label>
                  <div class="relative">
                    <input 
                      type="text" 
                      v-model="newUserData.address"
                      @input="debouncedValidateAddress"
                      class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                      :class="{
                        'border-red-300 focus:border-red-500 focus:ring-red-500': addressValidationState === 'invalid',
                        'border-green-300 focus:border-green-500 focus:ring-green-500': addressValidationState === 'valid'
                      }"
                      placeholder="0x...">
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg v-if="addressValidationState === 'valid'" class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      <svg v-if="addressValidationState === 'invalid'" class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p v-if="addressValidationState === 'invalid'" class="mt-1 text-sm text-red-600">
                    Please enter a valid Ethereum address or BNS name
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Nickname (Optional)</label>
                  <input type="text" v-model="newUserData.nickname" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Email (Optional)</label>
                  <input type="email" v-model="newUserData.email" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Avatar URI (Optional)</label>
                  <input type="text" v-model="newUserData.avatarURI" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                </div>
              </div>
              
              <div class="mt-6 flex justify-end space-x-2">
                <button type="button" @click="closeAddUserModal" 
                  class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
                  Cancel
                </button>
                <button type="submit" 
                  class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  :disabled="addressValidationState !== 'valid'">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Edit User Modal -->
      <div v-if="showEditUserModal && selectedUser" class="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
        <div class="fixed inset-0 bg-black opacity-50"></div>
        <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800">Edit User</h3>
          </div>
          
          <div class="p-6">
            <form @submit.prevent="updateUser">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">User Address</label>
                  <input type="text" :value="selectedUser.address" disabled
                    class="mt-1 block w-full bg-gray-100 rounded-md border-gray-300 shadow-sm text-gray-600">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Nickname</label>
                  <input type="text" v-model="newUserData.nickname" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" v-model="newUserData.email" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Avatar URI</label>
                  <input type="text" v-model="newUserData.avatarURI" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                </div>
              </div>
              
              <div class="mt-6 flex justify-end space-x-2">
                <button type="button" @click="showEditUserModal = false" 
                  class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
                  Cancel
                </button>
                <button type="submit" 
                  class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,

  methods: {
    showToastMessage,

    async loadUsers() {
      try {
        setLoadingWithSafety(true);
        
        this.operator = await fleetOperations.getOperator(this.managedFleet);
        console.log('operator', this.operator);
        let userAddresses = await fleetOperations.getPerimeterUsers(this.managedFleet);
        console.log('userAddresses', userAddresses);
        // Filter out duplicate addresses
        userAddresses = [...new Set(userAddresses)];
        this.users = [];
        
        for (const address of userAddresses) {
          try {
            const userData = await fleetOperations.getUser(this.managedFleet, address);
            
            if (userData.active)
            this.users.push({
              address: address,
              nickname: userData.nickname || '',
              email: userData.email || '',
              avatarURI: userData.avatarURI || '',
              isAdmin: userData.isAdmin || false
            });
          } catch (error) {
            console.error(`Error loading user ${address}:`, error);
            this.users.push({
              address: address,
              nickname: '',
              email: '',
              avatarURI: '',
              isAdmin: false
            });
          }
        }
      } catch (error) {
        console.error('Error loading users:', error);
        this.showToastMessage('Failed to load users: ' + error.message);
      } finally {
        setLoadingWithSafety(false);
      }
    },

    async validateAddress(address) {
      if (!address) {
        this.addressValidationState = '';
        return;
      }
      
      // Check if it's a BNS name (contains a dot) or an Ethereum address
      if (address.startsWith('0x') && address.length == 42) {
        this.addressValidationState = 'valid';
      } else {
        try {
          const resolvedAddress = await bnsOperations.resolveName(address);
          console.log('resolvedAddress', address, resolvedAddress);
          if (resolvedAddress) {
            this.addressValidationState = 'valid';
          } else {
            this.addressValidationState = 'invalid';
          }
        } catch (error) {
          console.error('Error resolving address:', error);
          this.addressValidationState = 'invalid';
        }
      }
    },

    debouncedValidateAddress(event) {
      if (this.validationTimeout) {
        clearTimeout(this.validationTimeout);
      }
      
      this.validationTimeout = setTimeout(() => {
        this.validateAddress(event.target.value);
      }, 300); // 300ms debounce
    },

    closeAddUserModal() {
      this.showAddUserModal = false;
      this.newUserData = {
        address: '',
        nickname: '',
        email: '',
        avatarURI: ''
      };
      this.addressValidationState = '';
      if (this.validationTimeout) {
        clearTimeout(this.validationTimeout);
      }
    },

    async addUser() {
      try {
        if (this.addressValidationState !== 'valid') {
          this.showToastMessage('Please enter a valid Ethereum address or BNS name');
          return;
        }
        
        setLoadingWithSafety(true);

        // Set nickname to address if it's a BNS name and nickname is empty
        if (!this.newUserData.address.startsWith('0x') && this.newUserData.nickname == '') {
          this.newUserData.nickname = this.newUserData.address;
        }
        
        await fleetOperations.addFleetUser(
          this.managedFleet,
          this.newUserData.address,
          this.newUserData.nickname,
          this.newUserData.email,
          this.newUserData.avatarURI
        );
        
        await this.loadUsers();
        this.closeAddUserModal();
        this.showToastMessage('User added successfully!');
      } catch (error) {
        console.error('Error adding user:', error);
        this.showToastMessage('Failed to add user: ' + error.message);
      } finally {
        setLoadingWithSafety(false);
      }
    },

    editUserDialog(address) {
      const user = this.users.find(u => u.address === address);
      if (user) {
        this.selectedUser = user;
        this.newUserData = {
          address: user.address,
          nickname: user.nickname,
          email: user.email,
          avatarURI: user.avatarURI
        };
        this.showEditUserModal = true;
      }
    },

    async updateUser() {
      try {
        if (!this.selectedUser) {
          this.showToastMessage('No user selected');
          return;
        }
        
        setLoadingWithSafety(true);
        
        await fleetOperations.updateUser(
          this.managedFleet,
          this.selectedUser.address,
          this.newUserData.nickname,
          this.newUserData.email,
          this.newUserData.avatarURI
        );
        
        await this.loadUsers();
        this.showEditUserModal = false;
        this.showToastMessage('User updated successfully!');
      } catch (error) {
        console.error('Error updating user:', error);
        this.showToastMessage('Failed to update user: ' + error.message);
      } finally {
        setLoadingWithSafety(false);
      }
    },

    async removeUser(address) {
      try {
        if (!confirm('Are you sure you want to remove this user? (' + address + ')')) {
          return;
        }
        
        setLoadingWithSafety(true);
        
        await fleetOperations.removeFleetUser(this.managedFleet, address);
        await this.loadUsers();
        
        this.showToastMessage('User removed successfully!');
      } catch (error) {
        console.error('Error removing user:', error);
        this.showToastMessage('Failed to remove user: ' + error.message);
      } finally {
        setLoadingWithSafety(false);
      }
    }
  },

  mounted() {
    this.loadUsers();
  }
};
