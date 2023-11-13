
<script setup>
import { ref, reactive, computed, toRefs, watch } from 'vue';

// props
const props = defineProps({
    product: []
});
const { product } = toRefs(props);


// data
const productLocal = product?._object?.product;

</script>

<template>
    <a-card hoverable style="width: 280px; height: 360px">
        <a-row justify="center">
            <a-col style="margin: 20px 0px;">
                <a-image v-bind:src="`${productLocal?.image}`" :width="180" :height="180" :preview="false" :previewMask="false" />
            </a-col>
        </a-row>
        <a-row justify="center">
            <a-col span="20" align="center">
                <h6 style="margin-top: 15px; text-transform: uppercase; font-size: 18px; font-weight: 700;">{{ productLocal?.name }}</h6>
            </a-col>
        </a-row>
        <a-row justify="center">
            <a-col span="20" align="center">
                <h6 style="margin-bottom: 30px; font-size: 18px;">{{ productLocal?.price?.toLocaleString() }} VNĐ</h6>
            </a-col>
        </a-row>
    </a-card>
</template>
