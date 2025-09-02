package kr.co.causwv2.twa;

import android.os.Bundle;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    

    WebView webView = getBridge().getWebView();
    if (webView != null) {
      webView.getSettings().setTextZoom(100);
    }
  }
}