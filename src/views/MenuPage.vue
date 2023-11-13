<script setup>
import { useAuthStore } from '@/stores/auth.store';
import ProductService from "@/services/product.service";
import UserService from "@/services/user.service";
import { ref, onMounted } from 'vue';
import { router } from '@/router';
import ProductCard from "@/components/ProductCard.vue";
import { HeartOutlined, HeartFilled } from '@ant-design/icons-vue';
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
const fetchDataByType = async (type) => {
    try {
        loading.value = true;
        products.value = await ProductService.getProductsByType(type);

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
const getProductsByType = (type, e) => {
    e.target.parentNode.parentNode.childNodes.forEach(element => {
        if (element.classList) {
            element.classList.remove("type-filter-checked");
        }
    });
    e.target.parentNode.classList.add("type-filter-checked");
    if (type === 'all') {
        fetchData();
    } else {
        fetchDataByType(type);
    }
}
const handleAddFavorite = async (productId) => {
    try {
        await UserService.addFavorite(user?._id, productId);
        authStore.addFavoriteStore(productId);
        const type = document.getElementsByClassName('type-filter-checked')[0].getElementsByTagName('h5')[0].innerHTML;
        if (type === 'Tất Cả') {
            fetchData();
        } else if (type === 'Hạt Khô') {
            fetchDataByType('dry');
        } else if (type === 'Pate') {
            fetchDataByType('pate');
        } else if (type === 'Gel') {
            fetchDataByType('gel');
        }
        message.success('Thêm sản phẩm yêu thích thành công', 3);
    } catch (e) {
        console.log(e);
    }
}
const handleRemoveFavorite = async (productId) => {
    try {
        await UserService.removeFavorite(user?._id, productId);
        authStore.removeFavoriteStore(productId);
        const type = document.getElementsByClassName('type-filter-checked')[0].getElementsByTagName('h5')[0].innerHTML;
        if (type === 'Tất Cả') {
            fetchData();
        } else if (type === 'Hạt Khô') {
            fetchDataByType('dry');
        } else if (type === 'Pate') {
            fetchDataByType('pate');
        } else if (type === 'Gel') {
            fetchDataByType('gel');
        }
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
    <a-breadcrumb style="margin-bottom: 40px; margin-top: 50px;">
        <a-breadcrumb-item>
            <span role="button" @click="goToHomePage">Trang Chủ</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <span>Menu</span>
        </a-breadcrumb-item>
    </a-breadcrumb>

    <a-spin :spinning="loading">
        <a-row justify="center" style="margin-bottom: 40px;">
            <a-col span="10" class="type-filter">
                <a-row justify="space-between" class="type-filter-row">
                    <a-col class="type-filter-checked">
                        <h5 style="cursor: pointer;" @click="(e) => getProductsByType('all', e)">Tất Cả</h5>
                    </a-col>
                    <a-col>
                        <h5 style="cursor: pointer;" @click="(e) => getProductsByType('dry', e)">Hạt Khô</h5>
                    </a-col>
                    <a-col>
                        <h5 style="cursor: pointer;" @click="(e) => getProductsByType('pate', e)">Pate</h5>
                    </a-col>
                    <a-col>
                        <h5 style="cursor: pointer;" @click="(e) => getProductsByType('gel', e)">Gel</h5>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
        <a-row justify="center">
            <a-col span="20" :offset="1">
                <a-row justify="space-evenly">
                    <a-col v-for="(product, index) in products" span="7" style="margin: 0px 30px 30px 0px">
                        <!-- <ProductCard :product="product" @click="() => goToProductDetailsPage(product?._id)" /> -->
                        <a-card hoverable style="width: 280px; height: 360px" class="card-product"
                            @click="() => goToProductDetailsPage(product?._id)">
                            <a-row style="position: absolute; right: 30px;">
                                <HeartFilled v-if="product?.isFavorite && user?._id"
                                    style="font-size: 28px; color: red; z-index: 5;"
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
