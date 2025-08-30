import React from 'react';
import {
  SafeAreaView, View, Text, StyleSheet, Image, ScrollView,
} from 'react-native';

type CoinLog = {
  id: string;
  title: string;
  date: string;
  amount: number;
  note?: string;
};

const COIN_BALANCE = 50;

const COIN_LOGS: CoinLog[] = [
  { id: 'c1', title: '小鎮失蹤手冊一解鎖', date: '2025.07.17', amount: -89 },
  { id: 'c2', title: '高效閱讀包（￥68）', date: '2025.07.15', amount: +300, note: 'Bonus +55' },
  { id: 'c3', title: '帳號升級獎勵', date: '2025.07.15', amount: +50 },
];

export default function CoinHistoryScreen({ embedded = false }: { embedded?: boolean }) {
  const Wrapper: any = embedded ? View : SafeAreaView;

  return (
    <Wrapper style={styles.safe}>

      <View style={styles.header}>
        <Text style={styles.title}>金幣紀錄</Text>
        <View style={styles.balanceRow}>
          <Image style={styles.coin} source={require('../../assets/coin.png')} />
          <Text style={styles.balanceText}>{COIN_BALANCE}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {COIN_LOGS.map((log) => (
          <View key={log.id} style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.rowTitle}>{log.title}</Text>
              {!!log.note && <Text style={styles.note}>{log.note}</Text>}
              <Text style={styles.date}>{log.date}</Text>
            </View>

            <View style={styles.right}>
              <Text
                style={[
                  styles.amount,
                  log.amount >= 0 ? styles.plus : styles.minus,
                ]}
              >
                {log.amount >= 0 ? `+${log.amount}` : `${log.amount}`}
              </Text>
              <Image style={styles.coinMini} source={require('../../assets/coin.png')} />
            </View>
          </View>
        ))}
      </ScrollView>
    </Wrapper>
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
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  eyeIcon: { width: 40, height: 40 },

  header: { alignItems: 'center', paddingTop: 8, paddingBottom: 6 },
  title: { color: '#e7eef6', fontWeight: '700', fontSize: 18, marginBottom: 6 },
  balanceRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  coin: { width: 18, height: 18 },
  balanceText: { color: '#e7eef6', fontWeight: '700' },

  list: { paddingTop: 6, paddingHorizontal: 16, paddingBottom: 24, gap: 18 },

  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  left: { flexShrink: 1, paddingRight: 8 },
  rowTitle: { color: '#e7eef6', fontSize: 15, fontWeight: '700', marginBottom: 2 },
  note: { color: '#ffffff', opacity: 0.85, fontSize: 13, fontWeight: '700' },
  date: { color: '#a6afba', fontSize: 12, marginTop: 6 },

  right: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  amount: { fontWeight: '800', fontSize: 18 },
  plus: { color: '#B6F07B' },
  minus: { color: '#e9e9e9' },
  coinMini: { width: 18, height: 18 },
});
