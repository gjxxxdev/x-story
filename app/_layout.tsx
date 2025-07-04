import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AppNavigator from "./navigations/AppNavigator";
import LoginContainer from "./auth/LoginContainer";
import { LoadingProvider, useLoading } from "./screens/LoadingContext";
import { LoadingOverlay } from "./components/LoadingOverlay";

// RootLayout 只負責載入判斷及包裹 LoadingProvider
export default function RootLayout() {
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    setTimeout(() => setCheckingLogin(false), 1000);
  }, []);

  if (checkingLogin) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <LoadingProvider>
      <RootContent />
    </LoadingProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});


function RootContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { showLoading, hideLoading } = useLoading();

  const handleLoginSuccess = async () => {
    showLoading();
    await new Promise((res) => setTimeout(res, 3000)); // 等待3秒
    hideLoading();
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <AppNavigator />
      ) : (
        <LoginContainer onLoginSuccess={handleLoginSuccess} />
      )}
      <LoadingOverlay />
    </>
  );
}
