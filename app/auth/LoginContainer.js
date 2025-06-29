import LoginScreen from "../screens/LoginScreen";
// Import facebookLogin and other login functions if not already imported
//import { appleLogin } from "../utils/appleAuth";
//import { facebookLogin } from "../utils/facebookAuth";
//import { googleLogin } from "../utils/googleAuth";
//import { wechatLogin } from "../utils/wechatAuth";


export default function LoginContainer({ onLoginSuccess }) {
  const handleXStoryLogin = () => {
    // 自家 Email 登入邏輯
    onLoginSuccess();
  };

  const fakefeedback = () => {
    // 假的回饋函數，實際應用中可以用來顯示錯誤或成功訊息
    console.log("Fake feedback function called");
  };

  const handleFacebookLogin = async () => {
    const token = await fakefeedback();
    if (token) {
      onLoginSuccess();
    } else {
      alert("Facebook 登入失敗或取消");
    }
  };

  const handleGoogleLogin = async () => {
    const token = await fakefeedback();
    if (token) {
      onLoginSuccess();
    } else {
      alert("Google 登入失敗或取消");
    }
  };

  const handleAppleLogin = async () => {
    const token = await fakefeedback();
    if (token) {
      onLoginSuccess();
    } else {
      alert("Apple 登入失敗或取消");
    }
  };

  const handleWeChatLogin = async () => {
    const code = await fakefeedback();
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
