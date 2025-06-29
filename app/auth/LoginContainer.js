import LoginScreen from "../screens/LoginScreen";
// Import facebookLogin and other login functions if not already imported
import { appleLogin } from "../../components/utils/appleAuth";
import { facebookLogin } from "../../components/utils/facebookAuth";
import { googleLogin } from "../../components/utils/googleAuth";
import { wechatLogin } from "../../components/utils/wechatAuth";


export default function LoginContainer({ onLoginSuccess }) {
  const handleXStoryLogin = () => {
    // 自家 Email 登入邏輯
    onLoginSuccess();
  };
  
  const handleFacebookLogin = async () => {
    const token = await facebookLogin();
    if (token) {
      onLoginSuccess();
    } else {
      alert("Facebook 登入失敗或取消");
    }
  };

  const handleGoogleLogin = async () => {
    const token = await googleLogin();
    if (token) {
      onLoginSuccess();
    } else {
      alert("Google 登入失敗或取消");
    }
  };

  const handleAppleLogin = async () => {
    const token = await appleLogin();
    if (token) {
      onLoginSuccess();
    } else {
      alert("Apple 登入失敗或取消");
    }
  };

  const handleWeChatLogin = async () => {
    const code = await wechatLogin();
    if (code) {
      onLoginSuccess();
    } else {
      alert("WeChat 登入失敗或取消");
    }
  };

  return (
    <LoginScreen
      onLoginSuccess={onLoginSuccess}
      onXStoryLogin={handleXStoryLogin}
      onFacebookLogin={handleFacebookLogin}
      onAppleLogin={handleAppleLogin}
      onGoogleLogin={handleGoogleLogin}
      onWeChatLogin={handleWeChatLogin}
    />
  );
}
