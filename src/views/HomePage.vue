<script setup>

import { useAuthStore } from '@/stores/auth.store';
import ProductService from "@/services/product.service";
import UserService from "@/services/user.service";
import { ref, onMounted } from 'vue';
import { router } from '@/router';
import ProductCard from "@/components/ProductCard.vue";
import { HeartOutlined, HeartFilled, CarOutlined, PhoneOutlined, DollarOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const authStore = useAuthStore();
const user = authStore?.user;


// props
const products = ref([]);
const loading = ref(false);


// methods
const fetchData = async () => {
    try {
        loading.value = true;
        products.value = await ProductService.getAllProducts();

        // add isFavorite field to products array
        if (user?._id) {
        const thisUser = await UserService.getUserDetails(user?._id);
            products.value.map((product) => {
                thisUser?.favoriteProducts?.map((favProd) => {
                    if (favProd === product._id) {
                        Object.assign(product, { isFavorite: true });
                    }
                });
            });
        }

        loading.value = false;
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    fetchData();
});
const handleAddFavorite = async (productId) => {
    try {
        await UserService.addFavorite(user?._id, productId);
        authStore.addFavoriteStore(productId);
        fetchData();
        message.success('Thêm sản phẩm yêu thích thành công', 3);
    } catch (e) {
        console.log(e);
    }
}
const handleRemoveFavorite = async (productId) => {
    try {
        await UserService.removeFavorite(user?._id, productId);
        authStore.removeFavoriteStore(productId);
        fetchData();
        message.success('Xóa sản phẩm yêu thích thành công', 3);
    } catch (e) {
        console.log(e);
    }
}

// navigate
const goToHomePage = () => {
    router.push({ name: "homepage" });
}
const goToProductDetailsPage = (productId) => {
    router.push({
        name: "productpage",
        params: { id: productId }
    });
}


</script>

<template>
    <div style="margin-top: 50px">
        <a-image :preview="false" src="/src/assets/cat-food-banner-homepage.png" />
        <a-row justify="center" style="margin-top: 30px">
            <a-col style="margin-right: 120px">
                <a-row>
                    <a-col style="margin-right: 10px;">
                        <CarOutlined style="font-size: 40px" />
                    </a-col>
                    <a-col>
                        <div style="font-weight: 600;">Phí Vận Chuyển Siêu Rẻ</div>
                        <div>Phí vận chuyển chỉ với 20.000 VNĐ</div>
                    </a-col>
                </a-row>
            </a-col>
            <a-col style="margin-right: 120px">
                <a-row>
                    <a-col style="margin-right: 10px;">
                        <PhoneOutlined style="font-size: 40px" />
                    </a-col>
                    <a-col>
                        <div style="font-weight: 600;">Hỗ Trợ 24/7</div>
                        <div>Luôn luôn sẵn sàng phục vụ</div>
                    </a-col>
                </a-row>
            </a-col>
            <a-col>
                <a-row>
                    <a-col style="margin-right: 10px;">
                        <DollarOutlined style="font-size: 40px" />
                    </a-col>
                    <a-col>
                        <div style="font-weight: 600;">Chương Trình Ưu Đãi</div>
                        <div>Nhiều chương trình giảm giá hấp dẫn</div>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
        <a-row justify="center" style="margin: 20px 0px;">
            <a-col span="10">
                <a-divider style="border-color: #000">
                    <span style="margin: 0px 10px; font-size: 28px;">Sản Phẩm Nổi Bật</span>
                </a-divider>
            </a-col>
        </a-row>
        <a-row justify="center">
            <a-col span="20" :offset="1">
                <a-row justify="space-evenly">
                    <a-col v-for="(product, index) in products" span="7" style="margin: 0px 30px 30px 0px">
                        <!-- <ProductCard :product="product" @click="() => goToProductDetailsPage(product?._id)" /> -->
                        <a-card v-if="index < 3" hoverable style="width: 280px; height: 360px" class="card-product"
                            @click="() => goToProductDetailsPage(product?._id)">
                            <a-row style="position: absolute; right: 28px;">
                                <HeartFilled v-if="product?.isFavorite && user?._id" style="font-size: 30px; color: red; z-index: 5;"
                                    @click.stop="() => handleRemoveFavorite(product?._id)" />
                                <HeartOutlined v-if="!product?.isFavorite && user?._id" style="font-size: 28px;"
                                    @click.stop="() => handleAddFavorite(product?._id)" />
                            </a-row>
                            <a-row justify="center">
                                <a-col style="margin: 20px 0px;">
                                    <a-image v-bind:src="`${product?.image}`" :width="180" :height="180" :preview="false"
                                        :previewMask="false" class="card-product-image" />
                                </a-col>
                            </a-row>
                            <a-row justify="center">
                                <a-col span="20" align="center">
                                    <h6
                                        style="margin-top: 15px; text-transform: uppercase; font-size: 18px; font-weight: 700;">
                                        {{ product?.name }}</h6>
                                </a-col>
                            </a-row>
                            <a-row justify="center">
                                <a-col span="20" align="center">
                                    <h6 style="margin-bottom: 30px; font-size: 18px;">{{
                                        product?.price?.toLocaleString() }} VNĐ</h6>
                                </a-col>
                            </a-row>
                        </a-card>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </div>
</template>

<style></style>
