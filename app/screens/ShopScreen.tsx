// app/screens/ShopScreen.tsx
import React from 'react';
import {
  SafeAreaView, View, Text, StyleSheet, Image, ScrollView, Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import routes from '../navigations/routes';
import PackCard, { PackItem } from '../components/Purchase/PackCard';

const PACKS: PackItem[] = [
  { id: 'p1', title: '入門基本包', coins: 90,  bonus: 5,   priceUsd: 90 },
  { id: 'p2', title: '熱門推薦包', coins: 150, bonus: 20,  priceUsd: 150 },
  { id: 'p3', title: '高效閱讀包', coins: 300, bonus: 55,  priceUsd: 300 },
  { id: 'p4', title: '文青超值包', coins: 590, bonus: 120, priceUsd: 590 },
  { id: 'p5', title: 'VIP獨享包', coins: 1190, bonus: 280, priceUsd: 1190 },
  { id: 'p6', title: '尊爵贊助包', coins: 1790, bonus: 460, priceUsd: 1790 },
];

const RIGHT_COLORS = ['#F2D4AE', '#F4B86F', '#F3A55D', '#F18F52', '#EF7D47', '#EA6A3E'];

export default function ShopScreen() {
  const navigation = useNavigation();

  const handlePressPack = (p: PackItem) => {
    console.log('buy pack:', p.id);
  };

  // icon 視覺高度（icon 32 + 上下餘量）：讓標題落在 icons 底下
  const TITLE_TOP_PADDING = 56; // 你也可微調成 52~64

  return (
    <SafeAreaView style={styles.safe}>
      {/* 左上角 blueeye（純展示，不占版面高度） */}
      <Image
        source={require('../../assets/blueeye.png')}
        style={[styles.leftIcon, { top: 8 }]}
        resizeMode="contain"
      />

      {/* 右上角 Profile（點擊跳個人頁） */}
      <Pressable
        onPress={() => navigation.navigate(routes.PROFILE as never)}
        hitSlop={8}
        style={[styles.profileBtn, { top: 8 }]}
      >
        <Image style={styles.profileIcon} source={require('../../assets/profile.png')} />
      </Pressable>

      {/* 標題 + 餘額（上下留空；且位於 icons 之下） */}
      <View style={[styles.headerRow, { paddingTop: TITLE_TOP_PADDING, paddingBottom: 18 }]}>
        <Text style={styles.title}>商城</Text>
        <View style={styles.balanceBox}>
          <Image style={styles.coin} source={require('../../assets/coin.png')} />
          <Text style={styles.balanceText}>50</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {PACKS.map((p, i) => (
          <PackCard
            key={p.id}
            data={p}
            onPress={handlePressPack}
            rightColor={RIGHT_COLORS[i % RIGHT_COLORS.length]}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#2b2f33' },

  // --- 左上角 blueeye（絕對定位，不佔版面高度）---
  leftIcon: {
    position: 'absolute',
    left: 12,
    width: 32,
    height: 32,
    zIndex: 10,
  },

  // --- 右上角 Profile（絕對定位）---
  profileBtn: {
    position: 'absolute',
    right: 12,
    zIndex: 10,
    padding: 6, // 擴大可點範圍
  },
  profileIcon: { width: 32, height: 32, borderRadius: 16 },

  // --- 標題區（上下留空；確保在 icons 下方）---
  headerRow: {
    alignItems: 'center',
    gap: 6,
  },
  title: { color: '#e7eef6', fontWeight: '700', fontSize: 18 },
  balanceBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  coin: { width: 18, height: 18 },
  balanceText: { color: '#e7eef6', fontWeight: '700' },

  list: { paddingHorizontal: 12, paddingBottom: 24, gap: 16 },
});
