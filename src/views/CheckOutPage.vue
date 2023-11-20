<script setup>
import { useAuthStore } from '@/stores/auth.store';
import { useCartStore } from '@/stores/cart.store';
import OrderService from "@/services/order.service";
import { ref, toRefs, onMounted, reactive, computed, watch } from 'vue';
import { router } from '@/router';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';

const route = useRoute();

const authStore = useAuthStore();
const user = authStore?.user;

// props
let cart = ref(null);
let cartStore = useCartStore();
const loading = ref(false);
const products = cartStore.getCart(user?._id)?.products;
// remove first item of array
products?.shift();

const formUserInfo = reactive({
    userId: user?._id,
    name: user?.name,
    phone: user?.phone,
    address: user?.address,
    method: 'COD',
    deliveryFee: 20000,
    discount: 0,
    totalPrice: 20000 + cartStore.getTotalPrice(user?._id),
    status: 'Chờ Xác Nhận',
    products: products,
});
let subtotalPrice = ref(cartStore.getTotalPrice(user?._id));

// methods
const getCart = async (userId) => {
    try {
        cart.value = cartStore.getCart(userId);
    } catch (error) {
        console.log(error);
        // router.push({
        //     name: "notfoundpage",
        //     params: {
        //         pathMatch: route.path.split("/").slice(1)
        //     },
        //     query: route.query,
        //     hash: route.hash,
        // });
    }
}
onMounted(() => {
    getCart(user?._id);
});

const onSubmitFinishedCheckOut = async () => {
    try {
        await OrderService.createOrder(formUserInfo);

        cartStore.clearUserCart(user?._id);
        message.success('Thanh toán thành công', 3);

        router.push({ name: "ordersuccesspage" });
    } catch (e) {
        message.error('Thanh toán thất bại', 3);
    }
}


// watch cart state to update cart
watch(
    [cartStore],
    () => {
        cart.value = cartStore?.getCart(user?._id);
        subtotalPrice.value = cartStore.getTotalPrice(user?._id);
    },
    { deep: true }
);


// navigate
const goToHomePage = () => {
    router.push({ name: "homepage" });
}
const goToCartPage = () => {
    router.push({ name: "cartpage" });
}
</script>

<template>
    <!-- {{ cart?.products }} -->
    <a-breadcrumb style="margin-bottom: 20px; margin-top: 50px;">
        <a-breadcrumb-item>
            <span role="button" @click="goToHomePage">Trang Chủ</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <span role="button" @click="goToCartPage">Giỏ Hàng</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <span>Thanh Toán</span>
        </a-breadcrumb-item>
    </a-breadcrumb>

    <a-spin :spinning="loading">
        <a-row justify="center" style="margin-bottom: 20px;">
            <a-col>
                <div style="font-weight: bold; font-size: 28px;">THANH TOÁN</div>
            </a-col>
        </a-row>
        <a-row justify="center">
            <a-col span="20" style="padding-top: 30px">
                <a-row>
                    <a-col span="16">
                        <a-form :model="formUserInfo" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }"
                            autocomplete="off">

                            <div style="margin-bottom: 30px">
                                <h6>THÔNG TIN NHẬN HÀNG</h6>
                            </div>

                            <a-form-item label="Tên Người Nhận" name="name"
                                :rules="[{ required: true, message: 'Tên không được để trống.' }]">
                                <a-input v-model:value="formUserInfo.name" />
                            </a-form-item>

                            <a-form-item label="Số Điện Thoại" name="phone"
                                :rules="[{ required: true, message: 'Số điện thoại không được để trống.' }]">
                                <a-input v-model:value="formUserInfo.phone" />
                            </a-form-item>

                            <a-form-item label="Nơi Nhận Hàng" name="address"
                                :rules="[{ required: true, message: 'Nơi nhận không được để trống.' }]">
                                <a-input v-model:value="formUserInfo.address" />
                            </a-form-item>

                            <div style="margin-bottom: 30px">
                                <h6>PHƯƠNG THỨC THANH TOÁN</h6>
                            </div>

                            <a-form-item>
                                <a-radio-group v-model:value="formUserInfo.method">
                                    <a-radio value="COD">Thanh toán khi nhận hàng (COD)</a-radio>
                                </a-radio-group>
                            </a-form-item>

                            <a-form-item style="margin-top: 40px;" :wrapper-col="{ span: 21 }">
                                <a-popconfirm title="Bạn chắc chắn thanh toán đơn hàng này？"
                                    @confirm="onSubmitFinishedCheckOut">
                                    <a-button type="primary"
                                        style="width: 100%; height: 50px; border-radius: 25px;">Thanh Toán</a-button>
                                </a-popconfirm>
                            </a-form-item>

                        </a-form>
                    </a-col>
                    <a-col span="8">
                        <a-card class="antdv-card-box-shadow">
                            <a-row justify="center" style="margin-bottom: 15px">
                                <h5>TỔNG QUAN ĐƠN HÀNG</h5>
                            </a-row>
                            <a-row justify="space-between">
                                <a-col style="font-size: 15px">Số lượng:</a-col>
                                <a-col style="font-size: 15px">{{ cart?.products?.length - 1 }} sản phẩm</a-col>
                            </a-row>
                            <a-row justify="space-between">
                                <a-col style="font-size: 15px">Tạm Tính:</a-col>
                                <a-col style="font-size: 15px">{{ subtotalPrice?.toLocaleString() }} VNĐ</a-col>
                            </a-row>
                            <a-row justify="space-between">
                                <a-col style="font-size: 15px">Phí Vận Chuyển:</a-col>
                                <a-col style="font-size: 15px">{{ formUserInfo.deliveryFee.toLocaleString() }} VNĐ</a-col>
                            </a-row>
                            <a-row justify="space-between">
                                <a-col style="font-size: 15px">Giảm Giá:</a-col>
                                <a-col style="font-size: 15px">- 0 VNĐ</a-col>
                            </a-row>
                            <a-divider></a-divider>
                            <a-row justify="space-between">
                                <a-col style="font-size: 17px; font-weight: 500;">Tổng Cộng:</a-col>
                                <a-col style="font-size: 17px; font-weight: 500;">
                                    {{ (formUserInfo.deliveryFee + subtotalPrice).toLocaleString() }} VNĐ
                                </a-col>
                            </a-row>
                        </a-card>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </a-spin>
</template>

<style>
.antdv-card-box-shadow {
    box-shadow: 0px 1px 5px 0px #d6d6d6;
}
</style>
