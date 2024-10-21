import api from './api';

export const login = async (email, password) => {
  try {
    console.log('Datos de login:', { email, password });
    const response = await api.post('/login', 
      { email, password }, 
      { headers: { 'Content-Type': 'application/json' } }
    );
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return { success: true, message: response.data.message };
    } else {
      throw new Error(response.data.message || 'Error en el inicio de sesión');
    }
  } catch (error) {
    console.error('Login error:', error.message);
    return { success: false, message: error.message };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
};
