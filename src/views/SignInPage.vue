
<script setup>
import { ref, reactive, computed } from 'vue';

import SignInForm from "@/components/SignInForm.vue";
import UserService from "@/services/user.service";
import { message } from 'ant-design-vue';

import { useAuthStore } from '@/stores/auth.store';
import { useCartStore } from '@/stores/cart.store';

const authStore = useAuthStore();
const user = authStore?.user;
const cartStore = useCartStore();

let userInfo = reactive({});
let messageSignIn = ref("");
let status = ref("");

const signin = async (data) => {
    try {
        await cartStore.createCart(data);
        // await cartStore.clearAllCarts();
        await authStore.signinStore(data);

        await UserService.signin(data);
        messageSignIn.value = "Đăng nhập thành công";
        message.success('Đăng nhập thành công', 3);
        status.value = "OK";
    } catch (error) {
        messageSignIn.value = error.response?.data?.message;
        status.value = "ERROR";
        message.error('Đăng nhập thất bại', 3);
    }
}
</script>

<template>
    <a-row justify="center" style="margin-top: 80px;">
        <a-col span="22" style="
        width: 100%; 
        background-color: #fff; 
        border: 1px solid #9f9f9f; 
        border-radius: 15px; 
        box-shadow: 0px 1px 3px 3px #c8c8c8;">
            <a-row justify="center">
                <a-col span="10">
                    <a-image style="border-top-left-radius: 15px; border-bottom-left-radius: 15px;"
                        src="/src/assets/cat-food-banner-auth.png" :preview="false" />
                </a-col>
                <a-col span="14" style="padding: 30px;">
                    <a-row justify="center">
                        <div style="font-weight: bold; font-size: 24px; margin-top: 50px;">ĐĂNG NHẬP</div>
                    </a-row>
                    <a-row justify="center" style=" margin: 20px 0px 50px 0px;">
                        <div>Chào mừng bạn đến với MEOWIE</div>
                    </a-row>
                    <a-row justify="center">
                        <a-col span="16">
                            <SignInForm :user="userInfo" @submit:signin="signin" />
                        </a-col>
                    </a-row>
                    <a-row class="error-message" justify="center">
                        <a-col>
                            {{ messageSignIn }}
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
        </a-col>
    </a-row>
</template>

<style>
.error-message {
    color: red;
    align-items: center;
}

.ant-card-body {
    padding: 0zx;
}
</style>