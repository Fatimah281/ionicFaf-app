package io.ionic.starter;

import com.getcapacitor.BridgeActivity;
import com.dutchoconcepts.capacitor.BarcodeScanner;

public class MainActivity extends BridgeActivity {
@Override
public void onCreate (Bundle savedInstanceState){
super.onCreate(savedInstanceState);

//bridge
this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
    add(BarcodeScanner.class);

}});
}

}
