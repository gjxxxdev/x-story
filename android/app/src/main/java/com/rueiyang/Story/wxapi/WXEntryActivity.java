package com.rueiyang.Story.wxapi;

import android.app.Activity;
import android.os.Bundle;

// 如果你用的是 react-native-wechat-lib（little-snow-fox）
import com.wechatlib.WeChatLibModule;

// 如果你改用的是 react-native-wechat（其他分支），請改成：
// import com.reactnative.wechat.react.WeChatModule;

public class WXEntryActivity extends Activity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    WeChatLibModule.handleIntent(getIntent());
    finish();
  }
}
