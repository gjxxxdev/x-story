// app/screens/PurchaseHistoryScreen.tsx
import React from 'react';
import {
  SafeAreaView, View, Text, StyleSheet, ScrollView, Image, Pressable, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import routes from '../navigations/routes';

type Purchase = {
  id: string;          // 收據編號
  amountNTD: number;   // 交易額度（NTD）
  productName: string; // 交易商品名稱
  purchasedAt: string; // 交易時間（yyyy.MM.dd HH:mm）
};

// 範例資料
const PURCHASES: Purchase[] = [
  { id: 'GPA.1234-5678-9012-34567', amountNTD: 300, productName: '高效閱讀包', purchasedAt: '2025.07.15 14:31' },
  { id: 'GPA.9876-5432-1098-76543', amountNTD: 590, productName: '文青超值包', purchasedAt: '2025.07.15 14:45' },
  { id: 'GPA.0000-1111-2222-33333', amountNTD: 1790, productName: '尊爵贊助包', purchasedAt: '2025.07.20 10:08' },
];

export default function PurchaseHistoryScreen({ embedded = false }: { embedded?: boolean }) {
  const Wrapper: any = embedded ? View : SafeAreaView;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <Wrapper style={styles.safe}>
      {/* 右上角 Profile（取代 AppHeader；embedded 時不顯示） */}
      {!embedded && (
        <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
          <Pressable onPress={() => navigation.navigate(routes.PROFILE as never)} hitSlop={8}>
            <Image style={styles.profileIcon} source={require('../../assets/profile.png')} />
          </Pressable>
        </View>
      )}

      <View style={styles.header}>
        <Text style={styles.title}>購買記錄</Text>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {PURCHASES.map((p) => (
          <View key={p.id} style={styles.card}>
            <Row label="收據編號" value={p.id} mono />
            <Row label="交易額度 (NTD)" value={`$${p.amountNTD}`} strong />
            <Row label="交易商品名稱" value={p.productName} />
            <Row label="交易時間" value={p.purchasedAt} />
          </View>
        ))}
      </ScrollView>
    </Wrapper>
  );
}

function Row({ label, value, strong, mono }: { label: string; value: string; strong?: boolean; mono?: boolean }) {
  return (
    <View style={rowStyles.row}>
      <Text style={rowStyles.label}>{label}</Text>
      <Text
        style={[rowStyles.value, strong && rowStyles.strong, mono && rowStyles.mono]}
        numberOfLines={2}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#2b2f33' },

  // 右上角 Profile 容器
  topBar: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  profileIcon: { width: 32, height: 32, borderRadius: 16 },

  header: { alignItems: 'center', paddingTop: 8, paddingBottom: 6 },
  title: { color: '#e7eef6', fontWeight: '700', fontSize: 18 },
  list: { paddingHorizontal: 16, paddingVertical: 8, gap: 12 },
  card: {
    backgroundColor: '#34383d',
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
});

const rowStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  label: { color: '#9aa3ad', width: 110, fontSize: 13 },
  value: { color: '#e7eef6', flex: 1, fontSize: 15 },
  strong: { fontWeight: '800' },
  mono: { fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }) as any },
});
