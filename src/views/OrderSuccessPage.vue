<script setup>
import { router } from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute();

// navigate
const goToHomePage = () => {
    router.push({ name: "homepage" });
}
const goToMenuPage = () => {
    router.push({ name: "menupage" });
}    
</script>

<template>
    <a-breadcrumb style="margin-bottom: 40px;">
        <a-breadcrumb-item>
            <span role="button" @click="goToHomePage">Trang Chủ</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <span>Thanh Toán Thành Công</span>
        </a-breadcrumb-item>
    </a-breadcrumb>

    <a-result status="success" title="THANH TOÁN ĐƠN HÀNG THÀNH CÔNG" style="margin-bottom: 50px;"
        sub-title="Cảm ơn bạn đã tin tưởng và ủng hộ Meow Foodie. Vui lòng chờ từ 2-3 ngày để đơn hàng được vận chuyển và giao đến tay bạn nhé.">
        <template #extra>
            <a-button @click="goToHomePage" key="console" type="primary">Trang Chủ</a-button>
            <a-button @click="goToMenuPage" key="buy">Tiếp Tục Mua</a-button>
        </template>
    </a-result>
</template>