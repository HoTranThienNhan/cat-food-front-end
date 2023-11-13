
<script setup>
import { reactive, toRefs } from 'vue';
import { router } from '@/router';

// props
const props = defineProps({
    user: { type: Object, required: true }
});
const { user } = toRefs(props);

// emits
const emit = defineEmits(['submit:signup']);

// data
const userLocal = reactive(user);


// methods
async function onSubmitFinishedSignUp() {
    emit("submit:signup", userLocal?._object?.user);
};
const goToSignInPage = () => {
    router.push({ name: "signinpage" });
}
</script>


<template>
    <a-form :model="userLocal" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" autocomplete="off"
        @finish="onSubmitFinishedSignUp">
        <a-form-item label="Họ Tên" name="name" :rules="[{ required: true, message: 'Họ tên không được để trống.' }]">
            <a-input v-model:value="userLocal.name" />
        </a-form-item>

        <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'E-mail không được để trống.' }]">
            <a-input v-model:value="userLocal.email" />
        </a-form-item>

        <a-form-item label="Số điện thoại" name="phone" :rules="[{ required: true, message: 'Số điện thoại không được để trống.' }]">
            <a-input v-model:value="userLocal.phone" />
        </a-form-item>

        <a-form-item label="Địa Chỉ" name="address" :rules="[{ required: true, message: 'Địa chỉ không được để trống.' }]">
            <a-input v-model:value="userLocal.address" />
        </a-form-item>

        <a-form-item label="Mật Khẩu" name="password"
            :rules="[{ required: true, message: 'Mật khẩu không được để trống.' }]">
            <a-input-password v-model:value="userLocal.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
            <a-button type="primary" html-type="submit" style="width: 100%;">Đăng Ký</a-button>
        </a-form-item>

        <a-row justify="start" style="margin-bottom: 20px;">
            <a-col offset="6">
                Đã có tài khoản? <span role="button" @click="goToSignInPage" style="color: #4e89ff">Đăng nhập</span>
            </a-col>
        </a-row>
    </a-form>
</template>
