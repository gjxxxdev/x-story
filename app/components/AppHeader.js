import React from 'react';
import { View, StyleSheet, Image, Pressable, Text } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import routes from '../navigations/routes';

function AppHeader() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 左邊 Drawer 開關 */}
      <Pressable
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        hitSlop={8}
      >
        <Image
          style={styles.leftIcon}
          source={require('../../assets/blueeye.png')}
        />
      </Pressable>

      {/* 右邊 Profile + Coin */}
      <Pressable
        style={styles.rightContainer}
        onPress={() => navigation.navigate(routes.PROFILE)}
        hitSlop={8}
      >
        <Image style={styles.profileIcon} source={require('../../assets/profile.png')} />
        <View style={styles.coinRow}>
          <Image style={styles.coinIcon} source={require('../../assets/coin.png')} />
          <Text style={styles.coinText}>999</Text>
        </View>
      </Pressable>
      Ｆ
    </View>
  );
}

const HEADER_HEIGHT = 50;

const styles = StyleSheet.create({
  container: {
    width: '100%', // 撐滿整個螢幕
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // 左右分散
    paddingHorizontal: 10,
  },
  leftIcon: { width: 32, height: 32 },
  rightContainer: {
    alignItems: 'center',
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: 2,
  },
  coinRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinIcon: { width: 20, height: 20, marginRight: 4 },
  coinText: { fontSize: 16, fontWeight: 'bold', color: "#f0ad57", },
});

export default AppHeader;
