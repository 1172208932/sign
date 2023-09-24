<template>
  <el-config-provider>
    <transition name="fade">
      <div class="boxx">
          <router-view #="{ Component, route }">
            <KeepAlive>
              <component :is="Component" :key="route.path" />
            </KeepAlive>
          </router-view>
        <div v-show="showAnimation" id="canvas9" class="lottie-container"></div>
        
      </div>
    </transition>
  </el-config-provider>
</template>
<script>
// @ts-ignore
// @ts-ignore
import { ref, watch, onMounted, nextTick } from 'vue';
// @ts-ignore
import lottie from 'lottie-web';
import tranfrom from './t2.json'
import { useRouter } from 'vue-router';
import EventBus from '@/utils/eventbus';

export default {
  setup() {
    const showAnimation = ref(false);
    // @ts-ignore
    // @ts-ignore
    const router = useRouter();
    let animation
    // watch(() => router.currentRoute.value,(to, from) => {
    //   return false
    //   setTimeout(() => {
    //         router.push(to.fullPath);
    //       }, 2000); // 延时时间根据需要进行调整
    // },{ immediate: true });

    // const beforeRouteLeave = (to, from, next) => {
    //   showAnimation.value = true;
    //   debugger
    //   setTimeout(() => {
    //     next();
    //   }, 500); // 延迟时间根据动画时长进行调整
    // };


    const showAni = async () => {
      showAnimation.value = true
      await nextTick()

      // @ts-ignore
      return new Promise((resolve, reject) => {
        animation.play();
        animation.addEventListener('enterFrame', (event) => {

          if (event.currentTime >= 25) {
            // animation.pause();
            resolve('22222')
          }
        });
        return false
      });
      // @ts-ignore

    }
    onMounted(async () => {
      // document.body.addEventListener('touchmove', function(e) {
      //     if(e._isScroller) return;
      //     // 阻止默认事件
      //     e.preventDefault();
      // }, {
      //     passive: false
      // });

      EventBus.on('SHOW_ANI', showAni, this)
      animation = lottie.loadAnimation({
        // @ts-ignore
        container: document.getElementById('canvas9'),
        // Lottie动画的配置选项
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: tranfrom,
      });
      animation.addEventListener('complete', () => {
        showAnimation.value = false
        animation.goToAndPlay(0, true);
        animation.setDirection(1); // 设置动画播放方向为正向
      });
    });

    return {
      showAnimation,
    };
  },

  beforeUnmount() {
    // 在组件卸载前销毁Lottie动画
    lottie.destroy();
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.lottie-container {
  z-index: 2090;
  width: 400%;
  height: 100vh;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  top: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  padding: 0;
  margin: 0;
}

body {
  background: #eae6df;
  overscroll-behavior-y: none;
}

.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-leave-active {
  transition: none;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}</style>
