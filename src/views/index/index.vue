<template>
  <div class="picBox">
    <FirstPage v-if="index.nowPage  == 'first'"/>
    <SecondPage v-if="index.nowPage  == 'SecondPage'"/>

  </div>
</template>

<script lang="ts">
import GuideTips from "@/components/guideTips/index.vue"
import dayjs from 'dayjs' //日期库
import { wxShare } from "../../utils/wxUtils";
import FirstPage from "./components/firstPage.vue"
import SecondPage from "./components/second.vue"

import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  SetupContext,
  ref,
} from "vue";
import { getRecords, postSignUp, getList } from '@/api/resource'

import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { showToast } from 'vant';
import { throttle } from "@/utils/throttle";
import { getRadioList } from "@/utils/index"
export default defineComponent({
  name: "picPage",
  components: {
    FirstPage,
    SecondPage
  },
  setup(props, { emit }: SetupContext) {

    const childRef = ref(null);
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const isSignUp = ref(false);
    const { index } = store.state;

    onMounted(async () => {
      // const canContinue = isOnApp();
      if (window.navigator.userAgent.indexOf('chinablue') === -1) {
        initAppShare()
      }else{
        initWechatShare()
      }
    });

    function addEvent() {
      // 埋点上报start
     
    }


    const toSignClick = () => {

      const canContinue = isOnApp();
      if (!canContinue) { return }

      const user_session = window.sessionStorage.getItem('token') || "";
      if (!user_session) {
        handleLogin(() => {
          if (isSignUp.value) {
            const path = encodeURIComponent('https://zinteract.cztv.com/batrix-h5/luckydraw/?id=195')
            const route = `chinablue://cztvrouter/business/h5?path=${path}&displayBar=true`
            cztvApi.route(route)
          } else {
            showToast('点亮城市后，即可参加抽奖')
          }
        })
        return
      }

      if (isSignUp.value) {
        const path = encodeURIComponent('https://zinteract.cztv.com/batrix-h5/luckydraw/?id=195')
        const route = `chinablue://cztvrouter/business/h5?path=${path}&displayBar=true`
        cztvApi.route(route)
      } else {
        showToast('点亮城市后，即可参加抽奖')
      }
    }

    const getMyRecord = async () => {
      let res = await getRecords({ vote_id: 174 });
      isSignUp.value = res?.data?.length ? true : false
      if (res?.data?.length) {
      }
    }

    const unLockClick = () => {
      const canContinue = isOnApp();
      if (!canContinue) { return }

      let isInAct = isInActive()
      if (isInAct != 0) {
        showToast('未在活动时间范围内！')
        return
      }
      const user_session = window.sessionStorage.getItem('token') || "";
      if (!user_session) {
        handleLogin(() => { showToast('点亮城市，获得城市亚运徽章') })
        return
      }
      showToast('点亮城市，获得城市亚运徽章')
    }

    const initAppShare = () => {
      const shareData = {
        url: `https://ztv.cztv.com/ap/zt2023/newbluesound/index.shtml#/`,
        title: '听，那是“绽放”背后的秘密', //分享的标题
        content: '杭州亚运会开幕式揭秘', // 分享的文字
        img: ''
        // 'https://ohudong.cztv.com/1/266130/static/share.png'
      }
      cztvApi.changeShareInfo(shareData)
      cztvApi.showShareButton(true)
    }
    const initWechatShare = () => {
      wxShare(
        true,
        "听，那是“绽放”背后的秘密",
        "杭州亚运会开幕式揭秘",
        "听，那是“绽放”背后的秘密",
        "https://ztv.cztv.com/ap/zt2023/newbluesound/index.shtml#/",
        ""
      )
    }

    const jumoUpPage = throttle(async () => {
      // 埋点上报start
      window.collectEvent("activity_button_click", {
        // 活动页面曝光
        activity_id: 174, // 活动id
        activity_type: "", // 活动类型
        activity_name: '点亮亚运火炬', // 活动名称
        activity_url: 'https://ztv.cztv.com/ap/zt2023/lightcitytorch/index.shtml#/', // 活动链接
        activity_page_name: "", // 活动页面名称
        activity_button_name: "share_btn"
      });
      // 埋点上报end

      const canContinue = isOnApp();
      if (!canContinue) { return }
      cztvApi.share({
        url: 'https://ztv.cztv.com/ap/zt2023/lightcitytorch/index.shtml#/', //分享的网址链接
        title: "点亮亚运火炬", //分享的标题
        content: "为传递城市增添热力", // 分享的文字
        img: "https://ohudong.cztv.com/1/266094/static/share.png", // 分享的图片Url
      }, res => {
        console.log('share:', res)
        // res.code === 200 分享成功
      })
    }, 2000)

    const isInActive = () => {
      // 活动时间限制
      const { extra } = index.activeInfo
      let start_time = dayjs(extra.start_time).format('YYYY-MM-DD HH:mm');
      let end_time = dayjs(extra.end_time).format('YYYY-MM-DD HH:mm')

      // 比较一下开始时间和结束时间 
      const todayTemp = dayjs().format('YYYY-MM-DD HH:mm:ss');
      const startFlag = compareDate(todayTemp, dayjs(start_time).format('YYYY-MM-DD HH:mm:ss'));
      const endFlag = compareDate(dayjs(end_time).format('YYYY-MM-DD HH:mm:ss'), todayTemp);
      if (!startFlag) {
        return 1
      } else if (!endFlag) {
        return 2
      } else {
        return 0
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

    const getUserInfo = () => {
      cztvApi.userInfo(async res => {
        const data = JSON.parse(res);
        console.log(data, 'login data')
        // this.token = data.sessionId || ''
        if (data?.sessionId || '') {
          window.sessionStorage.setItem('token', data.sessionId)
          await getMyRecord()
        } else {
        }
      })
    }

    const handleLogin = (nextFn) => {
      cztvApi.userInfo(async res => {
        const data = JSON.parse(res);
        console.log(data, 'login data')
        // this.token = data.sessionId || ''
        if (data?.sessionId || '') {
          window.sessionStorage.setItem('token', data.sessionId)
          await getMyRecord()

          nextFn()
        } else {
          loginApp(nextFn)
        }
      })

      setTimeout(() => {
        const user_session = window.sessionStorage.getItem('token') || "";
        if (!user_session) {
          loginApp(nextFn)
        }
      }, 1000)
    }

    const loginApp = (nextFn) => {
      cztvApi.login(async res => {
        console.log('login', res)
        if (res?.code === 200) {
          cztvApi.userInfo(async res => {
            const data = JSON.parse(res);
            // this.token = data.sessionId || ''
            if (data.sessionId || '') {
              window.sessionStorage.setItem('token', data.sessionId)
              await getMyRecord()
              nextFn()
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
      index
    };
  },
});
</script>

<style lang="scss" scoped >
::-webkit-scrollbar {
  display: none;
}

.picBox {
  background-color: #FFF0EA;
  width: 750px;
  height: 100vh;
  position: relative;
  overflow-y: scroll;
}
</style>
