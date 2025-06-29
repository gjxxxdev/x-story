import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { AppleButton } from "@invertase/react-native-apple-authentication";

const loginOptions = [
  {
    key: "xstory",
    title: "用 x-story 帳號登入 (Email)",
    onPressProp: "onXStoryLogin",
    backgroundColor: "#4A90E2",
    icon: require("../../assets/auth/xstory.png"),
  },
  {
    key: "facebook",
    title: "Facebook 登入",
    onPressProp: "onFacebookLogin",
    backgroundColor: "#1877F2",
    icon: require("../../assets/auth/facebook.png"),
  },
  {
    key: "google",
    title: "Google 登入",
    onPressProp: "onGoogleLogin",
    backgroundColor: "#FFFFFF",
    icon: require("../../assets/auth/google.png"),
    textColor: "#000000",
  },
  {
    key: "wechat",
    title: "WeChat 登入",
    onPressProp: "onWeChatLogin",
    backgroundColor: "#09b83e",
    icon: require("../../assets/auth/wechat.png"),
  },
];

export default function LoginScreen(props) {
  // 模擬按下登入按鈕成功，呼叫 onLoginSuccess
  const handleTestLoginSuccess = () => {
    if (props.onLoginSuccess) {
      props.onLoginSuccess();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>登入頁面</Text>
    
      {/* 你的第三方登入按鈕(按鈕目前只是印出按鈕名稱，沒實際登入流程) */}
      {loginOptions.map(
        ({
          key,
          title,
          onPressProp,
          backgroundColor,
          icon,
          textColor,
        }) => (
          <TouchableOpacity
            key={key}
            style={[styles.button, { backgroundColor }]}
            onPress={() =>
              console.log(`${key} 按鈕被點擊，但尚未實作登入流程`)
            }
            activeOpacity={0.7}
          >
            {icon && <Image source={icon} style={styles.icon} />}
            <Text style={[styles.buttonText, { color: textColor || "white" }]}>
              {title}
            </Text>
          </TouchableOpacity>
        )
      )}

      {/* Apple Button 只在 iOS 顯示 */}
      {Platform.OS === "ios" && (
        <AppleButton
          buttonStyle={AppleButton.Style.BLACK}
          buttonType={AppleButton.Type.SIGN_IN}
          style={styles.appleButton}
          onPress={() =>
            console.log("Apple 登入按鈕被點擊，但尚未實作登入流程")
          }
        />
      )}

      {/* 測試用：直接模擬登入成功 */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#28a745" }]}
        onPress={handleTestLoginSuccess}
      >
        <Text style={styles.buttonText}>測試登入成功，切換畫面</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
    color: "white",
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  appleButton: {
    width: "100%",
    height: 44,
    marginTop: 10,
  },
});
