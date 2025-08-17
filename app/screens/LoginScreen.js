import { AppleButton } from "@invertase/react-native-apple-authentication";
import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { translate } from "../i18n/i18n";

const loginOptions = [
  {
    key: "xstory",
    title: "signInWithEmail",
    onPressProp: "onXStoryLogin",
    icon: require("../../assets/auth/xstory.png"),
  },
  {
    key: "facebook",
    title: "signInWithFacebook",
    onPressProp: "onFacebookLogin",
    icon: require("../../assets/auth/facebook.png"),
  },
  {
    key: "google",
    title: "signInWithGoogle",
    onPressProp: "onGoogleLogin",
    icon: require("../../assets/auth/google.png"),
    textColor: "#FFFFFF",
  },
  {
    key: "wechat",
    title: "signInWithWechat",
    onPressProp: "onWeChatLogin",
    icon: require("../../assets/auth/wechat.png"),
  },
];

export default function LoginScreen(props) {
  const handlePress = (handlerName) => {
    if (props[handlerName] && typeof props[handlerName] === "function") {
      props[handlerName]();
    }
  };

  const handleTestLoginSuccess = () => {
    if (props.onLoginSuccess) {
      props.onLoginSuccess();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#39393B" }}>
      {/* 左上角 Logo */}
      <View style={styles.logoContainer}>
        <Image
          style={styles.imgIcon}
          source={require("../../assets/blueeye.png")}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>{translate("welcomeBack")}</Text>
        <Text style={styles.title}>{translate("loginPrompt")}</Text>

        <View style={{ height: 30 }} />

        {loginOptions.map(({ key, title, onPressProp, icon }) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.button,
              {
                backgroundColor: "#000000",
                borderColor: "#0abab5",
                borderWidth: 2,
                borderRadius: 25,
                justifyContent: "flex-start",
                paddingLeft: "25%",
                alignItems: "center",
              },
            ]}
            onPress={() => handlePress(onPressProp)}
            activeOpacity={0.7}
          >
            {icon && <Image source={icon} style={styles.icon} />}
            <Text style={[styles.buttonText, { color: "white" }]}>{translate(title)}</Text>
          </TouchableOpacity>
        ))}

        {Platform.OS === "ios" && (
          <View
            style={[
              styles.appleFrame,
            ]}
            pointerEvents={ "auto"}
          >
            <AppleButton
              buttonType={AppleButton.Type.SIGN_IN}
              buttonStyle={AppleButton.Style.BLACK}
              // 內層 Apple 按鈕自己的圓角，不被外層影響
              cornerRadius={23}
              style={styles.appleButton}
              onPress={() => handlePress("onAppleLogin")}
              accessibilityRole="button"
            />
          </View>
        )}

        <View style={{ height: 15 }} />

        <TouchableOpacity
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
          onPress={handleTestLoginSuccess}
        >
          <Text style={[styles.buttonText, { color: "#0abab5" }]}>
            {translate("testLoginSuccess")}
          </Text>
        </TouchableOpacity>

        {/* 新增底部行 */}
        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={props.onRegister}>
            <Text style={styles.bottomTextLeft}>{translate("signUp")}</Text>
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
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 10,
  },
  appleButton: {
    width: "100%",
    height: 44,
    marginTop: 10,
  },
  bottomTextLeft: {
    color: "#f0ad57",
    fontSize: 18,
    textAlign: "Left",
    textDecorationLine: "underline",
  },
  bottomRow: {
    marginTop: 40,
    color: "white",
    flexDirection: "row",
    justifyContent: "center",
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
