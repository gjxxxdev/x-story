import { AppleButton } from "@invertase/react-native-apple-authentication";
import React, { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

const loginOptions = [
  {
    key: "xstory",
    title: "使用 Email 註冊",
    onPressProp: "onXStoryRegister",
    icon: require("../../assets/auth/xstory.png"),
  },
  {
    key: "facebook",
    title: "使用 Facebook 註冊",
    onPressProp: "onFacebookRegister",
    icon: require("../../assets/auth/facebook.png"),
  },
  {
    key: "google",
    title: "使用 Google 註冊",
    onPressProp: "onGoogleRegister",
    icon: require("../../assets/auth/google.png"),
    textColor: "#FFFFFF",
  },
  {
    key: "wechat",
    title: "使用 WeChat 註冊",
    onPressProp: "onWeChatRegister",
    icon: require("../../assets/auth/wechat.png"),
  },
];

export default function RegisterScreen(props) {
  const [agreeChecked, setAgreeChecked] = useState(false);

  const handlePress = (handlerName) => {
    if (props[handlerName] && typeof props[handlerName] === "function") {
      props[handlerName]();
    }
  };
  
  const toggleAgree = () => {
    setAgreeChecked((prev) => !prev);
    console.log("同意服務條款勾選狀態:", !agreeChecked);
  };

  const handleCancel = () => {
    props.onCancel();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#39393B" }}>

      {/* 左上角 Logo */}
      <View style={styles.logoContainer}>
        <Image
          style={styles.imgIcon}
          source={require('../../assets/blueeye.png')}
        />
      </View>


      <View style={styles.container}>

        <Text style={styles.title}>歡迎回來 X Stories !</Text>
        <Text style={styles.title}>請選擇註冊方式</Text>

        {loginOptions.map(({ key, title, onPressProp, icon, textColor }) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.button,
              {
                backgroundColor: "#000000",
                borderColor: "#0abab5",
                borderWidth: 2,
                borderTopLeftRadius: 25,
                borderBottomLeftRadius: 25,
                borderTopRightRadius: 25,
                borderBottomRightRadius: 25,
              },
            ]}
            onPress={() => handlePress(onPressProp)}
            activeOpacity={0.7}
          >
            {icon && <Image source={icon} style={styles.icon} />}
            <Text style={[styles.buttonText, { color: "white" }]}>
              {title}
            </Text>
          </TouchableOpacity>
        ))}

        {Platform.OS === "ios" && (
          <AppleButton
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.SIGN_IN}
            style={styles.appleButton}
            onPress={() => handlePress("onAppleRegister")}
          />
        )}

        {/* 服務條款勾選區 */}
        <TouchableOpacity
          style={styles.agreeContainer}
          onPress={toggleAgree}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, agreeChecked && styles.checkboxChecked]}>
            {agreeChecked && <View style={styles.checkboxTick} />}
          </View>
          <Text style={styles.agreeText}>
            我已閱讀並同意{" "}
            <Text style={styles.linkText}>X Stories 的 《服務條款》</Text> 及{" "}
            <Text style={styles.linkText}>《隱私政策》</Text>。
          </Text>
        </TouchableOpacity>

        {/* 底部登入文字 */}
        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>已有帳號？</Text>
          <TouchableOpacity onPress={handleCancel} activeOpacity={0.7}>
            <Text
              style={[
                styles.loginLink, styles.loginLinkPressed,
              ]}
            >
              登入
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const screenHeight = Dimensions.get("window").height;
const paddingTopPercent = screenHeight * 0.1;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: paddingTopPercent,
    paddingHorizontal: 20,
    backgroundColor: "#39393B",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
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
  bottomRow: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
  },
  bottomText: {
    color: "#b68a36",
    fontSize: 14,
  },
  loginLink: {
    color: "#b68a36",
    fontSize: 14,
    marginLeft: 5,
  },
  loginLinkPressed: {
    color: "#f5e0a8",
  },
  agreeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: "#0abab5",
    borderRadius: 4,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#0abab5",
  },
  checkboxTick: {
    width: 8,
    height: 12,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: "white",
    transform: [{ rotate: "-45deg" }],
  },
  agreeText: {
    flex: 1,
    color: "white",
    fontSize: 14,
    lineHeight: 20,
  },
  linkText: {
    color: "#0abab5",
    textDecorationLine: "underline",
  },
  imgIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  logoContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
});
