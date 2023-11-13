<script setup>
import { useAuthStore } from '@/stores/auth.store';
import { useCartStore } from '@/stores/cart.store';
import InputNumber from '@/components/InputNumber.vue';
import { ref, toRefs, onMounted, reactive, computed, watch } from 'vue';
import { router } from '@/router';
import { useRoute } from 'vue-router';
import { CloseOutlined, QuestionCircleOutlined, PlusOutlined, MinusOutlined, SmileTwoTone } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const route = useRoute();

const authStore = useAuthStore();
const user = authStore?.user;

// props
let cart = ref(null);
const cartStore = useCartStore();

const loading = ref(false);
let totalPrice = ref(cartStore.getTotalPrice(user?._id));

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



const increaseAmount = (product) => {
    const cartData = {
        "userId": user?._id,
        "product": {
            "_id": JSON.parse(JSON.stringify(product?._id)),
            "name": JSON.parse(JSON.stringify(product?.name)),
            "type": JSON.parse(JSON.stringify(product?.type)),
            "price": JSON.parse(JSON.stringify(product?.price)),
            "image": JSON.parse(JSON.stringify(product?.image)),
            "amount": JSON.parse(JSON.stringify(product?.amount)),
            "description": JSON.parse(JSON.stringify(product?.description)),
        }
    }
    cartStore.increaseAmount(cartData);
}
const decreaseAmount = (product) => {
    const cartData = {
        "userId": user?._id,
        "product": {
            "_id": JSON.parse(JSON.stringify(product?._id)),
            "name": JSON.parse(JSON.stringify(product?.name)),
            "type": JSON.parse(JSON.stringify(product?.type)),
            "price": JSON.parse(JSON.stringify(product?.price)),
            "image": JSON.parse(JSON.stringify(product?.image)),
            "amount": JSON.parse(JSON.stringify(product?.amount)),
            "description": JSON.parse(JSON.stringify(product?.description)),
        }
    }
    cartStore.decreaseAmount(cartData);
}
const removeProduct = (productId, userId) => {
    const cartStore = useCartStore();
    cartStore.removeProduct(productId, userId);
    message.success('Xóa sản phẩm thành công', 3);
}

// watch cart state to update cart
watch(
    [cartStore],
    () => {
        cart.value = cartStore?.getCart(user?._id);
        totalPrice.value = cartStore.getTotalPrice(user?._id);
    },
    { deep: true }
);


// navigate
const goToHomePage = () => {
    router.push({ name: "homepage" });
}
const goToMenuPage = () => {
    router.push({ name: "menupage" });
}
const goToCheckOutPage = () => {
    router.push({ name: "checkoutpage" });
}
const checkOut = () => {
    // if there has product in cart
    if (cart?.value?.products?.length > 1) {
        goToCheckOutPage();
    }
}
</script>





<template>
    <!-- {{ cart?.products }} -->
    <a-breadcrumb style="margin-bottom: 20px; margin-top: 50px;">
        <a-breadcrumb-item>
            <span role="button" @click="goToHomePage">Trang Chủ</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <span>Giỏ Hàng</span>
        </a-breadcrumb-item>
    </a-breadcrumb>

    <a-spin :spinning="loading">
        <a-row justify="center" style="margin-bottom: 20px;">
            <a-col>
                <div style="font-weight: bold; font-size: 28px;">GIỎ HÀNG CỦA TÔI ({{ cart?.products?.length - 1 > 0 ?
                    cart?.products?.length - 1 : 0 }})</div>
            </a-col>
        </a-row>
        <a-row v-if="cart?.products?.length > 1" justify="center" style="margin-bottom: 50px;">
            <a-col span="20">
                <div style="max-height: 355px; overflow: auto; padding-right: 20px; margin-bottom: 20px;">
                    <a-divider style="border: 2px dashed rgb(180, 180, 180);"></a-divider>
                    <div v-for="(product, index) in cart?.products">
                        <a-row v-if="index > 0" justify="space-evenly" align="middle">
                            <a-col span="4">
                                <a-image v-bind:src="`${product?.image}`" :width="100" :height="100" :preview="false" />
                            </a-col>
                            <a-col span="7" :offset="1">
                                <a-row justify="center">
                                    <a-col span="24">
                                        <h5 style="">{{ product?.name }}</h5>
                                    </a-col>
                                    <a-col span="24">
                                        <a-tag color="orange" style="font-size: 16px">{{ product?.type }}</a-tag>
                                    </a-col>
                                </a-row>
                            </a-col>
                            <a-col span="4">
                                <a-row>
                                    <a-col span="8">
                                        <a-popconfirm v-if="product?.amount === 1" title="Bạn có muốn xóa sản phẩm này？"
                                            @confirm="() => removeProduct(product?._id, user?._id)">
                                            <template #icon><question-circle-outlined style="color: red" /></template>
                                            <a-button type="link" @click="() => decreaseAmount(product)">
                                                <MinusOutlined style="font-size: 18px;" />
                                            </a-button>
                                        </a-popconfirm>
                                        <a-button v-else type="link" @click="() => decreaseAmount(product)">
                                            <MinusOutlined style="font-size: 18px;" />
                                        </a-button>
                                    </a-col>
                                    <a-col span="8">
                                        <InputNumber :value="product?.amount" />
                                    </a-col>
                                    <a-col span="8">
                                        <a-popconfirm v-if="product?.amount === 10" title="Tối đa 10 sản phẩm"
                                            :showCancel="false">
                                            <a-button type="link" @click="() => increaseAmount(product)">
                                                <PlusOutlined style="font-size: 18px;" />
                                            </a-button>
                                        </a-popconfirm>
                                        <a-button v-else type="link" @click="() => increaseAmount(product)">
                                            <PlusOutlined style="font-size: 18px;" />
                                        </a-button>
                                    </a-col>
                                </a-row>
                            </a-col>
                            <a-col span="3" :offset="2" align="middle">
                                <h6 style="margin-top: 6px">{{ product?.price?.toLocaleString() }} VNĐ</h6>
                            </a-col>
                            <a-col span="3" align="middle">
                                <a-popconfirm title="Bạn chắc chắn xóa sản phẩm này？"
                                    @confirm="() => removeProduct(product?._id, user?._id)">
                                    <template #icon><question-circle-outlined style="color: red" /></template>
                                    <CloseOutlined />
                                </a-popconfirm>
                            </a-col>
                            <a-divider style="border: 2px dashed rgb(180, 180, 180);"></a-divider>
                        </a-row>
                    </div>
                </div>
                <div>
                    <a-row justify="end" align="middle">
                        <a-col>
                            <h5>Tạm Tính:</h5>
                        </a-col>
                        <a-col :offset="1">
                            <h4>{{ totalPrice?.toLocaleString() }} VNĐ</h4>
                        </a-col>
                    </a-row>
                    <a-row justify="end">
                        <a-col span="6">
                            <a-button type="primary" @click="checkOut"
                                style="width: 100%; height: 50px; border-radius: 25px;">Thanh Toán</a-button>
                        </a-col>
                    </a-row>
                </div>
            </a-col>
        </a-row>
        <a-result v-else title="Hình như chưa có sản phẩm nào trong giỏ hàng">
            <template #icon>
                <smile-twoTone />
            </template>
            <template #extra>
                <a-button type="primary" @click="goToMenuPage">Đến Menu</a-button>
            </template>
        </a-result>
    </a-spin>
</template>

<style></style>
