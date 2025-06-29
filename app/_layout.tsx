import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AppNavigator from "./navigations/AppNavigator";
import LoginScreen from "./screens/LoginScreen";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    // 這裡放登入檢查邏輯（可換成實際 async 檢查）
    setTimeout(() => {
      setCheckingLogin(false);
    }, 1000);
  }, []);

  if (checkingLogin) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isLoggedIn) {
    return <AppNavigator />;
  } else {
    return (
      <LoginScreen
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
