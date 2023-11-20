<script setup>
import { useAuthStore } from '@/stores/auth.store';
import UserService from "@/services/user.service";
import { reactive, onMounted } from 'vue';
import { router } from '@/router';
import { message } from 'ant-design-vue';

const authStore = useAuthStore();
const user = authStore?.user;

const updatedUser = reactive({
    _id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
});

const getUserDetails = async () => {
    const thisUser = await UserService.getUserDetails(user?._id);
    updatedUser._id = thisUser?._id;
    updatedUser.name = thisUser?.name;
    updatedUser.email = thisUser?.email;
    updatedUser.phone = thisUser?.phone;
    updatedUser.address = thisUser?.address;
    updatedUser.password = thisUser?.password;
}

const onSubmitUpdatedUserProfile = async () => {
    try {
        await UserService.updateUser(user?._id, updatedUser);
        message.success('Cập nhật thông tin người dùng thành công', 3);
        getUserDetails();
        await authStore.updateUserProfile(updatedUser);
    } catch (e) {
        console.log(e);
        message.error('Cập nhật thông tin người dùng không thành công', 3);
    }
}

const onCancelUpdatedUserProfile = () => {
    router.push({ name: "homepage" });
}

onMounted(() => {
    getUserDetails();
});

const goToHomePage = () => {
    router.push({ name: "homepage" });
}
</script>

<template>
    <a-breadcrumb style="margin-bottom: 40px; margin-top: 50px;">
        <a-breadcrumb-item>
            <span role="button" @click="goToHomePage">Trang Chủ</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <span>Cập Nhật Thông Tin</span>
        </a-breadcrumb-item>
    </a-breadcrumb>

    <a-row justify="center" style="margin-bottom: 40px;">
        <a-col>
            <div style="font-weight: bold; font-size: 28px;">CẬP NHẬT THÔNG TIN NGƯỜI DÙNG</div>
        </a-col>
    </a-row>
    <a-form :model="updatedUser" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" autocomplete="off">
        <a-form-item label="Họ Tên" name="name" :rules="[{ required: true, message: 'Họ tên không được để trống.' }]">
            <a-input v-model:value="updatedUser.name" />
        </a-form-item>

        <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'E-mail không được để trống.' }]">
            <a-input v-model:value="updatedUser.email" />
        </a-form-item>

        <a-form-item label="Số điện thoại" name="phone"
            :rules="[{ required: true, message: 'Số điện thoại không được để trống.' }]">
            <a-input v-model:value="updatedUser.phone" />
        </a-form-item>

        <a-form-item label="Địa Chỉ" name="address" :rules="[{ required: true, message: 'Địa chỉ không được để trống.' }]">
            <a-input v-model:value="updatedUser.address" />
        </a-form-item>

        <!-- <a-form-item label="Mật Khẩu" name="password"
            :rules="[{ required: true, message: 'Mật khẩu không được để trống.' }]">
            <a-input-password v-model:value="updatedUser.password" />
        </a-form-item> -->

        <a-form-item :wrapper-col="{ offset: 6, span: 6 }">
            <a-popconfirm title="Bạn chắc chắn hủy thao tác cập nhật？" @confirm="onCancelUpdatedUserProfile">
                <a-button style="width: 40%; margin-right: 20px;">Hủy</a-button>
            </a-popconfirm>
            <a-popconfirm title="Bạn chắc chắn cập nhật thông tin？" @confirm="onSubmitUpdatedUserProfile">
                <a-button type="primary" style="width: 40%;">Cập Nhật</a-button>
            </a-popconfirm>
        </a-form-item>
    </a-form>
</template>

<style></style>