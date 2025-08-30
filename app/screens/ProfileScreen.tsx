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
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import routes from '../navigations/routes';

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // ---- 狀態 ----
  const [name, setName] = useState<string>('Monica');
  const [birthday, setBirthday] = useState<Date>(new Date(1995, 7, 5));
  const [gender, setGender] = useState<'female' | 'male' | 'other'>('female');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // ---- 事件：日期變更 ----
  const onChangeBirthday = (e: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') setShowDatePicker(false);
    if (date) setBirthday(date);
  };

  const birthdayText = `${birthday.getFullYear()}/${birthday.getMonth() + 1}/${birthday.getDate()}`;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.topBar, { paddingTop: 8 }]}>
        <Pressable onPress={() => navigation.navigate(routes.PROFILE as never)} hitSlop={8}>
          <Image style={styles.profileIconTop} source={require('../../assets/blueeye.png')} />
        </Pressable>
      </View>

      <View style={styles.container}>
        {/* 頭像 */}
        <Image style={styles.avatar} source={require('../../assets/profile.png')} />

        {/* 操作列（已移除金幣顯示 coinRow） */}
        <View style={styles.walletRow}>
          <Pressable style={styles.chargeBtn} onPress={() => navigation.navigate(routes.PURCHASE as never)}>
            <Text style={styles.chargeText}>加值</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate(routes.HISTORY as never)}>
            <Text style={styles.linkText}>查看紀錄</Text>
          </Pressable>
        </View>

        {/* 名稱 */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>名稱</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="請輸入名稱"
            placeholderTextColor="#9aa3ad"
            style={styles.input}
          />
        </View>

        {/* 生日 */}
        <Pressable style={styles.inputRow} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.label}>生日</Text>
          <View style={styles.valueBox}>
            <Text style={styles.valueText}>{birthdayText}</Text>
            <Text style={styles.arrow}>{'>'}</Text>
          </View>
        </Pressable>

        {/* 性別 */}
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

        {/* CTA */}
        <Pressable style={styles.submitBtn} onPress={() => {}}>
          <Text style={styles.submitText}>完成並領取 50 金幣 🟡</Text>
        </Pressable>
      </View>

      {/* 日期選擇器 */}
      {showDatePicker && (
        <DateTimePicker
          value={birthday}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeBirthday}
          maximumDate={new Date()}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ---- 全域底色 ----
  safe: { flex: 1, backgroundColor: '#2b2f33' },

  // ---- 左上角 TopBar ----
  topBar: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  profileIconTop: { width: 32, height: 32, borderRadius: 16 },

  // ---- 內容 ----
  container: { flex: 1, paddingHorizontal: 16 },

  // ---- 頭像 ----
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
  },

  // ---- 操作列（已移除 coinRow）----
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  chargeBtn: {
    backgroundColor: '#ff3344',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  chargeText: { color: '#fff', fontWeight: '700' },
  linkText: { color: '#ffce6a', fontWeight: '600' },

  // ---- 表單 ----
  inputRow: {
    backgroundColor: '#2c2f34',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  label: { color: '#9aa3ad', fontSize: 12, marginBottom: 6 },
  input: {
    color: '#e7eef6',
    fontSize: 16,
    backgroundColor: '#1f2226',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },

  // ---- 生日盒 ----
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

  // ---- 性別選單 ----
  pickerBox: { backgroundColor: '#1f2226', borderRadius: 8 },
  picker: { color: '#e7eef6', minHeight: 44, paddingVertical: 0 },

  // ---- CTA ----
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
