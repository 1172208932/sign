<template>
  <div class="picBox">
    <GuideTips ref="childRef" v-if="showGuideTips" />
    <div :class="{ indexBg: true, appTop: isApp, wxTop: !isApp }">
      <div class="top-img">
        <div class="top-t1">点亮亚运火炬</div>
        <div class="top-t2">活动时间：9月1日 — 9月22日</div>
      </div>
      <div class="center-img-box">
        <div class="center-img">
          <CityItem class="p1" title="杭州"></CityItem>
          <CityItem class="p2" title="湖州"></CityItem>
          <CityItem class="p3" title="嘉兴"></CityItem>
          <CityItem class="p4" title="绍兴"></CityItem>
          <CityItem class="p5" title="宁波"></CityItem>
          <CityItem class="p6" title="舟山"></CityItem>
          <CityItem class="p7" title="台州"></CityItem>
          <CityItem class="p8" title="温州"></CityItem>
          <CityItem class="p9" title="丽水"></CityItem>
          <CityItem class="p10" title="金华"></CityItem>
          <CityItem class="p11" title="衢州"></CityItem>
        </div>
      </div>
      <div class="medal-img"></div>
      <div v-if="actStatus == 1" class="actbtn01">活动未开始</div>
      <div v-if="actStatus == 2" class="actbtn01">活动已结束</div>
      <div v-if="actStatus == 0" class="actbtn02" @click="jumoUpPage">邀请好友点亮城市火炬</div>
      <div class="list-box">
        <div class="list-t1">城市热力值排行榜</div>
        <div class="list-t2">点亮亚运火炬，为城市增加热力值</div>
        <div v-if="actStatus != 1" v-for="(item, index) in cityList" key="item.id" :class="{
          listItem: true,
          firtsItem: index == 0,
          secondItem: index == 1,
          thirdItem: index == 2,
        }">{{ item.title }}</div>
        <div v-else class="unList">
          <div class="unlist-tip">暂无榜单数据</div>
        </div>
      </div>
    </div>
    <SurePop v-model:show="showSurePop" @closePop="backSurePopCall"></SurePop>
    <success-pop v-model:show="showPop" @closePop="backPopCall"></success-pop>
  </div>
</template>

<script lang="ts">
import GuideTips from "@/components/guideTips/index.vue"
import dayjs from 'dayjs' //日期库
import { wxShare } from "../../utils/wxUtils";
import SuccessPop from "@/components/successPop.vue";
import SurePop from "@/components/surePop.vue";
import CityItem from "./cityItem.vue";

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
    GuideTips,
    SuccessPop,
    CityItem,
    SurePop
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
    let showSurePop = ref<boolean>(false);

    const backSurePopCall = () => {
      showSurePop.value = false;
    }
    const backPopCall = () => {
      showPop.value = false;
    }
    const state: {} = reactive({});
    const actStatus = ref(0) // 0 进行中 1 未开始 2 已结束
    const isApp = ref(false)
    const cityList = ref([])


    const { index } = store.state;

    onMounted(async () => {
      // showPop.value = true
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
      let listres = await getList({
        group: '',
        sort: 'vote',
        pageSize: 800
      })
      cityList.value = listres
      actStatus.value = isInActive()
      console.log(actStatus.value)
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

    const jumoUpPage = throttle(async () => {
      // router.replace({
      //     name: "upload",
      //   });
      //   return



      // 调用SDK的getToken接口，通过接口回调的方式获取token
      // wm && wm.getToken('d38b59d1634344de990a5e75c4fdfad5', async (token) => {
      //   // 提交点赞业务请求            
      //   await postSignUp({
      //     num: '1',
      //     vote_item_id: 531,
      //     vote_id: 105,
      //     token,
      //   })
      // });
      // return

      const canContinue = isOnApp();
      if (!canContinue) { return }

      let isInAct = isInActive()
      if (isInAct != 0) {
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
      await getRecords()
      return


      wm && wm.getToken('d38b59d1634344de990a5e75c4fdfad5', async (token) => {
        // 提交点赞业务请求            
        await postSignUp({
          num: '1',
          vote_item_id: 531,
          vote_id: 105,
          token,
        })
      });

      return

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
      actStatus,
      cityList,
      sid,
      childRef,
      showGuideTips,
      showPop,
      showSurePop,
      isSignUp,
      radioList,
      place,
      backPopCall,
      backSurePopCall,
      jumoUpPage

    };
  },
});
</script>

<style lang="scss" scoped >
::-webkit-scrollbar {
  display: none;
}

.p1 {
  position: absolute;
  left: 350px;
  top: 250px;
}

.p2 {
  position: absolute;
  left: 480px;
  top: 40px;
}

.p3 {
  position: absolute;
  left: 750px;
  top: 74px;
}

.p4 {
  position: absolute;
  left: 700px;
  top: 284px;
}

.p5 {
  position: absolute;
  left: 970px;
  top: 284px;
}

.p6 {
  position: absolute;
  left: 1070px;
  top: 134px;
}

.p7 {
  position: absolute;
  left: 860px;
  top: 494px;
}

.p8 {
  position: absolute;
  left: 660px;
  top: 744px;
}

.p9 {
  position: absolute;
  left: 360px;
  top: 664px;
}

.p10 {
  position: absolute;
  left: 480px;
  top: 444px;
}

.p11 {
  position: absolute;
  left: 160px;
  top: 494px;
}

.picBox {
  background-color: #FFF0EA;
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

  .medal-img {
    background: url(../../assets/unlock.png) no-repeat;
    background-size: 135px 139px;
    width: 135px;
    height: 139px;
    position: absolute;
    right: 31px;
    top: 270px;
  }

  .actbtn01 {
    width: 428px;
    height: 80px;
    background: linear-gradient(180deg, #EBE9EA 0%, #AA9A9D 100%);
    border-radius: 40px;
    position: absolute;
    right: 161px;
    top: 1125px;
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 80px;
    text-align: center;
  }

  .actbtn02 {
    width: 428px;
    height: 80px;
    background: linear-gradient(180deg, #FE709E 0%, #FC3D65 100%);
    border-radius: 40px;
    position: absolute;
    right: 161px;
    top: 1125px;
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 80px;
    text-align: center;
  }

  .indexBg {
    // background: url(../../assets/indexback.png) no-repeat;
    // background-size: 750px 5284px;
    position: absolute;
    width: 750px;
    left: 0%;

    .top-img {
      background: url(../../assets/index_top.png) no-repeat;
      background-size: 750px 330px;
      width: 750px;
      height: 330px;
      position: absolute;
      overflow: hidden;
      top: -76px;

      .top-t1 {
        margin-top: calc(97px + 76px);
        font-size: 60px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 84px;
        width: 100vw;
        text-align: center;
      }

      .top-t2 {
        margin-top: 4px;
        font-size: 28px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 40px;
        width: 100vw;
        text-align: center;
      }
    }
  }

  .center-img-box {
    width: 750px;
    height: 936px;
    overflow-x: scroll;
    // overflow-y: hidden;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    /* 允许滑动 */
    position: absolute;
    top: calc(330px - 76px);

    .center-img {
      background: url(../../assets/center-img.png) no-repeat;
      background-size: 1377px 979px;
      width: 1377px;
      height: 979px;
    }
  }

  .list-box {
    position: absolute;
    top: 1262px;
    width: 750px;
    min-height: 620px;
    background: #FEFAF9;
    border-radius: 50px 50px 0px 0px;

    .list-t1 {
      font-size: 46px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #262626;
      line-height: 65px;
      width: 100vw;
      text-align: center;
      margin-top: 40px;
      margin-bottom: 10px;
    }

    .list-t2 {
      font-size: 24px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #7F7F7F;
      line-height: 24px;
      width: 100vw;
      text-align: center;
      margin-bottom: 50px;
    }
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


  .listItem {
    margin-left: 66px;
    width: 620px;
    height: 66px;
    border-radius: 33px;
    margin-bottom: 16px;
    line-height: 66px;
    font-weight: 500;
    font-size: 32px;
    color: #2A2A2A;
  }

  .unList {
    background: url(../../assets/no-list.png) no-repeat;
    background-size: 360px 175px;
    width: 360px;
    height: 175px;
    margin-left: 195px;
    margin-top: 124px;

    .unlist-tip {
      font-size: 30px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #D48EA1;
      line-height: 24px;
      width: 360px;
      text-align: center;
      padding-top: calc(44px + 175px);
    }
  }

  .firtsItem {
    background-color: #F34D68;
    color: #FFFFFF;
  }

  .secondItem {
    background-color: #FF718C;
    color: #FFFFFF;
  }

  .thirdItem {
    background-color: #FF9194;
    color: #FFFFFF;
  }

}
</style>
