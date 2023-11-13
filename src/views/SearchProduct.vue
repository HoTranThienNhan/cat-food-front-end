<script setup>
import { useAuthStore } from '@/stores/auth.store';
import ProductService from "@/services/product.service";
import { ref, onMounted, watch } from 'vue';
import { router } from '@/router';
import ProductCard from "@/components/ProductCard.vue";
import { useRoute } from 'vue-router';

const authStore = useAuthStore();
const user = authStore?.user;

const route = useRoute();


// props
const products = ref([]);
const loading = ref(false);
const { name: productName } = route?.params;

watch(
    [route],
    () => {
        fetchData(route?.params?.name);
    },
    { deep: true }
);


// methods
const fetchData = async (searchName) => {
    try {
        loading.value = true;
        if (searchName)  {
            products.value = await ProductService.searchProductsByName(searchName);
        }
        loading.value = false;
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    fetchData(productName);
});

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
    <a-breadcrumb style="margin-bottom: 40px; margin-top: 50px;">
        <a-breadcrumb-item>
            <span role="button" @click="goToHomePage">Trang Chủ</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <span>Tìm Kiếm Sản Phẩm</span>
        </a-breadcrumb-item>
    </a-breadcrumb>

    <a-spin :spinning="loading">
        <a-row justify="start" style="margin-bottom: 40px;">
            <a-col span="10" class="type-filter">
                <span style="font-size: 28px;">
                    Kết quả tìm kiếm cho "<span style="font-weight: 600;">{{ route?.params?.name }}</span>"
                </span>
            </a-col>
        </a-row>
        <a-row justify="center">
            <a-col span="20" :offset="1">
                <a-row justify="space-evenly">
                    <a-col v-for="(product, index) in products" span="7" style="margin: 0px 30px 30px 0px">
                        <!-- <ProductCard :product="product" @click="() => goToProductDetailsPage(product?._id)" /> -->
                        <a-card hoverable style="width: 280px; height: 360px" class="card-product"
                            @click="() => goToProductDetailsPage(product?._id)">
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
    </a-spin>
    <!-- </div> -->
</template>

<style>
.type-filter .type-filter-checked {
    color: rgb(255, 61, 61);
}

.card-product:hover {
    background-color: rgba(255, 227, 155, 0.595);
    border: 4px dashed rgb(246, 119, 0);

    .card-product-image {
        transform: scale(1.1);
    }
}

.card-product {
    transition: transform .5s;
    border: 2px dashed #aeaeae;
}
</style>
