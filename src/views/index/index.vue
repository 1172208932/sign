<template>
  <div class="picBox">
    <GuideTips v-if="showGuideTips" />
    <div class="jump" @click="jumoUpPage"></div>
  </div>
</template>

<script lang="ts">
import GuideTips from "@/components/guideTips/index.vue"
import dayjs from 'dayjs' //日期库
import { wxShare } from "../../utils/wxUtils";

import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  SetupContext,
  ref,
} from "vue";

import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { showToast } from 'vant';

export default defineComponent({
  name: "picPage",
  components: {
    GuideTips
  },
  setup(props, { emit }: SetupContext) {
    let showGuideTips = ref(false)
    const router = useRouter();
    const store = useStore();

    const state: {} = reactive({});


    const { index } = store.state;

    onMounted(async () => {
      showGuideTips.value = window.navigator.userAgent.indexOf('chinablue') == -1
      if(window.navigator.userAgent.indexOf('chinablue')== -1){
        initWechatShare()
        console.log('weixin')
      }else{
        initAppShare()
      }
      await store.dispatch("getActiveInfo");
      console.log(index.activeInfo)
    });

    const initAppShare = ()=>{
      const shareData = {
        url: `https://ztv.cztv.com/ap/zt2023/signsoundh5/index.shtml#/`,
        title:'越韵新声，唱响中国“好声音”', //分享的标题
        content:'《中国好声音·越剧特别季》第二季荣耀归来', // 分享的文字
        img:'https://ohudong.cztv.com/1/266034/static/share.png'
      }
      cztvApi.changeShareInfo(shareData)
      cztvApi.showShareButton(true)
    }

    const initWechatShare = ()=>{
      wxShare(
        true,
        "越韵新声，唱响中国“好声音”",
        "《中国好声音·越剧特别季》第二季荣耀归来",
        "越韵新声，唱响中国“好声音”",
        "https://ztv.cztv.com/ap/zt2023/signsoundh5/index.shtml#/",
        "https://ohudong.cztv.com/1/266034/static/share.png"
      )
    }

    const jumoUpPage = () => {
      const canContinue = isOnApp();
      if (!canContinue) { return }

      let isInAct = isInActive()
      if (!isInAct) {
        showToast('未在活动时间范围内！')
        return
      }
      const user_session = window.sessionStorage.getItem('token') || "";
      if(!user_session){
        handleLogin()
        return
      }
      
      router.replace({
        name: "upload",
      });
    }

    const isInActive = () => {
      // 活动时间限制
      const { extra } = index.activeInfo
      let start_time = dayjs(extra.start_time).format('YYYY-MM-DD HH:mm');
      let end_time = dayjs(extra.end_time).format('YYYY-MM-DD HH:mm')

      // 比较一下开始时间和结束时间 
      const todayTemp = dayjs().format('YYYY-MM-DD HH:mm:ss');
      const startFlag = compareDate(todayTemp, dayjs(start_time).format('YYYY-MM-DD HH:mm:ss'));
      const endFlag = compareDate(dayjs(end_time).format('YYYY-MM-DD HH:mm:ss'), todayTemp);
      if (startFlag && endFlag) {
        return true
      } else {
        return false
      }
    }

    const compareDate = (date1, date2) => {
      const dayJsDate1 = dayjs(date1);
      const dayJsDate2 = dayjs(date2);
      // console.log('dayJsDate1 = ', dayJsDate1);
      // console.log('dayJsDate2 = ', dayJsDate2);
      if (dayJsDate1.toDate() > dayJsDate2.toDate()) {
        // console.log('大于');
        return true; //第一个大
      } else {
        // console.log('小于');
        return false; //第二个大
      }
    }

    const openApp = () => {


    }

    const handleLogin = () => {
      cztvApi.login(res => {
        console.log('login', res)
        if (res.code === 200) {
          cztvApi.userInfo(res => {
            const data = JSON.parse(res);
            // this.token = data.sessionId || ''
            if (data.sessionId || '') {
              window.sessionStorage.setItem('token', data.sessionId)
            }
          })
          // this.$router.go(0)
        } else {

        }
      })
      cztvApi.userInfo(res => {
        const data = JSON.parse(res);
        // this.token = data.sessionId || ''
        if (data.sessionId || '') {
          window.sessionStorage.setItem('token', data.sessionId)
        }
      })
    }

    const isOnApp = () => {
      let canContinue = false;
      if (window.navigator.userAgent.indexOf('chinablue') === -1) {
        showToast("请打开Z视介APP参与活动~");
        canContinue = false;
      } else {
        canContinue = true
      }
      return canContinue
    }



    return {
      ...toRefs(state),
      showGuideTips,
      jumoUpPage

    };
  },
});
</script>

<style lang="scss" scoped >
.picBox {
  width: 750px;
  height: 100vh;
  position: relative;

  .jump {
    width: 127px;
    height: 60px;
    position: fixed;
    left: 0%;
    top: 50%;
    background-color: red;
  }
}
</style>
