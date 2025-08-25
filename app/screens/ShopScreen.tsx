import React from 'react';
import {
  SafeAreaView, View, Text, StyleSheet, Image, ScrollView,
} from 'react-native';
import AppHeader from '../components/AppHeader';
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
  const handlePressPack = (p: PackItem) => {
    // TODO: 串接支付流程
    console.log('buy pack:', p.id);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader />

      {/* 頁面標題 + 餘額 */}
      <View style={styles.headerRow}>
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
  headerRow: {
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
    paddingBottom: 6,
  },
  title: { color: '#e7eef6', fontWeight: '700', fontSize: 18 },
  balanceBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  coin: { width: 18, height: 18 },
  balanceText: { color: '#e7eef6', fontWeight: '700' },

  list: { paddingHorizontal: 12, paddingBottom: 24, gap: 16 },
});
