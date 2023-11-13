
<script setup>
import { ref, reactive, computed } from 'vue';

import SignUpForm from "@/components/SignUpForm.vue";
import UserService from "@/services/user.service";
import { message } from 'ant-design-vue';
import { router } from '@/router';

let userInfo = reactive({});
let messageSignUp = ref("");
let status = ref("");

const signup = async (data) => {
    try {
        await UserService.signup(data);
        messageSignUp.value = "Đăng ký thành công";
        message.success('Đăng ký thành công', 3);
        status.value = "OK";
        router.push({ name: "signinpage" });
    } catch (error) {
        messageSignUp.value = error.response?.data?.message;
        status.value = "ERROR";
        message.error('Đăng ký thất bại', 3);
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
                <a-col span="14" style="padding: 20px 20px 0px 20px;">
                    <a-row justify="center">
                        <div style="font-weight: bold; font-size: 24px; margin-top: 0px;">ĐĂNG KÝ</div>
                    </a-row>
                    <a-row justify="center" style=" margin: 0px 0px 50px 0px;">
                        <div>Đăng ký tài khoản với MEOWIE</div>
                    </a-row>
                    <a-row justify="center">
                        <a-col span="16">
                            <SignUpForm :user="userInfo" @submit:signup="signup" />
                        </a-col>
                    </a-row>
                    <a-row class="error-message" justify="center">
                        <a-col>
                            {{ messageSignUp }}
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