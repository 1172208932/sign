<template>
  <div class="picBox">
    <GuideTips ref="childRef" v-if="showGuideTips" />
    <div :class="{ indexBg: true, appTop: isApp, wxTop: !isApp }">
      <div class="top-img">
        <div class="click-topbox" @click="toSignClick"></div>
        <!-- <div class="top-t1">点亮亚运火炬</div>
        <div class="top-t2">活动时间：9月1日 — 9月22日</div> -->
      </div>
      <div class="index-bg"></div>
      <div class="center-img-box" id="scrollableDiv">
        <div class="center-img">
          <CityItem class="p1" @click="() => { cityClick('杭州') }" title="杭州"></CityItem>
          <CityItem class="p2" @click="() => { cityClick('湖州') }" title="湖州"></CityItem>
          <CityItem class="p3" @click="() => { cityClick('嘉兴') }" title="嘉兴"></CityItem>
          <CityItem class="p4" @click="() => { cityClick('绍兴') }" title="绍兴"></CityItem>
          <CityItem class="p5" @click="() => { cityClick('宁波') }" title="宁波"></CityItem>
          <CityItem class="p6" @click="() => { cityClick('舟山') }" title="舟山"></CityItem>
          <CityItem class="p7" @click="() => { cityClick('台州') }" title="台州"></CityItem>
          <CityItem class="p8" @click="() => { cityClick('温州') }" title="温州"></CityItem>
          <CityItem class="p9" @click="() => { cityClick('丽水') }" title="丽水"></CityItem>
          <CityItem class="p10" @click="() => { cityClick('金华') }" title="金华"></CityItem>
          <CityItem class="p11" @click="() => { cityClick('衢州') }" title="衢州"></CityItem>
        </div>
      </div>
      <div v-if="!isSignUp" class="medal-img" @click="unLockClick"></div>
      <div v-else class="medal-img2" @click="showSuccessDialog"></div>

      <div v-if="actStatus == 1" class="actbtn01"></div>
      <div v-if="actStatus == 2" class="actbtn03">活动已结束</div>
      <div v-if="actStatus == 0 && isSignUp" class="actbtn02" @click="jumoUpPage"></div>
      <div class="list-box">
        <!-- <div class="list-t1">城市热力值排行榜</div>
        <div class="list-t2">点亮亚运火炬，为城市增加热力值</div> -->
        <div v-if="actStatus != 1" v-for="(item, index) in cityList" key="item.id" :class="{
          listItem: true
        }">
          <div style="display:flex">
            <div :class="{
              'item-t1': item.rank > 3,
              firtsItem: item.rank == 1,
              secondItem: item.rank == 2,
              thirdItem: item.rank == 3,
            }">{{ item.rank > 3 ? item.rank : '' }}</div>
            <span style="color: #231344;">{{ item.title }}</span>
          </div>
          <div style="display:flex; margin-right: 30px;">
            <div class="icon-people"></div> <span style="color: #5F5C65;" class="item-t2"> {{
              item.total * 100 }}</span>
          </div>
        </div>
        <div v-else class="unList">
          <div class="unlist-tip">暂无榜单数据</div>
        </div>
      </div>
    </div>
    <SurePop :selectCityId="selectCityId"  :cityName="clickCity" v-model:show="showSurePop" @closeAndOpenNext="backSurePopAndOpenCall"
      @closePop="backSurePopCall"></SurePop>
    <success-pop v-model:show="showPop" :cityName="selectCity" @closePop="backPopCall"></success-pop>
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
    const signupTimes = ref(0)
    let showPop = ref<boolean>(false);
    let showSurePop = ref<boolean>(false);

    const selectCity = ref('')
    const clickCity = ref('')

    function nonenumerable(target, name, descriptor) {

      return descriptor;
    }

    const backSurePopCall = () => {
      showSurePop.value = false;
    }

    const backSurePopAndOpenCall = () => {
      showSurePop.value = false;
      showPop.value = true
      getCityList()
      getMyRecord()
    }
    const backPopCall = () => {
      showPop.value = false;
    }
    const showSuccessDialog = () => {
      showPop.value = true;

    }
    const state: {} = reactive({});
    const actStatus = ref(0) // 0 进行中 1 未开始 2 已结束
    const isApp = ref(false)
    const cityList = ref<any[]>([])
    let selectCityId = ref(0) // 所选城市id

    const { index } = store.state;

    onMounted(async () => {
      var scrollableDiv = document.getElementById("scrollableDiv");
      scrollableDiv.scrollLeft = 100;

      showGuideTips.value = window.navigator.userAgent.indexOf('chinablue') == -1
      if (window.navigator.userAgent.indexOf('chinablue') == -1) {
        initWechatShare()
        isApp.value = false
        console.log('weixin')
      } else {
        isApp.value = true
        initAppShare()
        getUserInfo()
      }
      await store.dispatch("getActiveInfo");
      getCityList()
      actStatus.value = isInActive()

      addEvent()
    });

    function addEvent() {
      // 埋点上报start
      window.collectEvent("activity_page_display", {
        // 活动页面曝光
        activity_id: 174, // 活动id
        activity_type: "", // 活动类型
        activity_name: '点亮亚运火炬', // 活动名称
        activity_url: 'https://ztv.cztv.com/ap/zt2023/lightcitytorch/index.shtml#/', // 活动链接
        activity_page_name: "", // 活动页面名称
      });
      // 埋点上报end
    }

    let timer

    // 获取城市列表
    const getCityList = async () => {
      let listres = await getList({
        group: '',
        sort: 'vote',
        pageSize: 800
      })
      cityList.value = listres

      clearTimeout(timer)

      timer = setTimeout(() => {
        getCityList()
      }, 10000)
    }

    const toSignClick = () => {

      window.collectEvent("activity_button_click", {
        // 活动页面曝光
        activity_id: 174, // 活动id
        activity_type: "", // 活动类型
        activity_name: '点亮亚运火炬', // 活动名称
        activity_url: 'https://ztv.cztv.com/ap/zt2023/lightcitytorch/index.shtml#/', // 活动链接
        activity_page_name: "", // 活动页面名称
        activity_button_name: "tosign_btn"
      });

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
      signupTimes.value = res?.data?.length
      if (res?.data?.length) {
        selectCity.value = res?.data[0]?.vote_item?.title || ''
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

    const cityClick = (title) => {

      const canContinue = isOnApp();
      if (!canContinue) { return }

      let isInAct = isInActive()
      if (isInAct != 0) {
        showToast('未在活动时间范围内！')
        return
      }

      clickCity.value = title

      const user_session = window.sessionStorage.getItem('token') || "";
      if (!user_session) {
        handleLogin(() => {
          nextTick(() => {
              selectCityId.value = cityList.value.filter(item => {
                return item.title == title
              })[0].id
              showSurePop.value = true
          })
        })
        return
      }
      nextTick(() => {
          selectCityId.value = cityList.value.filter(item => {
            return item.title == title
          })[0].id
          showSurePop.value = true
      })
    }

    const initAppShare = () => {
      const shareData = {
        url: `https://ztv.cztv.com/ap/zt2023/lightcitytorch/index.shtml#/`,
        title: '点亮亚运火炬', //分享的标题
        content: '为传递城市增添热力', // 分享的文字
        img: 'https://ohudong.cztv.com/1/266094/static/share.png'
      }
      cztvApi.changeShareInfo(shareData)
      cztvApi.showShareButton(true)
    }
    const initWechatShare = () => {
      wxShare(
        true,
        "点亮亚运火炬",
        "为传递城市增添热力",
        "点亮亚运火炬",
        "https://ztv.cztv.com/ap/zt2023/lightcitytorch/index.shtml#/",
        "https://ohudong.cztv.com/1/266094/static/share.png"
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
      ...toRefs(state),
      isApp,
      selectCityId,
      clickCity,
      actStatus,
      cityList,
      sid,
      childRef,
      showGuideTips,
      showPop,
      showSurePop,
      isSignUp,
      signupTimes,
      radioList,
      place,
      selectCity,
      toSignClick,
      showSuccessDialog,
      cityClick,
      unLockClick,
      backPopCall,
      backSurePopCall,
      backSurePopAndOpenCall,
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
  left: 300px;
  top: 320px;
}

.p2 {
  position: absolute;
  left: 480px;
  top: 110px;
}

.p3 {
  position: absolute;
  left: 740px;
  top: 124px;
}

.p4 {
  position: absolute;
  left: 670px;
  top: 378px;
}

.p5 {
  position: absolute;
  left: 930px;
  top: 364px;
}

.p6 {
  position: absolute;
  left: 1110px;
  top: 264px;
}

.p7 {
  position: absolute;
  left: 820px;
  top: 564px;
}

.p8 {
  position: absolute;
  left: 630px;
  top: 754px;
}

.p9 {
  position: absolute;
  left: 350px;
  top: 704px;
}

.p10 {
  position: absolute;
  left: 485px;
  top: 470px;
}

.p11 {
  position: absolute;
  left: 140px;
  top: 504px;
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

  .medal-img2 {
    background: url(../../assets/icon.png) no-repeat;
    background-size: 135px 139px;
    width: 135px;
    height: 139px;
    position: absolute;
    right: 31px;
    top: 270px;
  }

  .actbtn01 {
    width: 422px;
    height: 84px;
    background: url(../../assets/new-index-button1.png) no-repeat;
    background-size: 422px 84px;

    position: absolute;
    right: 164px;
    top: 1125px;
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 80px;
    text-align: center;
  }

  .actbtn03 {
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
    width: 422px;
    height: 84px;
    background: url(../../assets/new-index-button2.png) no-repeat;
    background-size: 422px 84px;
    position: absolute;
    right: 164px;
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

      .click-topbox {
        position: absolute;
        right: 70px;
        top: 195px;
        width: 120px;
        height: 120px;
        // background-color: rgba($color: #000000, $alpha: .5);
      }

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

  .index-bg {
    background: url(../../assets/background.png) no-repeat;
    background-size: 750px 1294px;
    width: 750px;
    height: 1294px;
    position: absolute;
    top: calc(330px - 76px);
  }

  .center-img-box {

    width: 750px;
    height: 934px;
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
    background: url(../../assets/new-rankbg.png) no-repeat;
    background-size: 750px 1584px;
    position: absolute;
    top: 1262px;
    width: 750px;
    min-height: 620px;
    // background: #FEFAF9;
    border-radius: 50px 50px 0px 0px;
    padding-top: 180px;

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
    display: flex;
    justify-content: space-between;
    background: url(../../assets/new-rank.png) no-repeat;
    background-size: 702px 81px;
    margin-left: 24px;
    width: 702px;
    height: 81px;
    // border-radius: 33px;
    margin-bottom: 16px;
    line-height: 81px;
    font-weight: 500;
    font-size: 32px;
    color: #2A2A2A;
    text-align: left;

    .item-t1 {
      background-color: #7F7F7F;
      color: #FFFFFF;
      font-size: 24px;
      border-radius: 20px;
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      margin-top: 24px;
      margin-left: 30px;
      margin-right: 30px;
    }

    .icon-people {
      background: url(../../assets/new-score.png) no-repeat;
      background-size: 28px 48px;
      width: 28px;
      height: 48px;
      margin-top: 20px;
      // margin-left: 370px;
      margin-right: 10px;
    }

    .item-t2 {}
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
    background: url(../../assets/new-1.png) no-repeat;
    background-size: 38px 48px;
    width: 38px;
    height: 48px;
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 30px;
    background-color: transparent !important;
  }

  .secondItem {
    background: url(../../assets/new-2.png) no-repeat;
    background-size: 38px 48px;
    background-color: transparent !important;
    width: 38px;
    height: 48px;
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 30px;

  }

  .thirdItem {
    background: url(../../assets/new-3.png) no-repeat;
    background-size: 38px 48px;
    background-color: transparent !important;
    width: 38px;
    height: 48px;
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 30px;

  }

}
</style>
