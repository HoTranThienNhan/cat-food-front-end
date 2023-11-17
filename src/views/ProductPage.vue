<script setup>
import { useCartStore } from '@/stores/cart.store';
import { useAuthStore } from '@/stores/auth.store';
import ProductService from "@/services/product.service";
import ReviewService from "@/services/review.service";
import UserService from "@/services/user.service";
import { ref, toRefs, onMounted, watch, reactive } from 'vue';
import { router } from '@/router';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';

const route = useRoute();

const authStore = useAuthStore();
const user = authStore?.user;


// props
let product = ref(null);
const loading = ref(false);
const amountValue = ref(1);
const { id: productId } = route?.params;

// methods
const getProductDetails = async (id) => {
    try {
        product.value = await ProductService.getProductDetails(id);
    } catch (error) {
        console.log(error);
        router.push({
            name: "notfoundpage",
            params: {
                pathMatch: route.path.split("/").slice(1)
            },
            query: route.query,
            hash: route.hash,
        });
    }
}
const averageStar = ref(0);
const countRating = ref(0);
let reviewProduct = ref([]);
const getReviewsByProduct = async (id) => {
    try {
        const data = await ReviewService.getReviewsByProduct(id);

        let totalStar = 0;
        data?.map(async (review, index) => {
            const user = await UserService.getUserDetails(review.userId);
            review = {
                ...review,
                'userName': user?.name,
            };
            totalStar = totalStar + averageStar.value + review.star;
            if (index + 1 === data?.length) {
                averageStar.value = totalStar / data?.length;
            }
            reviewProduct.value.push(review);
        });
        if (data?.length > 0) {
            countRating.value = data?.length;
        }
    } catch (e) {
        console.log(e);
    }
}
onMounted(() => {
    getProductDetails(productId);
    getReviewsByProduct(productId);
});


// cart state
const cartStore = useCartStore();
const addToCart = () => {
    const cartData = {
        "userId": user?._id,
        "product": {
            "_id": JSON.parse(JSON.stringify(product?.value?._id)),
            "name": JSON.parse(JSON.stringify(product?.value?.name)),
            "type": JSON.parse(JSON.stringify(product?.value?.type)),
            "price": JSON.parse(JSON.stringify(product?.value?.price)),
            "image": JSON.parse(JSON.stringify(product?.value?.image)),
            "amount": amountValue?.value,
            "description": JSON.parse(JSON.stringify(product?.value?.description)),
        }
    }
    if (user?._id) {
        cartStore.addCart(cartData);
        message.success('Đã thêm sản phẩm vào giỏ hàng', 3);
    } else {
        router.push({ name: "signinpage" });
        message.error('Vui lòng đăng nhập trước khi thêm vào giỏ hàng', 3);
    }
}
const cart = cartStore.getCart();


// navigate
const goToHomePage = () => {
    router.push({ name: "homepage" });
}
const goToMenuPage = () => {
    router.push({ name: "menupage" });
}
</script>

<template>
    <a-breadcrumb style="margin-bottom: 40px; margin-top: 50px;">
        <a-breadcrumb-item>
            <span role="button" @click="goToHomePage">Trang Chủ</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <span role="button" @click="goToMenuPage">Menu</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <span>Chi Tiết Sản Phẩm</span>
        </a-breadcrumb-item>
    </a-breadcrumb>

    <a-spin :spinning="loading">
        <a-row>
            <a-col span="10" align="center" style="padding: 0px 25px 30px 0px">
                <a-image v-bind:src="`${product?.image}`" :width="330" />
            </a-col>
            <a-col span="14">
                <a-row justify="space-evenly">
                    <a-col span="24">
                        <h3 style="text-transform: uppercase;">{{ product?.name }}</h3>
                    </a-col>
                    <a-col span="24" style="margin-bottom: 22px;">
                        <a-rate :value="averageStar" disabled />
                        <span style="font-size: 18px; margin-left: 7px;"> {{ averageStar }}<span
                                style="margin-left: 7px">({{ countRating }} đánh giá)</span></span>
                    </a-col>
                    <a-col span="24" style="margin-bottom: 20px;">
                        <a-tag color="orange" style="font-size: 16px">Loại: {{ product?.type }}</a-tag>
                    </a-col>
                    <a-col span="24" style="margin-bottom: 4px;">
                        <h4 style="font-weight: 700;">{{ product?.price?.toLocaleString() }} VNĐ</h4>
                    </a-col>
                    <a-col span="24" style="margin-bottom: 16px;">
                        <span style="font-size: 16px">{{ product?.description }}</span>
                    </a-col>
                    <a-col span="24" style="margin-bottom: 16px;">
                        <a-row>
                            <a-col span="5">
                                <a-input-number v-model:value="amountValue" size="large" :min="1" :max="10"
                                    style="width: 100%" />
                            </a-col>
                        </a-row>
                    </a-col>

                    <a-col span="24">
                        <a-button type="primary" @click="addToCart" danger>Thêm Vào Giỏ Hàng</a-button>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </a-spin>

    <a-row style="margin-top: 60px" justify="center">
        <a-col span="24" style="margin-bottom: 10px; font-weight: 600;">
            <a-divider style="border-color: rgb(174, 174, 174); font-size: 24px;">Đánh Giá</a-divider>
        </a-col>
    </a-row>
    <a-row v-if="reviewProduct?.length > 0" v-for="(review, index) in reviewProduct" style="margin-bottom: 15px">
        <a-col span="16" offset="9" align="start" style="margin-bottom: 7px">
            <span style="font-weight: 600; font-size: 18px;">
                {{ review?.userName }}
            </span>
            <span style="margin-left: 50px">
                <a-rate :value="review?.star" disabled />
            </span>
        </a-col>
        <a-col span="16" offset="9" align="start">
            {{ review?.description }}
        </a-col>
        <a-col span="16" offset="9" align="start" style="margin-top: 10px;">
            <a-row>
                <a-col v-for="(image, index) in review?.images" span="3">
                    <a-image :src="image" :width="80" style="border: 1px solid #a7a7a7; border-radius: 15px; padding: 5px;" />
                </a-col>
            </a-row>
        </a-col>
    </a-row>
    <a-row v-else>
        <a-col span="24" align="middle" style="margin-bottom: 7px">
            Chưa có đánh giá nào.
        </a-col>
    </a-row>
</template>

<style></style>
