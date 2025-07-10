import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import { XStoryForgetPassword } from "./XStoryForgetPassword";

interface Props {
    onLoginSuccess:(token: string) => void;
    onCancel: () => void;
}

export function XStoryLogin({ onLoginSuccess, onCancel }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showForgetPassword, setshowForgetPassword] = useState(false);

    const handleLogin = () => {
        const token = 'test_token_string';
        onLoginSuccess(token);
    };

    return showForgetPassword ? (
        <XStoryForgetPassword
            email={""}
            onEmailChange={() => { }}
            onCancel={() => { setshowForgetPassword(false) }}
            onSuccess={handleLogin} />
        ):(
            <View style={styles.container}>
                {/* 左上角 Logo */}
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.imgIcon}
                        source={require('../../assets/blueeye.png')}
                    />
                </View>

                <Text style={styles.title}>登入 xStory 帳號</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#7F7F7F"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TextInput
                    style={styles.input}
                    placeholder="密碼"
                    placeholderTextColor="#7F7F7F"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>登入</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onCancel}
                >
                    <Text style={styles.cancelButtonText}>取消</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() => { setshowForgetPassword(true) }}
                >
                    <Text style={styles.linkButtonText}>忘記密碼</Text>
                </TouchableOpacity>
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
        marginBottom: 15,
    },
    loginButton: {
        width: "100%",
        height: 50,
        borderRadius: 25,
        backgroundColor: "#0ABAB5",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
        marginTop: 15,
    },
    loginButtonText: {
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
        marginBottom: 15,
    },
    cancelButtonText: {
        color: "#CCCCCC",
        fontSize: 16,
    },
    linkButton: {
        marginTop: 10,
    },
    linkButtonText: {
        color: "#b68a36",
        fontSize: 16,
        textDecorationLine: "underline",
    },
    imgIcon: {
        width: 40,
        height: 40,
        resizeMode: "contain",
        position: "absolute",
        top: 20,
        left: 20,
    },
    logoContainer: {
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 10,
    },
});
