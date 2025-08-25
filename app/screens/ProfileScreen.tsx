// app/screens/ProfileScreen.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Platform,
} from 'react-native';
import AppHeader from '../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import routes from '../navigations/routes';

// iOS/Android 原生日期選擇器
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

// 下拉式選單（性別）
import { Picker } from '@react-native-picker/picker';
export default function ProfileScreen() {
  const navigation = useNavigation();
  // ---- 狀態 ----
  const [name, setName] = useState<string>('Monica');
  const [birthday, setBirthday] = useState<Date>(new Date(1995, 7, 5)); // 月份 0-based => 8/5 請用 7
  const [gender, setGender] = useState<'female' | 'male' | 'other'>('female');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // ---- 事件：日期變更 ----
  const onChangeBirthday = (e: DateTimePickerEvent, date?: Date) => {
    // iOS 連續變更；Android 點確定才會回來
    if (Platform.OS === 'android') setShowDatePicker(false);
    if (date) setBirthday(date);
  };

  // ---- UI ----
  const birthdayText = `${birthday.getFullYear()}/${birthday.getMonth() + 1}/${birthday.getDate()}`;

  return (
    <SafeAreaView style={styles.safe}>
      {/* 自訂 TopBar */}
      <AppHeader />

      <View style={styles.container}>
        {/* 頭像（你可自行替換來源） */}
        <Image
          style={styles.avatar}
          source={require('../../assets/profile.png')}
        />

        {/* 金幣與操作列（示意，可依需求接上功能） */}
        <View style={styles.walletRow}>
          <View style={styles.coinRow}>
            <Image
              style={styles.coinIcon}
              source={require('../../assets/coin.png')}
            />
            <Text style={styles.coinText}>0</Text>
          </View>

          <Pressable
            style={styles.chargeBtn}
            onPress={() => navigation.navigate(routes.PURCHASE as never)} >
            <Text style={styles.chargeText}>加值</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate(routes.HISTORY as never)}>
            <Text style={styles.linkText}>查看紀錄</Text>
          </Pressable>
        </View>

        {/* 表單卡片區 */}
        {/* 名稱（鍵盤允許蓋住畫面，不使用 KeyboardAvoidingView） */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>名稱</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="請輸入名稱"
            placeholderTextColor="#9aa3ad"
            style={styles.input}
          // 不做額外鍵盤避讓設定
          />
        </View>

        {/* 生日（按一下開日期選擇器） */}
        <Pressable style={styles.inputRow} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.label}>生日</Text>
          <View style={styles.valueBox}>
            <Text style={styles.valueText}>{birthdayText}</Text>
            <Text style={styles.arrow}>{'>'}</Text>
          </View>
        </Pressable>

        {/* 性別（下拉式選單） */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>性別</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={gender}
              onValueChange={(v) => setGender(v)}
              dropdownIconColor="#cdd4db"
              style={styles.picker}
              itemStyle={{ color: '#e7eef6' }}
            >
              <Picker.Item label="女性" value="female" />
              <Picker.Item label="男性" value="male" />
              <Picker.Item label="其他 / 不透露" value="other" />
            </Picker>
          </View>
        </View>

        {/* 送出 CTA（示意） */}
        <Pressable style={styles.submitBtn} onPress={() => { }}>
          <Text style={styles.submitText}>完成並領取 50 金幣 🟡</Text>
        </Pressable>
      </View>

      {/* Android：按下列會跳出，選完自動關閉；iOS：顯示在頁面上（原生 Spinner/Calendar） */}
      {showDatePicker && (
        <DateTimePicker
          value={birthday}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeBirthday}
          maximumDate={new Date()} // 生日不超過今天
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ---- 全域底色 ----
  safe: {
    flex: 1,
    backgroundColor: '#2b2f33', // colors.homeBackground || 深色
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // ---- 頭像與錢包列 ----
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  coinRow: { flexDirection: 'row', alignItems: 'center' },
  coinIcon: { width: 22, height: 22, marginRight: 6 },
  coinText: { color: '#e7eef6', fontSize: 16, fontWeight: '700' },
  chargeBtn: {
    backgroundColor: '#ff3344',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  chargeText: { color: '#fff', fontWeight: '700' },
  linkText: { color: '#ffce6a', fontWeight: '600' },

  // ---- 表單列 ----
  inputRow: {
    backgroundColor: '#2c2f34',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  label: {
    color: '#9aa3ad',
    fontSize: 12,
    marginBottom: 6,
  },
  input: {
    color: '#e7eef6',
    fontSize: 16,
    backgroundColor: '#1f2226',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },

  // 生日顯示盒（右邊箭頭）
  valueBox: {
    backgroundColor: '#1f2226',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  valueText: { color: '#e7eef6', fontSize: 16 },
  arrow: { color: '#cdd4db', fontSize: 16 },

  // 性別選單容器
  pickerBox: {
    backgroundColor: '#1f2226',
    borderRadius: 8,
  },
  picker: {
    color: '#e7eef6',
    minHeight: 44,
    paddingVertical: 0
  },

  // CTA
  submitBtn: {
    marginTop: 8,
    backgroundColor: '#00a99d',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitText: {
    color: '#eafff9',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.3,
  },
});
