import { useState } from "react";
import { TextInput, View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";

interface EmailVerificationProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function EmailVerification({ onCancel, onSuccess }: EmailVerificationProps) {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [waitingVerification, setWaitingVerification] = useState(false);

  const sendVerificationEmail = () => {
    if (!email) {
      alert("請輸入 Email");
      return;
    }
    setIsSending(true);

    // 模擬發送驗證信
    setTimeout(() => {
      setIsSending(false);
      setWaitingVerification(true);

      // 模擬等待3秒後驗證成功
      setTimeout(() => {
        onSuccess();
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
      fontSize: 20,
      fontWeight: "bold",
      color: "#ffffff",
      marginBottom: 20,
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
    waitingText: {
      color: "#cccccc",
      fontSize: 16,
      textAlign: "center",
      paddingHorizontal: 20,
    },
  });

  return (
    <View style={styles.container}>
      {!waitingVerification ? (
        <>
          <Text style={styles.title}>請輸入 Email 並發送驗證信</Text>
          <TextInput
            style={styles.input}
            placeholder="輸入 Email"
            placeholderTextColor="#888888"
            value={email}
            onChangeText={setEmail}
            editable={!isSending}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {isSending ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : (
            <TouchableOpacity style={styles.button} onPress={sendVerificationEmail}>
              <Text style={styles.buttonText}>發送驗證信</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
            disabled={isSending}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>取消</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.waitingText}>驗證信已發送，請等待驗證中... （3秒後自動登入成功）</Text>
      )}
    </View>
  );
}
