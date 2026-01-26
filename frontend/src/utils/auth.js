export const AUTH_KEY = 'movie_app_auth';
export const USERS_KEY = 'movie_app_users';

export const signup = (name, email, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return { success: false, message: 'Email already exists' };
  }
  
  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return { success: true, message: 'Signup successful' };
};

export const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return { success: false, message: 'Invalid email or password' };
  }
  
  const authData = {
    isAuthenticated: true,
    user: { name: user.name, email: user.email }
  };
  
  localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
  return { success: true, user: authData.user };
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const getAuthData = () => {
  const authData = localStorage.getItem(AUTH_KEY);
  return authData ? JSON.parse(authData) : null;
};

export const isAuthenticated = () => {
  const authData = getAuthData();
  return authData?.isAuthenticated || false;
};
