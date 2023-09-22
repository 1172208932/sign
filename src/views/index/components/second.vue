<template>
    <div class="scroll-box">
        <div class="first-page">
        </div>
        <div class="second-page" ref="canRef"></div>
    </div>
</template>
    
<script setup lang="ts">
import { showToast } from "vant";
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";

// import { postSignUp } from '@/api/resource'
const canRef = ref(null);

const emit = defineEmits(['closePop', 'closeAndOpenNext'])

let showPopup = ref<boolean>(false);


onMounted(() => {


})

onUnmounted(() => {
})







</script>
    
<style  lang="scss" >

</style>
