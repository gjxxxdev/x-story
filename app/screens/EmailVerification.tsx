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
import { translate } from "../i18n/i18n";

interface Props {
  onCancel: () => void;
  onSuccess: () => void;
  onEmailChange?: (email: string) => void;
}

export function EmailVerification({ onCancel, onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [waitingVerification, setWaitingVerification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      <View style={styles.logoContainer}>
        <Image
          style={styles.imgIcon}
          source={require("../../assets/blueeye.png")}
        />
      </View>

      <Text style={styles.title}>{translate("registerAccount")}</Text>

      {!waitingVerification ? (
        <>
          <TextInput
            style={styles.input}
            placeholder={translate("enterEmail")}
            placeholderTextColor="#7F7F7F"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isSending}
          />

          <View style={styles.passwordInputWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder={translate("enterPassword")}
              placeholderTextColor="#7F7F7F"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!isSending}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Image
                source={
                  showPassword
                    ? require("../../assets/auth/eye_open.png")
                    : require("../../assets/auth/eye_closed.png")
                }
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.passwordInputWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder={translate("confirmPassword")}
              placeholderTextColor="#7F7F7F"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              editable={!isSending}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword((prev) => !prev)}
            >
              <Image
                source={
                  showConfirmPassword
                    ? require("../../assets/auth/eye_open.png")
                    : require("../../assets/auth/eye_closed.png")
                }
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.passwordHelpText}>
            {translate("passwordRule")}
          </Text>

          {isSending ? (
            <ActivityIndicator
              size="large"
              color="#0ABAB5"
              style={{ marginVertical: 20 }}
            />
          ) : (
            <TouchableOpacity
              style={styles.sendButton}
              onPress={sendVerificationEmail}
            >
              <Text style={styles.sendButtonText}>{translate("sendVerification")}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
            disabled={isSending}
          >
            <Text style={styles.cancelButtonText}>{translate("cancel")}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.waitingText}>
          {translate("verificationSent")}
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
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: "white",
  },
  eyeButton: {
    padding: 5,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: "#AAAAAA", // 可自訂顏色
  },
});
