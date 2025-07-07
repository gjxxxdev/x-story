import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import SafeAreaWrapper from './components/SafeAreaWrapper'; // 路徑請依實際調整
import AppNavigator from './navigations/AppNavigator';
import LoginContainer from './auth/LoginContainer';
import { LoadingProvider, useLoading } from './screens/LoadingContext';
import { LoadingOverlay } from './components/LoadingOverlay';

export default function RootLayout() {
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    setTimeout(() => setCheckingLogin(false), 1000);
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
      <SafeAreaWrapper>
        <RootContent />
      </SafeAreaWrapper>
    </LoadingProvider>
  );
}

function RootContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { showLoading, hideLoading } = useLoading();

  const handleLoginSuccess = async () => {
    showLoading();
    await new Promise((res) => setTimeout(res, 500));
    setIsLoggedIn(true);
    hideLoading();
  };

  return (
    <SafeAreaWrapper>
      {isLoggedIn ? <AppNavigator /> : <LoginContainer onLoginSuccess={handleLoginSuccess} />}
      <LoadingOverlay />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
