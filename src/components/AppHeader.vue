<script setup>
import { ref, reactive, computed, toRefs, onMounted, watch } from 'vue';
import { HeartOutlined, ShoppingCartOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { router } from '@/router';
import { useAuthStore } from '@/stores/auth.store';
import { useCartStore } from '@/stores/cart.store';
import UserService from "@/services/user.service";

// 
const authStore = useAuthStore();
let user = ref(authStore?.user);

const cartStore = useCartStore();
let cart = ref(cartStore?.getCart(user?.value?._id));

// watch the state of user (signed in or out), cart to update navbar header
watch(
    [authStore, cartStore],
    () => {
        user.value = authStore?.user;
        cart.value = cartStore?.getCart(user?.value?._id);
    },
    { deep: true }
);

const searchProductValue = ref('');
const handleSearchProduct = () => {
    router.replace({
        name: "searchproductpage",
        params: {
            name: searchProductValue.value
        },
    });
    searchProductValue.value = '';
}


// methods
const goToSignIn = () => {
    router.push({ name: "signinpage" });
}
const goToSignUp = () => {
    router.push({ name: "signuppage" });
}
const goToHomePage = () => {
    router.push({ name: "homepage" });
}
const goToMenuPage = () => {
    router.push({ name: "menupage" });
}
const goToAboutPage = () => {
    router.push({ name: "aboutpage" });
}
const goToContactPage = () => {
    router.push({ name: "contactpage" });
}
const goToCartPage = () => {
    router.push({ name: "cartpage" });
}
const goToFavoritePage = () => {
    router.push({ name: "favoritepage" });
}
const goToOrderPage = () => {
    router.push({ name: "orderpage" });
}
const goToEditProfilePage = () => {
    router.push({ name: "editprofilepage" });
}
const signout = () => {
    try {
        authStore.signoutStore();
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <a-row class="header-navbar-wrapper" align="middle">
        <a-col :span="4" offset="2">
            <div>
                <a-image height="70px" :preview="false" src="/src/assets/cat-food-logo.png" />
            </div>
        </a-col>
        <a-col :span="8">
            <a-row justify="space-around" class="navigate-wapper">
                <a-col>
                    <span role="button" @click="goToHomePage">
                        Trang Chủ <span class="sr-only">(current)</span>
                    </span>
                </a-col>

                <a-col>
                    <span role="button" @click="goToMenuPage">
                        Menu
                    </span>
                </a-col>

                <a-col>
                    <span role="button" @click="goToAboutPage">
                        Giới Thiệu
                    </span>
                </a-col>

                <a-col>
                    <span role="button" @click="goToContactPage">
                        Liên Hệ
                    </span>
                </a-col>
            </a-row>
        </a-col>

        <a-col :span="8" offset="2">
            <a-row align="middle">
                <a-col :span="8">
                    <a-form>
                        <a-input-group compact>
                            <a-input placeholder="Tìm kiếm" style="width: 130px; height: 30px" v-model:value="searchProductValue" />
                            <a-button style="width: 28px; height: 30px; padding: 0px 0px 10px 0px;" @click="handleSearchProduct">
                                <SearchOutlined />
                            </a-button>
                        </a-input-group>
                    </a-form>
                </a-col>

                <a-col :span="7" :offset="1">
                    <span role="button" style="font-weight: 600;" v-if="!user" @click="goToSignIn">Đăng Nhập / </span>
                    <span role="button" style="font-weight: 600;" v-if="!user" @click="goToSignUp">Đăng Ký</span>
                    <a-dropdown v-if="user" :trigger="['click']" arrow>
                        <span role="button" style="font-weight: 600;" class="ant-dropdown-link" @click.prevent>
                            {{ user?.name ? user?.name : user?.email }}
                        </span>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item role="button" @click="goToEditProfilePage">
                                    <span>Thông Tin Người Dùng</span>
                                </a-menu-item>
                                <a-menu-item role="button" @click="goToOrderPage">
                                    <span>Đơn Hàng Của Tôi</span>
                                </a-menu-item>
                                <a-menu-item role="button" @click="signout">
                                    <span>Đăng Xuất</span>
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </a-col>

                <a-col :span="6">
                    <a-row align="middle">
                        <a-col>
                            <a-badge :count="user?.favoriteProducts?.length > 0 ? user?.favoriteProducts?.length : 0" show-zero>
                                <HeartOutlined :style="{ fontSize: '24px', color: '#fff' }" :role="button" @click="goToFavoritePage" />
                            </a-badge>
                        </a-col>
                        <a-col :offset="4">
                            <a-badge :count="cart?.products?.length - 1 > 0 ? cart?.products?.length - 1 : 0" show-zero>
                                <ShoppingCartOutlined :style="{ fontSize: '24px', color: '#fff' }" :role="button"
                                    @click="goToCartPage" />
                            </a-badge>
                        </a-col>
                    </a-row>

                </a-col>
            </a-row>
        </a-col>
    </a-row>
    <a-divider />
</template>

<style>
.header-navbar-wrapper {
    background-color: #211616cc;
    z-index: 10;
    position: fixed;
    width: 100%;
    color: #fff;
    top: 0px;
}

.navigate-wapper {
    font-weight: 600;
}
</style>
