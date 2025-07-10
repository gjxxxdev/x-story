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

export function EmailVerification({ email, onEmailChange, onCancel, onSuccess }: Props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [waitingVerification, setWaitingVerification] = useState(false);

  const sendVerificationEmail = () => {
    if (!email) {
      alert("請輸入 Email");
      return;
    }
    if (!password) {
      alert("請輸入密碼");
      return;
    }
    if (!confirmPassword) {
      alert("請確認密碼");
      return;
    }
    if (password !== confirmPassword) {
      alert("兩次輸入的密碼不相同");
      return;
    }

    // 密碼格式驗證：8-20字元，至少1大寫、1小寫、1數字
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (!passwordPattern.test(password)) {
      alert("密碼需8-20字元，且包含至少一個大寫字母、一個小寫字母及一個數字");
      return;
    }

    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setWaitingVerification(true);

      setTimeout(() => {
        setWaitingVerification(false);
        onSuccess();
      }, 3000);
    }, 1000);
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

      <Text style={styles.title}>驗證碼</Text>

      {!waitingVerification ? (
        <>
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

          <TextInput
            style={styles.input}
            placeholder="建立密碼"
            placeholderTextColor="#7F7F7F"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isSending}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="確認密碼"
            placeholderTextColor="#7F7F7F"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!isSending}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.passwordHelpText}>
            密碼須包含8-20字元，至少一個大寫字母、一個小寫字母及一個數字
          </Text>

          {isSending ? (
            <ActivityIndicator size="large" color="#0ABAB5" style={{ marginVertical: 20 }} />
          ) : (
            <TouchableOpacity style={styles.sendButton} onPress={sendVerificationEmail}>
              <Text style={styles.sendButtonText}>發送驗證信</Text>
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
          驗證信已發送，請到信箱確認。
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
    marginBottom: 10,
  },
  passwordHelpText: {
    color: "#AAAAAA",
    fontSize: 12,
    marginBottom: 20,
    marginLeft: 10,
    alignSelf: "flex-start",
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
});
