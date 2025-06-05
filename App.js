import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/services/AuthContext';
import AppNavigator from './src/navigation';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
