// app/screens/HistoryScreen.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CoinHistoryScreen from './CoinHistoryScreen';
import PurchaseHistoryScreen from './PurchaseHistoryScreen';
import routes from '../navigations/routes';

type TabKey = 'coin' | 'purchase';

export default function HistoryScreen() {
  const [tab, setTab] = useState<TabKey>('coin');
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.safe}>

      <View style={[styles.topBar, { paddingTop: 8 }]}>
        {/* 左上：eye */}
        <Pressable onPress={() => navigation.navigate(routes.MAIN as never)} hitSlop={8}>
          <Image style={styles.eyeIcon} source={require('../../assets/blueeye.png')} />
        </Pressable>

        {/* 右上：profile */}
        <Pressable onPress={() => navigation.navigate(routes.PROFILE as never)} hitSlop={8}>
          <Image style={styles.profileIcon} source={require('../../assets/profile.png')} />
        </Pressable>
      </View>


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

      {/* 內容區 */}
      <View style={styles.content}>
        {tab === 'coin' ? (
          <CoinHistoryScreen embedded />
        ) : (
          <PurchaseHistoryScreen embedded />
        )}
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

  // 右上角 eye 容器
  topBar: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',  // ⬅️ 左右分散
    alignItems: 'flex-start',
  },
  eyeIcon: { width: 40, height: 40 },
  profileIcon: { width: 32, height: 32, borderRadius: 16 },


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
