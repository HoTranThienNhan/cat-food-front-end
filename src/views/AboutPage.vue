<script setup>

import { useAuthStore } from '@/stores/auth.store';
import { router } from '@/router';
import { CaretRightOutlined } from '@ant-design/icons-vue';

const authStore = useAuthStore();
const user = authStore?.user;

// navigate
const goToHomePage = () => {
    router.push({ name: "homepage" });
}
</script>

<template>
    <div>
        <a-breadcrumb style="margin-bottom: 20px; margin-top: 50px;">
            <a-breadcrumb-item>
                <span role="button" @click="goToHomePage">Trang Chủ</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                <span>Giới Thiệu</span>
            </a-breadcrumb-item>
        </a-breadcrumb>

        <a-row justify="center" style="position: relative;">
            <a-image src="/src/assets/cat-food-about.jpg" :preview="false" :width="400" />
            <h2 style="position: absolute; top: 85%;">GIỚI THIỆU</h2>
        </a-row>

        <a-row justify="center" style="margin-top: 30px;">
            <a-col span="14" style="font-size: 18px;">
                <CaretRightOutlined /> <b>Meow Foodie</b> luôn sẵn lòng cung cấp cho những chú mèo của bạn những món ăn đảm bảo chất lượng về độ an
                toàn, hương vị và phù hợp với từng giai đoạn khác nhau.
            </a-col>
        </a-row>

        <a-row justify="center" style="margin-top: 20px;">
            <a-col span="14" style="font-size: 18px;">
                <CaretRightOutlined /> <b>Meow Foodie</b> luôn đồng hành trong suốt chặng đường từ giai đoạn mèo con đến khi trưởng thành. Chúng
                tôi không ngừng hợp tác với các nhãn hàng chất lượng nhằm nâng cao chế độ dinh dưỡng và chăm sóc cho mèo
                ngày một tốt hơn.
            </a-col>
        </a-row>

        <a-row justify="center" style="margin-top: 20px;">
            <a-col span="14" style="font-size: 18px;">
                <CaretRightOutlined /> Chúng tôi biết và hiểu tình yêu thương to lớn bạn dành cho mèo cưng của mình. Biết rằng mỗi bạn mèo đều có
                tinh thần độc lập cao nhưng vẫn cần được yêu thương và chăm sóc đúng cách. Chúng tôi tin cách tốt nhất để
                bạn biết cách chăm sóc mèo cưng là hiểu được những bản năng tự nhiên nhất của loài mèo.
            </a-col>
        </a-row>

        <a-row justify="center" style="margin-top: 20px; margin-bottom: 30px;">
            <a-col span="14" style="font-size: 18px;">
                <CaretRightOutlined /> Chúng tôi đảm bảo tất cả các bữa ăn đều đầy đủ và cân bằng dưỡng chất tự nhiên để mèo cưng của bạn sống khỏe
                mạnh và hạnh phúc hơn.
            </a-col>
        </a-row>
    </div>
</template>

<style></style>
