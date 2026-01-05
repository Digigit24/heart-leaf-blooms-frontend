import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthStore } from '@/app/store/auth.store';

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const { user, login, logout } = useAuthStore();
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);