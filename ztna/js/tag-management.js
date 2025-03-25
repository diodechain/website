import { showToastMessage, setLoadingWithSafety } from './utils.js';
import * as fleetOperations from './fleet-operations.js';

// Tag Management Component
export const TagManagementComponent = {
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
      tags: [],
      selectedTag: null,
      newTagData: {
        name: '',
        description: '',
        color: '#3B82F6',
        properties: {}
      },
      tagDevices: [],
      showCreateTagModal: false
    }
  },

  template: `
    <div>
      <!-- Header with Create Tag Button -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">Tags</h3>
        <button 
          @click="showCreateTagModal = true" 
          class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
          Create Tag
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-4 text-gray-500">
        <p>Loading tags...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="tags.length === 0" class="text-center py-4 text-gray-500">
        <p>No tags found in this fleet.</p>
      </div>

      <!-- Tag List -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="tag in tags" :key="tag.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ tag.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ tag.description }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-6 w-6 rounded-full" :style="{ backgroundColor: tag.color }"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(tag.createdAt) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button 
                  @click="selectTagForEdit(tag.id)" 
                  class="text-blue-600 hover:text-blue-900">
                  Edit
                </button>
                <button 
                  @click="removeTagAction(tag.id)" 
                  class="text-red-600 hover:text-red-900">
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Create Tag Modal -->
      <div v-if="showCreateTagModal" class="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
        <div class="fixed inset-0 bg-black opacity-50"></div>
        <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800">Create New Tag</h3>
          </div>
          
          <div class="p-6">
            <form @submit.prevent="createNewTag">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" v-model="newTagData.name" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Description</label>
                  <textarea v-model="newTagData.description" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Color</label>
                  <input type="color" v-model="newTagData.color" 
                    class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                </div>
              </div>
              
              <div class="mt-6 flex justify-end space-x-2">
                <button type="button" @click="showCreateTagModal = false" 
                  class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
                  Cancel
                </button>
                <button type="submit" 
                  class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Create Tag
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Edit Tag Modal -->
      <div v-if="selectedTag" class="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
        <div class="fixed inset-0 bg-black opacity-50"></div>
        <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800">Edit Tag</h3>
          </div>
          
          <div class="p-6">
            <form @submit.prevent="updateTagAction">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" v-model="newTagData.name" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Description</label>
                  <textarea v-model="newTagData.description" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Color</label>
                  <input type="color" v-model="newTagData.color" 
                    class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                </div>
              </div>
              
              <!-- Associated Devices -->
              <div class="mt-6">
                <h4 class="font-medium text-gray-700 mb-2">Associated Devices</h4>
                <div v-if="tagDevices.length === 0" class="text-sm text-gray-500">
                  No devices associated with this tag.
                </div>
                <div v-else class="max-h-40 overflow-y-auto border rounded-md">
                  <table class="min-w-full divide-y divide-gray-200">
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="device in tagDevices" :key="device.id" class="hover:bg-gray-50">
                        <td class="px-4 py-2 text-sm">{{ device.name }}</td>
                        <td class="px-4 py-2 text-right">
                          <button 
                            @click="removeDeviceFromTagAction(device.id)" 
                            class="text-xs text-red-600 hover:text-red-900">
                            Remove
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div class="mt-6 flex justify-end space-x-2">
                <button type="button" @click="selectedTag = null" 
                  class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
                  Cancel
                </button>
                <button type="submit" 
                  class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Update Tag
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString();
    },

    async loadTags() {
      try {
        setLoadingWithSafety(true);
        
        // Get all tags
        const tagIds = await fleetOperations.getAllTags(this.managedFleet);
        this.tags = [];
        
        for (const tagId of tagIds) {
          try {
            const tagData = await fleetOperations.getTag(this.managedFleet, tagId);
            
            this.tags.push({
              id: tagData.id,
              name: tagData.name,
              description: tagData.description,
              color: tagData.color,
              createdAt: new Date(tagData.createdAt * 1000),
              createdBy: tagData.createdBy,
              active: tagData.active
            });
          } catch (error) {
            console.error(`Error loading tag ${tagId}:`, error);
          }
        }
      } catch (error) {
        console.error('Error loading tags:', error);
        showToastMessage('Failed to load tags: ' + error.message);
      } finally {
        setLoadingWithSafety(false);
      }
    },

    async selectTagForEdit(tagId) {
      const tag = this.tags.find(t => t.id === tagId);
      if (tag) {
        this.selectedTag = tag;
        
        // Copy tag data to form
        this.newTagData = {
          name: tag.name,
          description: tag.description,
          color: tag.color,
          properties: {}
        };
        
        // Load tag devices
        await this.loadTagDevices(tagId);
      }
    },

    async loadTagDevices(tagId) {
      try {
        setLoadingWithSafety(true);
        
        // Get tag devices
        const deviceIds = await fleetOperations.getTagDevices(this.managedFleet, tagId);
        this.tagDevices = [];
        
        for (const deviceId of deviceIds) {
          try {
            const deviceData = await fleetOperations.getDevice(this.managedFleet, deviceId);
            
            this.tagDevices.push({
              id: deviceData.id,
              owner: deviceData.owner,
              name: deviceData.name,
              description: deviceData.description,
              deviceType: deviceData.deviceType,
              location: deviceData.location,
              createdAt: new Date(deviceData.createdAt * 1000),
              lastSeen: new Date(deviceData.lastSeen * 1000),
              active: deviceData.active
            });
          } catch (error) {
            console.error(`Error loading device ${deviceId}:`, error);
          }
        }
      } catch (error) {
        console.error('Error loading tag devices:', error);
        showToastMessage('Failed to load tag devices: ' + error.message);
      } finally {
        setLoadingWithSafety(false);
      }
    },

    async createNewTag() {
      try {
        if (!this.newTagData.name) {
          showToastMessage('Please enter a tag name');
          return;
        }
        
        setLoadingWithSafety(true);
        
        // Create tag
        const tagId = await fleetOperations.createTag(
          this.managedFleet,
          this.newTagData.name,
          this.newTagData.description || '',
          this.newTagData.color || '#3B82F6'
        );
        
        // Add properties if any
        if (this.newTagData.properties) {
          for (const [key, value] of Object.entries(this.newTagData.properties)) {
            if (key && value) {
              await fleetOperations.setTagProperty(this.managedFleet, tagId, key, value);
            }
          }
        }
        
        await this.loadTags();
        this.showCreateTagModal = false;
        showToastMessage('Tag created successfully!');
        
        // Reset form
        this.newTagData = { name: '', description: '', color: '#3B82F6', properties: {} };
      } catch (error) {
        console.error('Error creating tag:', error);
        showToastMessage('Failed to create tag: ' + error.message);
      } finally {
        setLoadingWithSafety(false);
      }
    },

    async updateTagAction() {
      try {
        if (!this.selectedTag) {
          showToastMessage('No tag selected');
          return;
        }
        
        if (!this.newTagData.name) {
          showToastMessage('Please enter a tag name');
          return;
        }
        
        setLoadingWithSafety(true);
        
        // Update tag
        await fleetOperations.updateTag(
          this.managedFleet,
          this.selectedTag.id,
          this.newTagData.name,
          this.newTagData.description || '',
          this.newTagData.color || '#3B82F6'
        );
        
        // Update properties if any
        if (this.newTagData.properties) {
          for (const [key, value] of Object.entries(this.newTagData.properties)) {
            if (key && value) {
              await fleetOperations.setTagProperty(this.managedFleet, this.selectedTag.id, key, value);
            }
          }
        }
        
        // Refresh tag list
        await this.loadTags();
        
        // Reset selection
        this.selectedTag = null;
        this.newTagData = { name: '', description: '', color: '#3B82F6', properties: {} };
        this.tagDevices = [];
        
        showToastMessage('Tag updated successfully!');
      } catch (error) {
        console.error('Error updating tag:', error);
        showToastMessage('Failed to update tag: ' + error.message);
      } finally {
        setLoadingWithSafety(false);
      }
    },

    async removeTagAction(tagId) {
      try {
        if (!confirm('Are you sure you want to remove this tag?')) {
          return;
        }
        
        setLoadingWithSafety(true);
        
        // Remove tag
        await fleetOperations.removeTag(this.managedFleet, tagId);
        
        // Refresh tag list
        await this.loadTags();
        
        showToastMessage('Tag removed successfully!');
      } catch (error) {
        console.error('Error removing tag:', error);
        showToastMessage('Failed to remove tag: ' + error.message);
      } finally {
        setLoadingWithSafety(false);
      }
    },

    async removeDeviceFromTagAction(deviceId) {
      try {
        if (!this.selectedTag) {
          showToastMessage('No tag selected');
          return;
        }
        
        if (!confirm('Are you sure you want to remove this device from the tag?')) {
          return;
        }
        
        setLoadingWithSafety(true);
        
        // Remove device from tag
        await fleetOperations.removeDeviceFromTag(
          this.managedFleet,
          deviceId,
          this.selectedTag.id
        );
        
        // Refresh tag devices
        await this.loadTagDevices(this.selectedTag.id);
        
        showToastMessage('Device removed from tag successfully!');
      } catch (error) {
        console.error('Error removing device from tag:', error);
        showToastMessage('Failed to remove device from tag: ' + error.message);
      } finally {
        setLoadingWithSafety(false);
      }
    }
  },

  mounted() {
    this.loadTags();
  }
};

// Legacy code kept for backward compatibility
export const loadTags = async () => {
  console.warn('Legacy loadTags function called - use the TagManagementComponent instead');
  try {
    setLoadingWithSafety(true);
    
    // Get all tags
    const tagIds = await fleetOperations.getAllTags(window.app.managedFleet);
    
    // Load tag details
    window.tags = [];
    
    for (const tagId of tagIds) {
      try {
        const tagData = await fleetOperations.getTag(window.app.managedFleet, tagId);
        
        window.tags.push({
          id: tagData.id,
          name: tagData.name,
          description: tagData.description,
          color: tagData.color,
          createdAt: new Date(tagData.createdAt * 1000),
          createdBy: tagData.createdBy,
          active: tagData.active
        });
      } catch (error) {
        console.error(`Error loading tag ${tagId}:`, error);
      }
    }
  } catch (error) {
    console.error('Error loading tags:', error);
    showToastMessage('Failed to load tags: ' + error.message);
  } finally {
    setLoadingWithSafety(false);
  }
};

export const selectTag = (tagId) => {
  console.warn('Legacy selectTag function called - use the TagManagementComponent instead');
  const tag = window.tags.find(t => t.id === tagId);
  if (tag) {
    window.selectedTag = tag;
    
    // Copy tag data to form
    window.newTagData = {
      name: tag.name,
      description: tag.description,
      color: tag.color,
      properties: {}
    };
    
    // Load tag devices
    loadTagDevices(tagId);
  }
};

export const loadTagDevices = async (tagId) => {
  console.warn('Legacy loadTagDevices function called - use the TagManagementComponent instead');
  try {
    setLoadingWithSafety(true);
    
    // Get tag devices
    const deviceIds = await fleetOperations.getTagDevices(window.app.managedFleet, tagId);
    
    // Load device details
    window.tagDevices = [];
    
    for (const deviceId of deviceIds) {
      try {
        const deviceData = await fleetOperations.getDevice(window.app.managedFleet, deviceId);
        
        window.tagDevices.push({
          id: deviceData.id,
          owner: deviceData.owner,
          name: deviceData.name,
          description: deviceData.description,
          deviceType: deviceData.deviceType,
          location: deviceData.location,
          createdAt: new Date(deviceData.createdAt * 1000),
          lastSeen: new Date(deviceData.lastSeen * 1000),
          active: deviceData.active
        });
      } catch (error) {
        console.error(`Error loading device ${deviceId}:`, error);
      }
    }
  } catch (error) {
    console.error('Error loading tag devices:', error);
    showToastMessage('Failed to load tag devices: ' + error.message);
  } finally {
    setLoadingWithSafety(false);
  }
};

export const createTag = async () => {
  console.warn('Legacy createTag function called - use the TagManagementComponent instead');
  try {
    if (!window.newTagData.name) {
      showToastMessage('Please enter a tag name');
      return;
    }
    
    setLoadingWithSafety(true);
    
    // Create tag
    const tagId = await fleetOperations.createTag(
      window.app.managedFleet,
      window.newTagData.name,
      window.newTagData.description || '',
      window.newTagData.color || '#3B82F6'
    );
    
    // Add properties if any
    if (window.newTagData.properties) {
      for (const [key, value] of Object.entries(window.newTagData.properties)) {
        if (key && value) {
          await fleetOperations.setTagProperty(window.app.managedFleet, tagId, key, value);
        }
      }
    }
    
    // Refresh tag list
    await loadTags();
    
    // Reset form
    window.newTagData = { name: '', description: '', color: '#3B82F6', properties: {} };
  } catch (error) {
    console.error('Error creating tag:', error);
    showToastMessage('Failed to create tag: ' + error.message);
  } finally {
    setLoadingWithSafety(false);
  }
};

export const updateTag = async () => {
  console.warn('Legacy updateTag function called - use the TagManagementComponent instead');
  try {
    if (!window.selectedTag) {
      showToastMessage('No tag selected');
      return;
    }
    
    if (!window.newTagData.name) {
      showToastMessage('Please enter a tag name');
      return;
    }
    
    setLoadingWithSafety(true);
    
    // Update tag
    await fleetOperations.updateTag(
      window.app.managedFleet,
      window.selectedTag.id,
      window.newTagData.name,
      window.newTagData.description || '',
      window.newTagData.color || '#3B82F6'
    );
    
    // Update properties if any
    if (window.newTagData.properties) {
      for (const [key, value] of Object.entries(window.newTagData.properties)) {
        if (key && value) {
          await fleetOperations.setTagProperty(window.app.managedFleet, window.selectedTag.id, key, value);
        }
      }
    }
    
    // Refresh tag list
    await loadTags();
    
    // Reset selection
    window.selectedTag = null;
    window.newTagData = { name: '', description: '', color: '#3B82F6', properties: {} };
    window.tagDevices = [];
  } catch (error) {
    console.error('Error updating tag:', error);
    showToastMessage('Failed to update tag: ' + error.message);
  } finally {
    setLoadingWithSafety(false);
  }
};

export const removeTag = async () => {
  console.warn('Legacy removeTag function called - use the TagManagementComponent instead');
  try {
    if (!window.selectedTag) {
      showToastMessage('No tag selected');
      return;
    }
    
    if (!confirm('Are you sure you want to remove this tag?')) {
      return;
    }
    
    setLoadingWithSafety(true);
    
    // Remove tag
    await fleetOperations.removeTag(window.app.managedFleet, window.selectedTag.id);
    
    // Refresh tag list
    await loadTags();
    
    // Reset selection
    window.selectedTag = null;
    window.newTagData = { name: '', description: '', color: '#3B82F6', properties: {} };
    window.tagDevices = [];
  } catch (error) {
    console.error('Error removing tag:', error);
    showToastMessage('Failed to remove tag: ' + error.message);
  } finally {
    setLoadingWithSafety(false);
  }
};

export const removeDeviceFromTag = async (deviceId) => {
  console.warn('Legacy removeDeviceFromTag function called - use the TagManagementComponent instead');
  try {
    if (!window.selectedTag) {
      showToastMessage('No tag selected');
      return;
    }
    
    if (!confirm('Are you sure you want to remove this device from the tag?')) {
      return;
    }
    
    setLoadingWithSafety(true);
    
    // Remove device from tag
    await fleetOperations.removeDeviceFromTag(
      window.app.managedFleet,
      deviceId,
      window.selectedTag.id
    );
    
    // Refresh tag devices
    await loadTagDevices(window.selectedTag.id);
  } catch (error) {
    console.error('Error removing device from tag:', error);
    showToastMessage('Failed to remove device from tag: ' + error.message);
  } finally {
    setLoadingWithSafety(false);
  }
};