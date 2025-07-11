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

const loginOptions = [
  {
    key: "xstory",
    title: "使用 Email 登入",
    onPressProp: "onXStoryLogin",
    icon: require("../../assets/auth/xstory.png"),
  },
  {
    key: "facebook",
    title: "使用 Facebook 登入",
    onPressProp: "onFacebookLogin",
    icon: require("../../assets/auth/facebook.png"),
  },
  {
    key: "google",
    title: "使用 Google 登入",
    onPressProp: "onGoogleLogin",
    icon: require("../../assets/auth/google.png"),
    textColor: "#FFFFFF",
  },
  {
    key: "wechat",
    title: "使用 WeChat 登入",
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
          source={require('../../assets/blueeye.png')}
        />
      </View>


      <View style={styles.container}>

        <Text style={styles.title}>歡迎回來 X Stories !</Text>
        <Text style={styles.title}>請選擇登入方式</Text>

        {loginOptions.map(({ key, title, onPressProp, icon, textColor }) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.button,
              {
                backgroundColor: "#000000",
                borderColor: "#0abab5",
                borderWidth: 2,
                borderRadius: 25,
                justifyContent: "center",
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
            onPress={() => handlePress("onAppleLogin")}
          />
        )}

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
            測試登入成功，切換畫面
          </Text>
        </TouchableOpacity>

        {/* 新增底部行 */}
        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={props.onRegister}>
            <Text style={styles.bottomTextLeft}>註冊帳號</Text>
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
    // 預設文字顏色由外層動態指定
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
    color: "#b68a36",
    fontSize: 14,
    textDecorationLine: "underline",  // 加底線
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
