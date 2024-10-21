import api from './api';

export const getUsers = async () => {
  try {
    const response = await api.get('/');
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Error fetching users');
    }
  } catch (error) {
    console.error('Error fetching users:', error.message);
    return { success: false, message: error.message };
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post('/', userData);
    if (response.data.success) {
      return { success: true, data: response.data.data };
    } else {
      throw new Error(response.data.message || 'Error creating user');
    }
  } catch (error) {
    console.error('Error creating user:', error.message);
    return { success: false, message: error.message };
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/${id}`, userData);
    if (response.data.success) {
      return { success: true, message: response.data.message };
    } else {
      throw new Error(response.data.message || 'Error updating user');
    }
  } catch (error) {
    console.error('Error updating user:', error.message);
    return { success: false, message: error.message };
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    if (response.data.success) {
      return { success: true, message: response.data.message };
    } else {
      throw new Error(response.data.message || 'Error deleting user');
    }
  } catch (error) {
    console.error('Error deleting user:', error.message);
    return { success: false, message: error.message };
  }
};
