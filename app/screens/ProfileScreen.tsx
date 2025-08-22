import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AppHeader from '../components/AppHeader';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';
import routes from '../navigations/routes';

type Gender = '女' | '男' | null;

/** helpers: 確保永遠回傳有效 Date（避免傳到原生是 invalid/nil） */
function toValidDate(d?: Date | null): Date {
  const fallback = new Date();
  if (!d) return fallback;
  return Number.isFinite(d.getTime()) ? d : fallback;
}
function getDefaultBirthday() {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 18);
  return d;
}
function formatDateTW(d: Date) {
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return `${y}年 ${m}月 ${day}日`;
}

export default function ProfileScreen() {
  // 僅能往前：Step1 -> Step2
  const [step, setStep] = useState<1 | 2>(1);
  const navigation = useNavigation<any>();

  // 轉輪/彈窗的暫存值（永遠是有效 Date）
  const [tempBirthday, setTempBirthday] = useState<Date>(getDefaultBirthday());
  // 按「確定」後才生效的生日（用於顯示與提交，可以為 null）
  const [birthday, setBirthday] = useState<Date | null>(getDefaultBirthday());

  const [gender, setGender] = useState<Gender>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Android 日期彈窗
  const [showDatePicker, setShowDatePicker] = useState(false);

  // 提交條件：僅 Step2 且生日+性別皆有
  const canSubmit = step === 2 && !!birthday && !!gender;
  const mainBtnLabel = hasSubmitted ? '更新' : '完成並領取 50 代幣';

  // Android 白卡中的顯示字串
  const displayBirthday = useMemo(
    () => (birthday ? formatDateTW(birthday) : '請選擇生日'),
    [birthday]
  );

  /** iOS/Android onChange：只更新 temp，不直接動已確認的 birthday */
  function onChangeDate(event: DateTimePickerEvent, selectedDate?: Date) {
    if (event.type === 'set' && selectedDate) {
      const safe = toValidDate(selectedDate);
      setTempBirthday(safe);
    }
    if (Platform.OS === 'android') setShowDatePicker(false);
  }

  /** Android 打開日期彈窗 */
  function openAndroidDatePicker() {
    if (Platform.OS === 'android') setShowDatePicker(true);
  }

  /** Step1「確定」：把 temp 寫入 birthday，然後進 Step2（不可回上一步） */
  function confirmBirthdayAndGoNext() {
    if (!tempBirthday || !Number.isFinite(tempBirthday.getTime())) return;
    setBirthday(toValidDate(tempBirthday));
    setStep(2);
  }

  /** Step1「取消」：清除已確認生日 */
  function cancelBirthday() {
    setBirthday(null);
    if (Platform.OS === 'android') setShowDatePicker(false);
  }

  /** 底部主按鈕：提交（無「下一步」） */
  async function onSubmit() {
    if (!canSubmit) return;
    // TODO: 呼叫你的 API
    // await api.updateProfile({ birthday: birthday!.toISOString().slice(0, 10), gender });
    setHasSubmitted(true);
  }

  /** 稍後填寫：回 MAIN，並防呆 route 名稱 */
  function onSkip() {
    const routeName = (routes as any)?.MAIN ?? 'MAIN';
    navigation.navigate(routeName);
  }

  // 安全的 props（避免把 nil/invalid 傳進去）
  const safePickerValue = toValidDate(tempBirthday);
  const safeMaxDate = toValidDate(new Date());

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader />

      <View style={styles.body}>
        {/* 置頂文案（靠上） */}
        <Text style={styles.banner}>完成基本資料，免費送 50 枚代幣！</Text>

        {/* 中段置中：大標 + 卡片 + 紅字 */}
        <View style={styles.middle}>
          <Text style={styles.bigTitle}>{step === 1 ? '您的生日' : '您的性別'}</Text>

          <View style={styles.card}>
            {step === 1 ? (
              <>
                {/* 視覺需求：顯示今天日期 */}
                <Text style={styles.sectionTitle}>{formatDateTW(new Date())}</Text>

                {Platform.OS === 'ios' ? (
                  // iOS 內嵌轉輪（spinner）
                  <View style={styles.iosWheelWrap}>
                    <DateTimePicker
                      value={safePickerValue}         // ← 永遠不是 null/invalid
                      mode="date"
                      display="spinner"
                      onChange={onChangeDate}
                      maximumDate={safeMaxDate}       // ← 也做一次保護
                      style={styles.iosWheel}
                    />
                  </View>
                ) : (
                  // Android：白卡中點擊開原生彈窗
                  <Pressable style={styles.selector} onPress={openAndroidDatePicker}>
                    <Text style={styles.selectorLabel}>{displayBirthday}</Text>
                  </Pressable>
                )}

                {/* 下方工具列：取消／確定（確定才進入性別步驟） */}
                <View style={styles.toolbar}>
                  <Pressable onPress={cancelBirthday}>
                    <Text style={styles.toolbarBtn}>取消</Text>
                  </Pressable>
                  <Pressable onPress={confirmBirthdayAndGoNext}>
                    <Text style={styles.toolbarBtn}>確定</Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.sectionTitle}>請選擇性別</Text>
                <View style={styles.genderRow}>
                  <Choice label="女" active={gender === '女'} onPress={() => setGender('女')} />
                  <Choice label="男" active={gender === '男'} onPress={() => setGender('男')} />
                </View>

                {/* 視覺占位（維持卡片高度平衡） */}
                <View style={styles.toolbar}>
                  <Text style={styles.toolbarGhost}>　</Text>
                  <Text style={styles.toolbarGhost}>　</Text>
                </View>
              </>
            )}
          </View>

          {/* 紅字提醒在白卡外 */}
          <Text style={styles.warning}>* 一旦註冊成功，將無法修改</Text>
        </View>

        {/* 底部固定：主按鈕（從一開始就顯示，但需 Step2 + 生日 + 性別 才可按）＋ 稍後填寫 */}
        <View style={styles.footer}>
          <Pressable
            onPress={onSubmit}
            disabled={!canSubmit}
            style={[styles.primaryBtn, !canSubmit && styles.primaryBtnDisabled]}
          >
            <Text style={styles.primaryBtnText}>{mainBtnLabel}</Text>
          </Pressable>

          <Pressable onPress={onSkip} hitSlop={8} style={styles.skipWrap}>
            <Text style={styles.skipText}>稍後填寫</Text>
          </Pressable>
        </View>
      </View>

      {/* ANDROID 日期彈窗（同樣綁 safePickerValue） */}
      {Platform.OS === 'android' && showDatePicker && (
        <DateTimePicker
          value={safePickerValue}
          mode="date"
          display="default"
          onChange={onChangeDate}
          maximumDate={safeMaxDate}
        />
      )}
    </SafeAreaView>
  );
}

/** 性別小元件 */
function Choice({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.choice, active && styles.choiceActive]}>
      <Text style={[styles.choiceText, active && styles.choiceTextActive]}>{label}</Text>
    </Pressable>
  );
}

/** Styles */
const ACCENT = '#0abab5';
const DARK_BG = colors.homeBackground || '#0b0d12';

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: DARK_BG },

  body: {
    flex: 1,
    paddingHorizontal: 18,
  },

  // 置頂活動文案
  banner: {
    marginTop: 10,
    marginBottom: 10,
    color: '#e8f0f7',
    fontSize: 24,
    fontWeight: '600',
    alignSelf: 'center',
  },

  // 中段置中區域
  middle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 110, // 預留底部按鈕空間
  },

  // 大標微往上，貼近白卡
  bigTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 8,
    transform: [{ translateY: -6 }],
  },

  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },

  sectionTitle: {
    color: '#147d7a',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },

  // iOS 轉輪容器
  iosWheelWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iosWheel: { alignSelf: 'center', width: '100%' },

  // Android 的白卡日期選擇顯示欄位（置中）
  selector: {
    width: '100%',
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#2a2f3a33',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectorLabel: {
    color: ACCENT,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  // 工具列（取消／確定）
  toolbar: {
    width: '100%',
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e6e8eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toolbarBtn: {
    color: ACCENT,
    fontSize: 16,
    fontWeight: '700',
    paddingHorizontal: 8,
  },
  toolbarGhost: { color: 'transparent' },

  // 性別選擇
  genderRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 6,
  },
  choice: {
    minWidth: 110,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2f3a33',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  choiceActive: { backgroundColor: '#e6faf8', borderColor: ACCENT },
  choiceText: { color: '#333', fontSize: 16, fontWeight: '800' },
  choiceTextActive: { color: '#0c807b' },

  // 紅色提醒
  warning: {
    marginTop: 10,
    color: '#cc3a3a',
    fontSize: 12,
  },

  // 底部固定操作區
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 12,
    alignItems: 'center',
  },
  primaryBtn: {
    width: '90%',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: ACCENT,
    alignItems: 'center',
  },
  primaryBtnDisabled: { backgroundColor: '#7c8b93' },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.3,
  },

  skipWrap: { alignSelf: 'flex-end', marginTop: 8, marginRight: '5%' },
  skipText: { color: '#f6a21a', fontSize: 14, fontWeight: '800' },
});
