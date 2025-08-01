import { useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";

interface Props {
  email: string;
  onEmailChange: (email: string) => void;
  onCancel: () => void;
  onSuccess: () => void;
}

export function XStoryForgetPassword({ email, onEmailChange, onCancel, onSuccess }: Props) {
  const [isSending, setIsSending] = useState(false);
  const [waitingVerification, setWaitingVerification] = useState(false);

  const sendResetEmail = () => {
    if (!email) {
      alert("請輸入 Email");
      return;
    }
    setIsSending(true);

    const sendVerificationEmail = async () => {

    }

    
    /*
    setTimeout(() => {
      setIsSending(false);
      setWaitingVerification(true);

      setTimeout(() => {
        setWaitingVerification(false);
        onSuccess();
      }, 3000);
    }, 1000);
    */
  };

  return (
    <View style={styles.container}>
      {/* 左上角 Logo */}
      <View style={styles.logoContainer}>
        <Image
          style={styles.imgIcon}
          source={require('../../assets/blueeye.png')}
        />
      </View>

      <Text style={styles.title}>忘記密碼</Text>

      {!waitingVerification ? (
        <>
                  <View style={styles.passwordInputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="請輸入您的Email"
            placeholderTextColor="#7F7F7F"
            value={email}
            onChangeText={onEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isSending}
          />
          </View>

          {isSending ? (
            <ActivityIndicator size="large" color="#0ABAB5" style={{ marginVertical: 20 }} />
          ) : (
            <TouchableOpacity style={styles.sendButton} onPress={sendResetEmail}>
              <Text style={styles.sendButtonText}>發送重設信</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
            disabled={isSending}
          >
            <Text style={styles.cancelButtonText}>取消</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.waitingText}>
          重設信已發送，請到信箱確認。
          {"\n"}
          （3秒後自動返回登入畫面）
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#39393B",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1C1C1C",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "white",
    marginBottom: 30,
  },
  sendButton: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0ABAB5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  sendButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    width: "100%",
    height: 45,
    borderRadius: 25,
    backgroundColor: "#555555",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#CCCCCC",
    fontSize: 16,
  },
  waitingText: {
    color: "#AAAAAA",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
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
  passwordInputWrapper: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1C1C1C",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});
