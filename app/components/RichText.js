// components/RichText.js
// 將 " .... [c=tos]Terms of Service[/c] .... " 解析成多個 <Text> 片段
// 支援：顏色 map、按下事件 map（可導頁到 TOS / Privacy）

import React from "react";
import { Text } from "react-native";

/**
 * @param {object} props
 * @param {string} props.text - 含 [c=key]...[/c] 的原始字串
 * @param {object} [props.colorMap] - 例如 { tos: '#0abab5', pp: '#f0ad57' }
 * @param {object} [props.onPressMap] - 例如 { tos: ()=>openTOS(), pp: ()=>openPP() }
 * @param {object} [props.baseStyle] - 外層 <Text> 的基本樣式（字級、顏色等）
 * @param {object} [props.linkStyle] - 標記片段的額外樣式（例如加底線）
 */
export default function RichText({
  text,
  colorMap = {},
  onPressMap = {},
  baseStyle,
  linkStyle,
}) {
  const TAG = /\[c=([^\]]+)\]([\s\S]*?)\[\/c\]/g; // 取 key 與 內文
  const parts = [];
  let last = 0;
  let m;
  let idx = 0;

  while ((m = TAG.exec(text)) !== null) {
    const [full, key, inner] = m;
    const start = m.index;

    // 前段純文字
    if (start > last) {
      const plain = text.slice(last, start);
      parts.push(
        <Text key={`t-${idx++}`} style={baseStyle}>
          {plain}
        </Text>
      );
    }

    // 標記文字（可指定顏色／點擊）
    const color = colorMap[key];
    const onPress = onPressMap[key];
    parts.push(
      <Text
        key={`c-${idx++}`}
        style={[baseStyle, color ? { color } : null, linkStyle]}
        onPress={onPress}
        accessibilityRole={onPress ? "link" : undefined}
        suppressHighlighting
      >
        {inner}
      </Text>
    );

    last = start + full.length;
  }

  // 收尾剩餘純文字
  if (last < text.length) {
    parts.push(
      <Text key={`t-${idx++}`} style={baseStyle}>
        {text.slice(last)}
      </Text>
    );
  }

  // 最外層再包一層 <Text>，讓它能在父層中正常排版
  return <Text style={baseStyle}>{parts}</Text>;
}
