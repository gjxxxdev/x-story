import { useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

type Mode = "login" | "register" | "forgot";

interface Props {
  onCancel: () => void;
  onSuccess: () => void; // 登入成功時呼叫
}

export function EmailVerification({ onCancel, onSuccess }: Props) {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [waitingVerification, setWaitingVerification] = useState(false);

  const sendVerificationEmail = () => {
    if (!email) {
      alert("請輸入 Email");
      return;
    }
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setWaitingVerification(true);

      setTimeout(() => {
        setWaitingVerification(false);
        setMode("login");
        setEmail("");
      }, 3000);
    }, 1000);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000000",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#ffffff",
      marginBottom: 30,
    },
    input: {
      width: "100%",
      height: 45,
      borderColor: "#444444",
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      color: "#ffffff",
      marginBottom: 15,
      backgroundColor: "#222222",
    },
    button: {
      width: "100%",
      backgroundColor: "#007AFF",
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      marginBottom: 10,
    },
    buttonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
    },
    cancelButton: {
      backgroundColor: "#555555",
    },
    cancelButtonText: {
      color: "#cccccc",
    },
    linkRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginTop: 10,
    },
    linkButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    linkText: {
      color: "#007AFF",
      fontSize: 14,
      fontWeight: "600",
    },
    waitingText: {
      color: "#cccccc",
      fontSize: 16,
      textAlign: "center",
      paddingHorizontal: 20,
    },
  });

  if (mode === "login") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>登入 xStory 帳號</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="密碼"
          placeholderTextColor="#888888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // 預留登入動作
          }}
        >
          <Text style={styles.buttonText}>登入</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={[styles.buttonText, styles.cancelButtonText]}>取消</Text>
        </TouchableOpacity>
        <View style={styles.linkRow}>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => {
              setMode("register");
              setEmail("");
            }}
          >
            <Text style={styles.linkText}>註冊帳號</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => {
              setMode("forgot");
              setEmail("");
            }}
          >
            <Text style={styles.linkText}>忘記密碼？</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {mode === "register" ? "註冊帳號" : "忘記密碼"}
      </Text>
      {!waitingVerification ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="請輸入 Email"
            placeholderTextColor="#888888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isSending}
          />
          {isSending ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={sendVerificationEmail}
            >
              <Text style={styles.buttonText}>發送驗證信</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => {
              setMode("login");
              setEmail("");
            }}
            disabled={isSending}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>
              取消
            </Text>
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
