<script setup>
import { HomeOutlined, PhoneOutlined, MailOutlined, FacebookOutlined, InstagramOutlined } from '@ant-design/icons-vue';
</script>

<template>
    <a-row justify="space-around"
        style="background-color: rgb(46, 46, 46); color: #fff; padding: 20px 0px; margin-top: 30px;">
        <a-col span="8">
            <a-row>
                <a-col :offset="2">
                    <a-image height="90px" :preview="false" src="/src/assets/cat-food-logo.png" />
                </a-col>
                <a-col span="20" :offset="4" style="margin-top: 7px;">
                    Meow Foodie luôn sẵn lòng cung cấp cho những chú mèo của bạn những món ăn đảm bảo chất lượng 
                    về độ an toàn, hương vị và phù hợp với từng giai đoạn khác nhau.
                </a-col>
            </a-row>
        </a-col>
        <a-col span="7">
            <a-row style="margin-top: 20px;">
                <a-col span="24">
                    <a-col :offset="3" style="margin-bottom: 20px;">
                        <span style="font-size: 20px; font-weight: 600;">Liên Hệ</span>
                    </a-col>
                    <a-row style="margin-bottom: 20px;">
                        <a-col span="2" :offset="3">
                            <HomeOutlined style="font-size: 25px;" />
                        </a-col>
                        <a-col span="12">
                            <span style="font-size: 16px;">Ninh Kiều, Cần Thơ, Việt Nam</span>
                        </a-col>
                    </a-row>
                    <a-row style="margin-bottom: 20px;">
                        <a-col span="2" :offset="3">
                            <PhoneOutlined style="font-size: 25px;" />
                        </a-col>
                        <a-col span="12">
                            <span style="font-size: 16px;">0987.654.321</span>
                        </a-col>
                    </a-row>
                    <a-row style="margin-bottom: 20px;">
                        <a-col span="2" :offset="3">
                            <MailOutlined style="font-size: 25px;" />
                        </a-col>
                        <a-col span="12">
                            <span style="font-size: 16px;">meowfoodie.support@company.com</span>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
        </a-col>
        <a-col span="6">
            <a-row style="margin-top: 20px;">
                <a-col span="24">
                    <span style="font-size: 20px; font-weight: 600;">Theo Dõi Cửa Hàng</span>
                </a-col>
                <a-col span="24" style="margin-top: 20px;">
                    <FacebookOutlined style="font-size: 35px; margin-right: 20px;" />
                    <InstagramOutlined style="font-size: 35px;" />
                </a-col>
            </a-row>
        </a-col>
    </a-row>
</template>

<style></style>