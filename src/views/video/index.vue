<template>
  <div class="video-page">
    <video
        ref="playVideo"
        class="play-video"
        preload="auto"
        x5-video-player-type="h5-page"
        playsinline="playsinline"
        webkit-playsinline="true"
        loop
        :src="data[actIndex].video"
    ></video>
    <img @click="isShowPost = true" class="make-poster-btn" src="../../assets/video/make_poster_btn.png" alt="">
    <img @click="prev" class="prev-btn" src="../../assets/video/prev_btn.png" alt="">
    <img @click="next" class="next-btn" src="../../assets/video/next_btn.png" alt="">
    <img @click="showForm" class="reserve-btn" src="../../assets/video/reserve_btn.png" alt="">
    <p class="tips">9月23日纪录片《绽放》正式上线</p>

    <div class="reserve-container" v-show="isShowForm">
      <div class="reserve-wrap">
        <img class="reserve-bg" src="../../assets/video/reserve_bg.png" alt="">
        <img class="logo" src="../../assets/video/logo.png" alt="">
        <img class="reserve-title" src="../../assets/video/reserve_title.png" alt="">
        <input v-model="mobile" placeholder="请输入手机号" type="tel" maxlength="11" class="tel-input">
        <!-- <div class="submit-btn" @click="submit">
          <p class="btn-txt">提交</p>
        </div> -->
        <p class="sub-tips">填写手机号，接收开播提醒短信</p>
        <img @click="submit" class="reserve" src="../../assets/video/reserve.png" alt="">
        <img @click="isShowForm = false" class="close-btn" src="../../assets/video/close_btn.png" alt="">
      </div>
    </div>

    <div class="poster-container" v-if="isShowPost">
      <div class="poster-wrap">
        <img @click="isShowPost = false" class="close-poster" src="../../assets/video/close_poster.png" alt="">
        <img class="poster-bg" :src="data[actIndex].poster" alt="">
      </div>
    </div>
    <SoundMask :num="actIndex"  v-if="showSoundMask" @preClick="soundPreClick" @nextClick="soundNextClick" @closeSound="closeSound" />
  </div>
</template>

<script lang="ts">
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
import CryptoJS from "crypto-js";
import axios from "axios";
import video from '../../assets/video/video.mp4'
import poster from '../../assets/video/poster_bg.png'
import SoundMask from './components/soundMask.vue'
import poster1 from '../../assets/video/poster1.png'
import poster2 from '../../assets/video/poster2.png'
import poster3 from '../../assets/video/poster3.png'
import poster4 from '../../assets/video/poster4.png'
import poster5 from '../../assets/video/poster5.png'
import poster6 from '../../assets/video/poster6.png'
import poster7 from '../../assets/video/poster7.png'



export default defineComponent({
  name: "videoPage",
  components: {
    SoundMask
  },
  setup(props, { emit }: SetupContext) {
    const store = useStore();
    const { index } = store.state;
    let isShowForm = ref(false)
    let isShowPost = ref(false)
    let showSoundMask = ref(true)
    
    const playVideo = ref<any>(null)
    let mobile = ref('')
    const route = useRoute()
    const data = ref<any>([])
    const actIndex = ref<any>(0)

    actIndex.value = route.query.actIndex

    data.value = [
      {
        video: 'https://ali-v.cztv.com/cztv/vod/2023/09/23/479f08eafb6140c79d2cd0230fa1e5ab/h264_800k_mp4.mp4', // 总导演
        poster: poster1,
        audio: ''
      },
      {
        video: 'https://ali-v.cztv.com/cztv/vod/2023/09/23/b187c6809eb74230926a91ec22aa1107/h264_800k_mp4.mp4', // 芭蕾舞者
        poster: poster6,
        audio: ''
      },
      {
        video: 'https://ali-v.cztv.com/cztv/vod/2023/09/23/68d5118c4ca9451cb8a5d5d8258d7fd8/h264_800k_mp4.mp4', // 双人威亚
        poster: poster5,
        audio: ''
      },
      {
        video: 'https://ali-v.cztv.com/cztv/vod/2023/09/23/95dd64f040c24814a6ab04c435936a73/h264_800k_mp4.mp4', // 白鹭精灵
        poster: poster2,
        audio: ''
      },
      {
        video: 'https://ali-v.cztv.com/cztv/vod/2023/09/23/ec7d671f429d49dc9c0414235014209f/h264_800k_mp4.mp4', // 群演
        poster: poster3,
        audio: ''
      },
      {
        video: 'https://ali-v.cztv.com/cztv/vod/2023/09/23/1c66cac0b1fb45a08785420663d6704e/h264_800k_mp4.mp4', // 引导员
        poster: poster4,
        audio: ''
      },
      {
        video: 'https://ali-v.cztv.com/cztv/vod/2023/09/23/d04d0438b90f4fd7bdb708d9cd0a0c8e/h264_800k_mp4.mp4', // 旗手
        poster: poster7,
        audio: ''
      }
    ]

    const closeSound = ()=>{
      showSoundMask.value = false
      play()
    }

    const  soundPreClick = () =>{
      actIndex.value --
      if(actIndex.value < 0) {
        actIndex.value = 6
      }
    }

    const  soundNextClick = () =>{
      actIndex.value ++
      if(actIndex.value > 6) {
        actIndex.value = 0
      }
    }

    const prev = () => {
      actIndex.value --
      if(actIndex.value < 0) {
        actIndex.value = 6
      }
      setTimeout(() => {
        play()
      }, 500);
    }

    const next = () => {
      actIndex.value ++
      if(actIndex.value > 6) {
        actIndex.value = 0
      }
      setTimeout(() => {
        play()
      }, 500);
    }

    // 播放视频
    const play = () => {
      playVideo.value.play()
    }

    const showForm = () => {
      isShowForm.value = true
      play()
    }

    function randomString (e) {
      e = e || 32;
      var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
      for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
      return n;
    }

    // 提交手机号
    const submit = () => {
      if(!/^1[3456789][0-9]{9}$/.test(mobile.value)) {
        showToast('请输入正确的手机号！')
        return
      }
      let userSession = 'S10007829b9b1509f58f98b8b4d904f76e568'
      let now = new Date()
      let timestamp = Date.parse(now.toString()).toString().slice(0, -3);
      let once = randomString(8);
      let signature = CryptoJS.SHA1(
        CryptoJS.enc.Utf8.parse(userSession + once + timestamp),
        true
      ).toString(); //signature
      axios.post('https://zcatapi.cztv.com/api/enrollLists', {
        "enroll_id": 184, 
        "extra": {
          "string0": mobile.value
        } 
      }, {
        headers: {
          'Content-Type': "application/json",
          "userSession" : userSession,
          nonce: once,
          signature: signature,
          timestamp: timestamp,
        }
      }).then(() => {
        mobile.value = ''
        isShowForm.value = false
        showToast('预约成功！')
      })    
    }


    onMounted(async () => {
      // playVideo.value.play()
    });

    return {
      playVideo,
      isShowForm,
      isShowPost,
      showSoundMask,
      mobile,
      play,
      submit,
      data,
      actIndex,
      prev,
      next,
      closeSound,
      showForm,
      soundNextClick,
      soundPreClick
    }

    
  },
});
</script>

<style lang="scss" scoped >
.video-page {
  width: 100vw;
  height: 100vh;
  position: relative;
  .make-poster-btn {
    position: absolute;
    width: 156px;
    height: 40px;
    top: 26px;
    right: 33px;
  }
  .play-video {
    object-fit: fill;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #000;
  }
  .reserve-btn {
    position: absolute;
    width: 315px;
    height: 143px;
    bottom: 89px;
    left: 50%;
    transform: translateX(-55%);
  }
  .prev-btn {
    width: 186px;
    height: 106px;
    left: 27px;
    bottom: 107px;
    position: absolute;
  }
  .next-btn {
    width: 186px;
    height: 106px;
    right: 41px;
    bottom: 107px;
    position: absolute;
  }
  .tips {
    width: 100%;
    font-size: 30px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 40px;
    position: absolute;
    bottom: 63px;
  }
  .reserve-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.6);
    z-index: 20;
    .reserve-wrap {
      width: 583px;
      height: 642px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -60%);
    }
    .logo {
      width: 277px;
      height: 39px;
      top: 14px;
      left: 35px;
      position: absolute;
    }
    .reserve-bg {
      width: 100%;
      height: 100%;
    }
    .reserve-title {
      width: 200px;
      height: 112px;
      position: absolute;
      top: 40px;
      left: 192px;
    }
    .tel-input {
      width: 471px;
      height: 71px;
      background: #FFFFFF;
      box-shadow: inset 0px 4px 4px 0px rgba(0,0,0,0.25);
      border-radius: 10px 10px 10px 10px;
      appearance: none;
      outline: none;
      position: absolute;
      top: 192px;
      left: 55px;
      border: 0;
      box-sizing: border-box;
      padding: 18px;
      font-size: 30px;
    }
    .submit-btn {
      width: 102px;
      height: 71px;
      background: #FFFFFF;
      box-shadow: inset 0px 4px 4px 0px rgba(0,0,0,0.25);
      border-radius: 10px 10px 10px 10px;
      position: absolute;
      top: 192px;
      right: 57px;
      padding-top: 22px;
      box-sizing: border-box;
      .btn-txt {
        font-size: 30px;
        font-weight: 500;
        line-height: 35px;
        background: linear-gradient(100deg, #9815FF 0%, #569DD2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .sub-tips {
      position: absolute;
      width: 100%;
      top: 267px;
      font-size: 20px;
      font-weight: 400;
      color: #929292;
      line-height: 49px;
    }
    .reserve {
      width: 354px;
      height: 134px;
      position: absolute;
      bottom: 17px;
      left: 50%;
      transform: translateX(-50%);
    }
    .close-btn {
      width: 80px;
      height: 80px;
      bottom: -116px;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
    }
  }
  .poster-container {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.8);
    .poster-wrap {
      width: 618px;
      height: 1032px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .close-poster {
      width: 150px;
      height: 69px;
      top: -78px;
      right: 0;
      position: absolute;
    }
    .poster-bg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
