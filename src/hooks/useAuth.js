import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * Custom hook to access authentication context.
 * Must be used within a component wrapped by <AuthProvider>.
 */
const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within an AuthProvider. Ensure your component is wrapped in <AuthProvider>.'
    );
  }

  return context;
};

export default useAuth;
