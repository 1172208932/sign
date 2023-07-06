<template>
  <div class="box">
    <div class="intor">
      <div class="write-bg"></div>
      <div class="baner-box b-top1">
        <img src="../../assets/banner1.jpg" alt="">
        <div class="down-time">下载证书</div>
        <div class="down-btn" @click="submit">下载</div>
      </div>
      <div class="baner-box b-top2">
        <img src="../../assets/banner1.jpg" alt="">
        <div class="down-time">下载证书</div>
        <div class="down-btn">下载</div>
      </div>
      <!-- <div @click="join" class="btn"></div> -->
    </div>
    <check-phone v-model:show="showCheckPop"  @closePop="backCloseCall"></check-phone>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  SetupContext,
  ref,
} from "vue";
import { showToast } from 'vant';
import axios from "axios";
import { wxShare } from "../../utils/wxUtils";
import CryptoJS from "crypto-js";
import CheckPhone from "@/components/CheckPhone.vue"
// import cztvApi from './ztvApi.d.ts'

let isFirst = false
export default defineComponent({
  name: "gameIndex",
  components: {
    CheckPhone
  },
  setup(props, { emit }: SetupContext) {
    let showCheckPop = ref<boolean>(false)
    let mobile = ref('')

    const init = () => {
    };

    const handleLogin = () =>{
      cztvApi.login(res => {
        console.log('login', res)

      })
    }

    const join = () =>{
      // 获取原始图片的URL
      const isTextUrl = import.meta.env.VITE_RESOURCE_URL;
      
        const originalImageUrl = `${isTextUrl}bg.png`;

        // 创建一个Canvas元素
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 创建一个Image元素用于加载原始图片
        const image = new Image();

        // 加载原始图片
        image.onload = () => {
          // 设置Canvas的尺寸与原始图片一致
          canvas.width = image.width;
          canvas.height = image.height;

          // 在Canvas上绘制原始图片
          ctx!.drawImage(image, 0, 0);

          // 添加文字
          ctx!.font = '24px Arial';
          ctx!.fillStyle = 'red';
          ctx!.fillText('Hello, World!', 50, 50);

          // 将Canvas内容转换为DataURL
          const dataUrl = canvas.toDataURL('image/jpeg');

          // 创建一个下载链接
          const downloadLink = document.createElement('a');
          downloadLink.href = dataUrl;
          downloadLink.download = 'processed_image.jpg';

          // 触发下载
          downloadLink.click();
        };

        // 设置Image元素的src为原始图片的URL
        image.src = originalImageUrl;

    }

    const backCloseCall = ()=>{
      showCheckPop.value = false
    }

    const submit = () => {
      showCheckPop.value = true
      // console.log(mobile.value);
      // if(!/^1[3456789][0-9]{9}$/.test(mobile.value)) {
      //   showToast('请输入正确的手机号！')
      //   return
      // }     
    }

    onMounted(async () => {
      init()
      wxShare(
        true,
        "这恋综看得我老脸一红",
        "点击预约《当我们遇见你》，解锁全熟恋爱方式",
        "这恋综看得我老脸一红",
        "https://ztv.cztv.com/ap/zt2023/meetyou/index.shtml", 
        "https://ohudong.cztv.com/1/265926/images/share.jpg"
      )
    });

    return {
      showCheckPop,
      backCloseCall,
      mobile,
      init,
      join,
      submit
    };
  },
});
</script>

<style lang="scss">
@import "./style/common";
</style>
