<template>
  <div class="picBox">
    <GuideTips ref="childRef" v-if="showGuideTips" />
    <div :class="{ indexBg: true, appTop: isApp, wxTop: !isApp }"></div>
    <div class="jump2">
    </div>
    <div class="jump-btn2" @click="jumoUpPage"></div>
    <success-pop :sid="sid" :radiolist="radioList" v-model:show="showPop" @closePop="backPopCall"></success-pop>
  </div>
</template>

<script lang="ts">
import GuideTips from "@/components/guideTips/index.vue"
import dayjs from 'dayjs' //日期库
import { wxShare } from "../../utils/wxUtils";
import SuccessPop from "@/components/successPop.vue";

import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  SetupContext,
  ref,
} from "vue";
import { getRecords } from '@/api/resource'

import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { showToast } from 'vant';
import { throttle } from "@/utils/throttle";
import { getRadioList } from "@/utils/index"
export default defineComponent({
  name: "picPage",
  components: {
    GuideTips,
    SuccessPop
  },
  setup(props, { emit }: SetupContext) {
    let showGuideTips = ref(false)
    const childRef = ref(null);
    const sid = ref('')
    const radioList = ref<any[]>([])
    const place = ref('')
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const isSignUp = ref(false)
    let showPop = ref<boolean>(false);
    const backPopCall = () => {
      showPop.value = false;
    }
    const state: {} = reactive({});

    const isApp = ref(false)


    const { index } = store.state;

    onMounted(async () => {
      // console.log(history.state.params?.from)
      // if(history.state.params?.from){
      //   console.log('showwwwwwwwwwwwwwwww')
      // }
      showGuideTips.value = window.navigator.userAgent.indexOf('chinablue') == -1
      if (window.navigator.userAgent.indexOf('chinablue') == -1) {
        initWechatShare()
        isApp.value = false
        console.log('weixin')
      } else {
        isApp.value = true
        initAppShare()
      }
      await store.dispatch("getActiveInfo");
      console.log(index.activeInfo)
    });

    const initAppShare = () => {
      const shareData = {
        url: `https://ztv.cztv.com/ap/zt2023/signupshoot/index.shtml#/`,
        title: '10万大奖 一球制胜', //分享的标题
        content: 'Z视介迎亚运大联投，一“战”到底', // 分享的文字
        img: 'https://ohudong.cztv.com/1/266056/static/share.png'
      }
      cztvApi.changeShareInfo(shareData)
      cztvApi.showShareButton(true)
    }
    const initWechatShare = () => {
      wxShare(
        true,
        "10万大奖 一球制胜",
        "Z视介迎亚运大联投，一“战”到底",
        "10万大奖 一球制胜",
        "https://ztv.cztv.com/ap/zt2023/signupshoot/index.shtml#/",
        "https://ohudong.cztv.com/1/266056/static/share.png"
      )
    }

    const jumoUpPage = throttle(() => {
      // router.replace({
      //     name: "upload",
      //   });
      //   return

      const canContinue = isOnApp();
      if (!canContinue) { return }

      let isInAct = isInActive()
      if (!isInAct) {
        showToast('未在活动时间范围内！')
        return
      }
      const user_session = window.sessionStorage.getItem('token') || "";
      if (!user_session) {
        handleLogin()
        return
      }
      nextStep()
    }, 2000)


    const nextStep = async () => {
      let res = await getRecords()
      if (res?.data?.length) {
        radioList.value = getRadioList(res?.data[0])
        sid.value = res?.data[0].id + '';
        showPop.value = true
      } else {
        router.replace({
          name: "upload",
        });
      }
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

    const handleLogin = () => {
      cztvApi.userInfo(res => {
        const data = JSON.parse(res);
        console.log(data, 'login data')
        // this.token = data.sessionId || ''
        if (data?.sessionId || '') {
          window.sessionStorage.setItem('token', data.sessionId)
          nextStep()
        } else {
          loginApp()
        }
      })

      setTimeout(() => {
        const user_session = window.sessionStorage.getItem('token') || "";
        if (!user_session) {
          loginApp()
        }
      }, 1000)
    }

    const loginApp = () => {
      cztvApi.login(res => {
        console.log('login', res)
        if (res?.code === 200) {
          cztvApi.userInfo(res => {
            const data = JSON.parse(res);
            // this.token = data.sessionId || ''
            if (data.sessionId || '') {
              window.sessionStorage.setItem('token', data.sessionId)
              nextStep()
            }
          })
          // this.$router.go(0)
        } else {
          showToast('登录失败请稍后再试一次！')
        }
      })
    }

    const isOnApp = () => {
      let canContinue = false;
      if (window.navigator.userAgent.indexOf('chinablue') === -1) {
        // showToast("请打开Z视介APP参与活动~");
        // @ts-ignore
        childRef!.value!.openApp()
        canContinue = false;
      } else {
        canContinue = true
      }
      return canContinue
    }

    return {
      ...toRefs(state),
      isApp,
      sid,
      childRef,
      showGuideTips,
      showPop,
      isSignUp,
      radioList,
      place,
      backPopCall,
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
  overflow-y: scroll;

  .appTop {
    top: 0%;
  }

  .wxTop {
    top: 108px;
  }

  .indexBg {
    background: url(../../assets/indexback.png) no-repeat;
    background-size: 750px 5610px;
    position: absolute;
    width: 750px;
    height: 5610px;
    left: 0%;
  }

  .jump2 {
    background: url(../../assets/indexBg.png) no-repeat;
    background-size: 750px 296px;
    position: fixed;
    bottom: 0;
    height: 296px;
    width: 750px;
    pointer-events: none;
  }

  .jump-btn2 {
    background: url(../../assets/index_btn.png) no-repeat;
    background-size: 750px 98px;
    width: 750px;
    height: 98px;
    position: fixed;
    bottom: 52px;
    margin: 146px auto 0px auto;
  }
}
</style>
