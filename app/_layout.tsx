import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import SafeAreaWrapper from './components/SafeAreaWrapper';
import AppNavigator from './navigations/AppNavigator';
import LoginContainer from './auth/LoginContainer';
import { LoadingProvider } from './screens/LoadingContext';
import { LoadingOverlay } from './components/LoadingOverlay';
import tokenStorage from './auth/tokenStorage';

export default function RootLayout() {
  const [checkingLogin, setCheckingLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await tokenStorage.getToken();
      console.log("[RootLayout] Token retrieved:", token);
      setIsLoggedIn(!!token);
      setCheckingLogin(false);
    };
    checkLoginStatus();
  }, []);

  if (checkingLogin) {
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
