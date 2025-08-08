// RootLayout.tsx
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import SafeAreaWrapper from './components/SafeAreaWrapper';
import AppNavigator from './navigations/AppNavigator';
import LoginContainer from './auth/LoginContainer';
import { LoadingProvider } from './screens/LoadingContext';
import { LoadingOverlay } from './components/LoadingOverlay';
import useInitApp from './hook/useInitApp';
import * as Linking from "expo-linking";
import { VerifyMail } from './config/authApiClient';

export default function RootLayout() {
  const { checking, isLoggedIn, setIsLoggedIn } = useInitApp();

  useEffect(() => {
    // 初次開啟 app 時處理 deep link
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink(url);
    });

    // App 運行中收到新的 deep link
    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleDeepLink(url);
    });

    return () => subscription.remove(); // 清除事件
  }, []);

  const handleDeepLink = async (url: string) => {
    const parsed = Linking.parse(url);
    console.log("📨 接收到 URL:", parsed);

    // 預期格式：xstoryscheme://verify-email?token=xxxx
    if ((parsed.path === "verify-email" || parsed.hostname === "verify-email")
      && parsed.queryParams?.token) {
      const token = parsed.queryParams.token as string;
      console.log("🔗 處理驗證連結，token:", token);

      await VerifyMail({
        email: parsed.queryParams.email as string,
        token,
      });
    } else {
      console.log("⛔️ 不支援的連結格式");
    }
  };

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
