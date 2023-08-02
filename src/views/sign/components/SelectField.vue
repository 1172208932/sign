<script setup lang="ts">
import {
    ref,
} from "vue";

const groupResult = ref('');
const emit = defineEmits(['config'])
const showGroup = ref(false);
const onConfirmGroup = ({ selectedOptions }) => {
    groupResult.value = selectedOptions[0]?.text;
    emit('config',selectedOptions)
    showGroup.value = false;
};
const props = defineProps<{
    name: string,
    label: string,
    columns: any[]
}>();

const  clearText= ()=>{
    groupResult.value = ''
}
defineExpose({
    groupResult,
    clearText
})

</script>

<template>
    <div>
        <van-field v-model="groupResult" required is-link readonly :name="props.name" :label="props.label"
            :placeholder="'点击选择' + props.label" @click="showGroup = true"
            :rules="[{ required: true, message: '请选择' + props.label }]" />
        <van-popup v-model:show="showGroup" position="bottom">
            <van-picker :columns="props.columns" @confirm="onConfirmGroup" @cancel="showGroup = false" />
        </van-popup>
    </div>
</template>
