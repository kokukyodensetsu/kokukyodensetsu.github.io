/*Code develop by shunp*/
document.write(`
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Hina+Mincho&display=swap');
        *{font-family: "Hina Mincho", sans-serif; font-weight: 500; font-style: normal; margin:0; padding:0;}
        .title {margin-right: auto; position: relative; left: calc(50% - 50px);}
        .logo{height: 50px; border-radius: 10px; box-shadow: 0px 0px 15px -5px #3f3f3f;}
        .menu-item {list-style: none; display: inline-block; padding: 10px;}
        .drawer_hidden {display: none;}
        .drawer_open {display: flex; height: 60px; width: 60px; justify-content: center; align-items: center;position: relative;z-index: 100;cursor: pointer;}
        .drawer_open span, .drawer_open span:before, .drawer_open span:after {content: '';display: block;height: 3px;width: 25px;border-radius: 3px;background: #333;transition: 0.5s;position: absolute;}
        .drawer_open span:before {bottom: 8px;}
        .drawer_open span:after {top: 8px;}
        #drawer_input:checked ~ .drawer_open span {background: rgba(255, 255, 255, 0);}
        #drawer_input:checked ~ .drawer_open span::before {bottom: 0;transform: rotate(45deg);}
        #drawer_input:checked ~ .drawer_open span::after {top: 0;transform: rotate(-45deg);}
        .nav_content {width: 100%;height: 100%;position: fixed;top: 0; left: 100%;  z-index: 99;background: #fff; transition: .5s;}
        .nav_list {list-style: none;}
        header{box-shadow: 0px 10px 14px 0px rgba(0, 0, 0, 0.57);position: sticky;top: 0; background-color: rgba(255, 255, 255, 0.700);display: flex; height: 100px;align-items: center;width: 100%;}
        #drawer_input:checked ~ .nav_content {left: 0;/* メニューを画面に入れる */}
        .s_link_mother{position: relative; top: calc( 100vh - 250px );}
        #menu-text{position: relative;bottom: 17px;}
        .h_text{font-size:25px; margin: 10px;}
        .hamburger{display: none;}
        @media screen and (max-width: 1200px) {
            .nav{display:none;}
            .hamburger{display: block;}
        }
        @media (prefers-color-scheme: dark) {
            .drawer_open span, .drawer_open span:before, .drawer_open span:after{background: rgb(236, 236, 236);}
            .nav_content{background:rgb(0,0,0);}
            .h_text{color: white;}
            header{background-color: rgba(0, 0, 0, 0.7); }
            .header_link{color: white;}
        }
    </style>
    <header>
        <a class="title" href="/"><img class="top_logo" src="/img/logo.png" alt="ロゴ"></a>
    </header>
`);