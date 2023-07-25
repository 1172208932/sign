<script setup lang="ts">
import {
    ref,
} from "vue";

const groupResult = ref('');

const showGroup = ref(false);
const onConfirmGroup = ({ selectedOptions }) => {
    groupResult.value = selectedOptions[0]?.text;
    showGroup.value = false;
};
const props = defineProps({
    name: String,
    label: String,
    columns: Array
});

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
