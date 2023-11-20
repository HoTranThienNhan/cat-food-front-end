<script setup>

import { useAuthStore } from '@/stores/auth.store';
import { router } from '@/router';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons-vue';

const authStore = useAuthStore();
const user = authStore?.user;

// navigate
const goToHomePage = () => {
    router.push({ name: "homepage" });
}
</script>

<template>
    <div style="margin-bottom: 30px;">
        <a-breadcrumb style="margin-bottom: 20px; margin-top: 50px;">
            <a-breadcrumb-item>
                <span role="button" @click="goToHomePage">Trang Chủ</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                <span>Liên Hệ</span>
            </a-breadcrumb-item>
        </a-breadcrumb>

        <a-row>
            <a-col span="12" :offset="2" style="margin-top: 20px">
                <div>
                    <h3>LIÊN HỆ</h3>
                </div>
                <div style="font-size: 18px;">
                    Chúng tôi luôn lắng nghe những chia sẻ từ bạn.
                </div>
                <div style="margin-top: 20px;">
                    <a-input placeholder="Họ tên" style="height: 40px;" />
                </div>
                <div style="margin-top: 20px;">
                    <a-input placeholder="Email" style="height: 40px;" />
                </div>
                <div style="margin-top: 20px;">
                    <a-textarea placeholder="Tin nhắn" :rows="5" />
                </div>
                <div style="margin-top: 20px;">
                    <a-button type="primary" style="width: 60px;">Gửi</a-button>
                </div>
            </a-col>
            <a-col span="8" :offset="2">
                <a-col>
                    <a-image src="/src/assets/cat-food-contact.png" :preview="false" :width="200" />
                </a-col>
                <a-col style="margin-right: 120px;">
                    <a-row>
                        <a-col style="margin-right: 10px;">
                            <EnvironmentOutlined style="font-size: 40px" />
                        </a-col>
                        <a-col>
                            <div style="font-weight: 600;">Địa Chỉ</div>
                            <div>Ninh Kiều, Cần Thơ, Việt Nam</div>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col style="margin-right: 120px; margin-top: 30px;">
                    <a-row>
                        <a-col style="margin-right: 10px;">
                            <PhoneOutlined style="font-size: 40px" />
                        </a-col>
                        <a-col>
                            <div style="font-weight: 600;">Số Điện Thoại</div>
                            <div>0987.654.321</div>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col style="margin-top: 30px;">
                    <a-row>
                        <a-col style="margin-right: 10px;">
                            <MailOutlined style="font-size: 40px;" />
                        </a-col>
                        <a-col>
                            <div style="font-weight: 600;">Email</div>
                            <div>meowfoodie.support@company.com</div>
                        </a-col>
                    </a-row>
                </a-col>
            </a-col>
        </a-row>
    </div>
</template>

<style></style>
