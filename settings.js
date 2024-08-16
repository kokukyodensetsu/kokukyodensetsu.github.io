const WoditorGameSettings = {
    projectId: "kokukyo_densetsu",                  // ブラウザの保存先に利用されます(一応日本語でも可)
    projectName: "虚空教伝説~異世界編~", // タイトルバーに表示されます
    // 画面サイズはゲーム内容から自動設定されるようになりました
    noSystemTouch: false,                     // false 何もしない true ブラウザウディタが用意したタッチ操作を無効化してマウスエミュレート
    requestFullScreen: false,                 // false 何もしない true ゲーム起動時に↓方向のフルスクリーン化を試みる(iOS無効)
    lockOrientation: "landscape-primary",     // 固定する画面方向(フルスクリーン時のみ有効) 
    /* undefined(引用符なし/全画面のみ) "landscape-primary"(通常横)、"landscape-secondary"(逆横) "portrait-primary"(通常縦) "portrait-secondary"(逆縦)*/
}
