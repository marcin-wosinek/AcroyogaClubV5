import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '@shared/schema';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isUser: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string; user?: User }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check session with backend on app start
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        
        if (data.isAuthenticated && data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.success) {
        setUser(result.user);
        return { success: true, message: result.message, user: result.user };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear user state even if API call fails
      setUser(null);
    }
  };

  // Calculate permissions based on user data
  const isAuthenticated = !!user;
  const isUser = isAuthenticated;
  const isAdmin = isAuthenticated && user?.isAdmin === true;

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isUser,
      isAdmin,
      isLoading,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}