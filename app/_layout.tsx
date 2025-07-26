// RootLayout.tsx
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import SafeAreaWrapper from './components/SafeAreaWrapper';
import AppNavigator from './navigations/AppNavigator';
import LoginContainer from './auth/LoginContainer';
import { LoadingProvider } from './screens/LoadingContext';
import { LoadingOverlay } from './components/LoadingOverlay';
import useInitApp from './hook/useInitApp';

export default function RootLayout() {
  const { checking, isLoggedIn, setIsLoggedIn } = useInitApp();

  if (checking) {
    return (
      <SafeAreaWrapper style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </SafeAreaWrapper>
    );
  }

  return (
    <LoadingProvider>
      <SafeAreaWrapper style={{ flex: 1 }}>
        {isLoggedIn ? (
          <AppNavigator />
        ) : (
          <LoginContainer onLoginSuccess={() => setIsLoggedIn(true)} />
        )}
        <LoadingOverlay />
      </SafeAreaWrapper>
    </LoadingProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
