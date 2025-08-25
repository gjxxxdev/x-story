// app/screens/HistoryScreen.tsx
import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable } from 'react-native';
import AppHeader from '../components/AppHeader';
import CoinHistoryScreen from './CoinHistoryScreen';
import PurchaseHistoryScreen from './PurchaseHistoryScreen';

type TabKey = 'coin' | 'purchase';

export default function HistoryScreen() {
  const [tab, setTab] = useState<TabKey>('coin');

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader />

      {/* Segmented 控制列 */}
      <View style={styles.segmentBar}>
        <SegmentButton
          label="金幣紀錄"
          active={tab === 'coin'}
          onPress={() => setTab('coin')}
        />
        <SegmentButton
          label="購買記錄"
          active={tab === 'purchase'}
          onPress={() => setTab('purchase')}
        />
      </View>

      {/* 內容區：依 tab 切換；傳 embedded 讓子頁不渲染自己的 SafeAreaView/Header */}
      <View style={styles.content}>
        {tab === 'coin' ? <CoinHistoryScreen embedded /> : <PurchaseHistoryScreen embedded />}
      </View>
    </SafeAreaView>
  );
}

function SegmentButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.segBtn,
        active && styles.segBtnActive,
        pressed && { opacity: 0.9 },
      ]}
    >
      <Text style={[styles.segText, active && styles.segTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#2b2f33' },
  segmentBar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },
  segBtn: {
    flex: 1,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4a4f55',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2f3338',
  },
  segBtnActive: {
    backgroundColor: '#00a99d',
    borderColor: '#00a99d',
  },
  segText: { color: '#cfd7df', fontWeight: '700' },
  segTextActive: { color: '#eafff9' },
  content: { flex: 1, paddingTop: 6 },
});
