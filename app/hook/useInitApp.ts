// hooks/useInitApp.ts
import { useEffect, useState } from 'react';
import tokenStorage from '../auth/Storage';
import {initLanguageByLoginStatus} from '../i18n/initLanguage';

export default function useInitApp() {
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await tokenStorage.getToken();
      const loggedIn = !!token;

      console.log("[useInitApp] Token retrieved:", token);
      setIsLoggedIn(loggedIn);

      // ✅ 初始化語言（根據登入與否判斷從 SecureStore or 裝置）
      await initLanguageByLoginStatus(loggedIn);

      setChecking(false);
    };

    checkLoginStatus();
  }, []);

  return { checking, isLoggedIn, setIsLoggedIn };
}

