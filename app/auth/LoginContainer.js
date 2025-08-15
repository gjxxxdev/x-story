import React, { useEffect, useState } from "react";
import { appleLogin } from "../../components/utils/appleAuth";
import { facebookLogin } from "../../components/utils/facebookAuth";
import { googleLogin } from "../../components/utils/googleAuth";
import { wechatLogin } from "../../components/utils/wechatAuth";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen"
import { RegisterXStoryScreen } from "../screens/RegisterXStoryScreen";
import { XStoryLogin } from "../screens/XStoryLogin"
import { Alert, View, BackHandler, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native';
import tokenStorage from './Storage';
import { translate } from "../i18n/i18n";
import { authApiClient } from '../config/authApiClient';

export default function LoginContainer({ onLoginSuccess }) {
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [showRegisterView, setshowRegisterView] = useState(true);
  const [historyStack, setHistoryStack] = useState([]);

  const handleXStoryLogin = () => {
    setHistoryStack((prev) => [...prev, 'emailLogin']);
    setShowEmailLogin(true);
  };

  const handleXStoryLoginCancel = () => {
    setShowEmailLogin(false);
  };

  const handleXStoryLoginSuccess = async (token) => {
    console.log('handleXStoryLoginSuccess token: ' + token);
    await tokenStorage.setStoreToken(token);
    if (token) {
      onLoginSuccess();
    }
  };

  const handleEmailVerificationCancel = () => {
    setShowEmailVerification(false);
  };

  const handleFacebookLogin = async () => {
    try {
      const token = await facebookLogin();
      console.log('facebook login:' + token);
      if (token) {
        await tokenStorage.setStoreToken(token);
        console.log("facebook login user token:", token);
        onLoginSuccess();
      }
      else alert("Facebook 登入失敗或取消");
    } catch (e) {
      alert("Facebook 登入錯誤: " + e.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const SignInResponse = await googleLogin();
      console.log('google login: ' + SignInResponse.data.user);
      console.log('google login: ' + SignInResponse.data.idToken);
      await tokenStorage.setStoreToken(SignInResponse.data.idToken);
      if (SignInResponse.data.idToken.length > 0) {
          const googleLoginServerRequest = { idToken: SignInResponse.data.idToken };
          const serverGoogleLoginAccessToken = await authApiClient.googleLoginWithXStory(googleLoginServerRequest);
          if(serverGoogleLoginAccessToken && serverGoogleLoginAccessToken.length > 0) {
            onLoginSuccess();
          } else {
            alert("serverGoogleLoginAccessToken is empty, please try again");
          }
      }
      else alert(SignInResponse.data.message || "Google 登入失敗或取消");
    } catch (e) {
      alert("Google 登入錯誤: " + e.message);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const appletoken = await appleLogin();
        console.log('apple appletoken: ' + appletoken);
      if (appletoken) {
        const token = await authApiClient.appleLoginWithXStory({ idToken: appletoken });
        await tokenStorage.setStoreToken(token);
        onLoginSuccess();
      }
      else alert("Apple 登入失敗或取消");
    } catch (e) {
      alert("Apple 登入錯誤: " + e.message);
    }
  };

  const handleWeChatLogin = async () => {
    try {
      const code = await wechatLogin();
      if (code) {
        await tokenStorage.setStoreToken(code);
        console.log('google login: ' + code);
        onLoginSuccess();
      }
      else alert("WeChat 登入失敗或取消");
    } catch (e) {
      alert("WeChat 登入錯誤: " + e.message);
    }
  };


  const handleRegister = async () => {
    setHistoryStack((prev) => [...prev, 'register']);
    setshowRegisterView(true);
  }

  const handleXStoryRegister = () => {
    setHistoryStack((prev) => [...prev, 'emailVerification']);
    setShowEmailVerification(true);
  };

  const handleFacebookRegister = async () => {
    try {
      const token = await facebookLogin();
      console.log('facebook login:' + token);
      if (token) {
        await tokenStorage.setStoreToken(token);
        console.log("facebook login user token:", token);
        onLoginSuccess();
      }
      else alert("Facebook 登入失敗或取消");
    } catch (e) {
      alert("Facebook 登入錯誤: " + e.message);
    }
  };

  const handleAppleRegister = async () => {
    try {
      const token = await appleLogin();
      if (token) {
        await tokenStorage.setStoreToken(token);
        console.log('google login: ' + token);
        onLoginSuccess();
      }
      else alert("Apple 登入失敗或取消");
    } catch (e) {
      alert("Apple 登入錯誤: " + e.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const SignInResponse = await googleLogin();
      await tokenStorage.setStoreToken(SignInResponse.data.idToken);
      console.log('google login: ' + SignInResponse.data.user);
      console.log('google login: ' + SignInResponse.data.idToken);
      onLoginSuccess();
    } catch (e) {
      alert("Google 登入錯誤: " + e.message);
    }
  };

  const handleWeChatRegister = async () => {
    try {
      const code = await wechatLogin();
      if (code) {
        await tokenStorage.setStoreToken(code);
        console.log('google login: ' + code);
        onLoginSuccess();
      }
      else alert("WeChat 登入失敗或取消");
    } catch (e) {
      alert("WeChat 登入錯誤: " + e.message);
    }
  };

  useEffect(() => {
    const backAction = () => {
      console.log('Back button pressed');
      console.log('Current historyStack:', historyStack);

      if (historyStack.length > 0) {
        const lastAction = historyStack[historyStack.length - 1];
        console.log('Going back to:', lastAction);
        goBack();
        return true; // 阻止預設返回
      }

      console.log('No history, default back behavior');
      return false; // 沒有上一步，交給系統處理（例如退出APP）
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [historyStack]);

  const goBack = () => {
    setHistoryStack((prevStack) => {
      if (prevStack.length > 0) {
        const newStack = [...prevStack];
        newStack.pop();

        // 根據 newStack 的最後一個元素決定顯示畫面
        const lastView = newStack[newStack.length - 1];
        console.log('Switching to last view:', lastView);

        switch (lastView) {
          case 'register':
            setshowRegisterView(true);
            setShowEmailLogin(false);
            setShowEmailVerification(false);
            break;
          case 'emailLogin':
            setShowEmailLogin(true);
            setshowRegisterView(false);
            setShowEmailVerification(false);
            break;
          case 'emailVerification':
            setShowEmailVerification(true);
            setshowRegisterView(false);
            setShowEmailLogin(false);
            break;
          default:
            // 預設回到登入畫面
            setshowRegisterView(false);
            setShowEmailLogin(false);
            setShowEmailVerification(false);
        }

        return newStack;
      }

      return prevStack;
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {showEmailVerification ? (
            <RegisterXStoryScreen
              onCancel={handleEmailVerificationCancel}
              onSuccess={() => {
                setShowEmailVerification(false);
                Alert.alert(
                  translate("registerEmailSentMessage"),
                  [
                    { text: translate("ok") }
                  ]
                );
              }}
            />
          ) : showEmailLogin ? (
            <XStoryLogin
              onLoginSuccess={(token) => { handleXStoryLoginSuccess(token) }}
              onCancel={handleXStoryLoginCancel}
              onShowEmailVerification={() => { }}
            />
          ) : showRegisterView ? (
            <RegisterScreen
              onRegisterSuccess={() => { }}
              onXStoryRegister={handleXStoryRegister}
              onFacebookRegister={handleFacebookRegister}
              onAppleRegister={handleAppleRegister}
              onGoogleRegister={handleGoogleRegister}
              onWeChatRegister={handleWeChatRegister}
              onRegister={handleRegister}
              onCancel={() => setshowRegisterView(false)}
            />
          ) : (
            <LoginScreen
              onLoginSuccess={onLoginSuccess}
              onXStoryLogin={handleXStoryLogin}
              onFacebookLogin={handleFacebookLogin}
              onAppleLogin={handleAppleLogin}
              onGoogleLogin={handleGoogleLogin}
              onWeChatLogin={handleWeChatLogin}
              onRegister={handleRegister}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
