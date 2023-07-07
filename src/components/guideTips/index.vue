<template>
  <div class="guidetips van-hairline--bottom">
    <!-- 引导页APP 顶部导航 -->
    <div class="logotop logoshow">
      <img src="https://ohudong.cztv.com/1/265908/png/logo.224f53c6.png" class="bottomLogo" alt="">
      <div
        class="openAPPNOW"
        @click="openApp"
      >打开App</div>
    </div>
    <!-- 提示 在微信里面显示 -->
    <div
      class="cover"
      id="cover"
      v-if="showOpenInBrowserCover"
      @touchmove="handleTouchMove"
    >
      <div
        class="flex-img"
        id="flex"
      >
        <img
          class=""
          src="../../assets/open.png"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GuideTips",
  data () {
    return {
      showOpenInBrowserCover: false,//是否展示  在默认浏览器打开蒙层
    }
  },

  methods: {
    openApp () {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
      var isWeixin = u.toLowerCase().indexOf('micromessenger') !== -1; // 微信内
      var inQQ = /qq\s*\//i.test(u);
      if (inQQ) {
        this.showOpenInBrowserCover=true
      } else {
        if (isAndroid && isWeixin) {
        this.showOpenInBrowserCover=true
      }else{
        const iosScheme = {
          protocol: "ChinaBlueTV",
          host: "CallingAppFlag",
        };
      const androidScheme = {
        protocol: "chinablue",
        host: "cztvrouter",
      };
      const userAgent = window.navigator.userAgent || "";
      const options = {
        scheme: /iphone|ipad|ipod/i.test(userAgent) ? iosScheme : androidScheme,
        intent: {
          package: 'com.chinablue.tv',
          scheme: 'chinablue'
        },
        universal: {
          // host: "zmtv.cztv.com/ap/wap/download/index.shtml", //企业包
           host: "zmtv.cztv.com/ap/download/index.shtml", //正式包
        },
        appstore: "https://itunes.apple.com/cn/app/zhong-guo-lantv/id988616225?mt=8",
        yingyongbao: "https://a.app.qq.com/o/simple.jsp?pkgname=com.chinablue.tv",
        fallback: "https://zmtv.cztv.com/ap/download/index.shtml",
        timeout: 2000,
      };
      const callLib = new CallApp(options);
      callLib.open({
        param: {
          route: encodeURIComponent("chinablue://cztvrouter/business/h5?path=" + encodeURIComponent(window.location.href))
        }
      });
      }
      }
    
    
    },
    handleTouchMove (e) {
      e.stopPropagation();
      e.preventDefault();
    },
  },
  mounted () {
    // if (typeof stemFrom !== "undefined" && stemFrom !== "logout" && stemFrom !== null && stemFrom !== "") {
    //   this.isShowBottomFixed = false;
    // }
    // else {
    //   this.isShowBottomFixed = true;
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>