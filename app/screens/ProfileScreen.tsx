import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import AppHeader from '../components/AppHeader';
import colors from '../config/colors';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader />
      <View style={styles.body}>
        <Text style={styles.text}>待製作...</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.homeBackground || '#222' },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { color: '#fff', fontSize: 20, fontWeight: '600' },
});
