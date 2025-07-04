import { useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface EmailVerificationProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function EmailVerification({ onCancel }: EmailVerificationProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>登入xStory帳號</Text>
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
      <TouchableOpacity style={styles.button} onPress={() => { /* 預留登入動作 */ }}>
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
          onPress={() => { /* 預留註冊動作 */ }}
        >
          <Text style={styles.linkText}>註冊帳號</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => { /* 預留忘記密碼動作 */ }}
        >
          <Text style={styles.linkText}>忘記密碼？</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
