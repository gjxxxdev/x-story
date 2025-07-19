import { useEffect } from "react";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

export function ResetScreen({ navigation }) {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      Alert.alert(
        "確認重置",
        "確定要重置所有登入資料嗎？",
        [
          {
            text: "取消",
            style: "cancel",
            onPress: () => {
              navigation.goBack(); // 返回上一頁，避免停留在空白畫面
            },
          },
          {
            text: "確定",
            style: "destructive",
            onPress: async () => {
              await SecureStore.deleteItemAsync("authToken");
              await SecureStore.deleteItemAsync("userId");

              Alert.alert("已重置", "資料已清除");
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            },
          },
        ],
        { cancelable: false }
      );
    });

    return unsubscribe; // 移除監聽
  }, [navigation]);

  return null; // 因為這個畫面只是功能，不顯示內容
}