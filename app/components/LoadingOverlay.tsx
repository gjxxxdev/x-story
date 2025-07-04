import React from "react";
import { ActivityIndicator, StyleSheet, Text, View, Modal } from "react-native";
import { useLoading } from "../screens/LoadingContext";

export function LoadingOverlay() {
  const { isLoading } = useLoading();

  return (
    <Modal visible={isLoading} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingBox: {
    padding: 20,
    backgroundColor: "#222",
    borderRadius: 8,
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
  },
});
