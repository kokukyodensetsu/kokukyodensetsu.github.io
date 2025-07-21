// ローディング画面のHTMLとCSSを挿入
document.write(`
  <div class="loader">
    <p class="txt">ローディング中</p>
  </div>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Hina+Mincho&display=swap');
    *{color: white; margin: 0; padding: 0; text-align: center; display: 0 auto; font-family: "Hina Mincho", sans-serif; font-weight: 500; font-style: normal;}
    .loader {
      position: fixed;
      width: 100%;
      height: 100vh;
      background-color: #fff;
      z-index: 9999;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .loader,p.txt {
      font-size: 45px;
      font-weight: bold;
      color: rgb(30, 50, 93);
      background-color: rgb(255, 255, 255);
    }
  </style>
`);

// ページ読み込み完了後にローディング画面を非表示にする
window.addEventListener('load', function () {
  setTimeout(function () {
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.style.transition = 'opacity 0.8s ease';
      loader.style.opacity = '0';
      setTimeout(function () {
        loader.remove();
      }, 800); // フェードアウト完了後にDOMから削除
    }
  }, 500); // ロード完了後に0.5秒表示
});
