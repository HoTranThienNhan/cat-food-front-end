<script setup>
import { useCartStore } from '@/stores/cart.store';
import { useAuthStore } from '@/stores/auth.store';
import ProductService from "@/services/product.service";
import ReviewService from "@/services/review.service";
import { ref, toRefs, onMounted, watch, reactive } from 'vue';
import { router } from '@/router';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { getBase64 } from '@/utils';

const route = useRoute();

const authStore = useAuthStore();
const user = authStore?.user;


// props
let product = ref(null);
const loading = ref(false);
const messageError = ref('');
const { orderId, productId } = route?.params;
const reviewedProduct = reactive({
    orderId: '',
    productId: '',
    userId: '',
    star: '',
    description: '',
    images: [],
});

const ratingValue = ref(5);
const desc = ref(['Tệ', 'Không Tốt', 'Bình Thường', 'Tốt', 'Tuyệt Vời']);
const descriptionValue = ref("");

const reviewProduct = async () => {
    reviewedProduct.orderId = orderId;
    reviewedProduct.productId = productId;
    reviewedProduct.userId = user?._id;
    reviewedProduct.star = ratingValue.value;
    reviewedProduct.description = descriptionValue.value;
    let reviewedProductImages = [];
    if (fileReviewImageList.value.length > 0) {
        fileReviewImageList.value.map((imageProduct) => {
            reviewedProductImages.push(imageProduct.preview);
        });
    }
    reviewedProduct.images = reviewedProductImages;

    try {
        await ReviewService.createReview(reviewedProduct);

        message.success('Đánh giá thành công', 3);
        router.push({ name: "orderpage" });
    } catch (e) {
        message.error('Đánh giá thất bại', 3);
        messageError.value = e.response.data.message;
    }
}

// review images
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const fileReviewImageList = ref([]);

const handleCancelPreviewImage = () => {
    previewVisible.value = false;
    previewTitle.value = '';
};
const handlePreviewImage = async file => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    previewImage.value = file.url || file.preview;
    previewVisible.value = true;
    previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};
const uploadImageReview = async (imageFile) => {
    const file = imageFile?.file;
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
}



// methods
const getProductDetails = async (id) => {
    try {
        product.value = await ProductService.getProductDetails(id);
    } catch (error) {
        console.log(error);
        router.push({
            name: "notfoundpage",
            params: {
                pathMatch: route.path.split("/").slice(1)
            },
            query: route.query,
            hash: route.hash,
        });
    }
}
onMounted(() => {
    getProductDetails(productId);
});



// navigate
const goToHomePage = () => {
    router.push({ name: "homepage" });
}
const goToMyOrderPage = () => {
    router.push({ name: "orderpage" });
}
</script>

<template>
    <a-breadcrumb style="margin-bottom: 40px; margin-top: 50px;">
        <a-breadcrumb-item>
            <span role="button" @click="goToHomePage">Trang Chủ</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <span role="button" @click="goToMyOrderPage">Đơn Hàng</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <span>Đánh Giá Sản Phẩm</span>
        </a-breadcrumb-item>
    </a-breadcrumb>

    <a-spin :spinning="loading">
        <a-row justify="center">
            <a-col>
                <div style="font-weight: bold; font-size: 28px; margin-bottom: 40px;">ĐÁNH GIÁ SẢN PHẨM</div>
            </a-col>
        </a-row>
        <a-row style="margin-bottom: 30px;">
            <a-col span="8" align="center" style="padding: 0px 25px 30px 0px">
                <a-image v-bind:src="`${product?.image}`" :width="330" />
            </a-col>
            <a-col span="16">
                <a-card style="padding: 20px 40px; border: 3px dashed #d58124">
                    <a-row justify="space-evenly">
                        <a-col span="24" style="margin-bottom: 10px;">
                            <h3 style="text-transform: uppercase;">{{ product?.name }}</h3>
                        </a-col>
                        <a-col span="24" style="margin-bottom: 20px;">
                            <a-rate v-model:value="ratingValue" :tooltips="desc" :allow-clear="false" />
                            <span class="ant-rate-text">{{ desc[ratingValue - 1] }}</span>
                        </a-col>
                        <a-col span="24" style="margin-bottom: 20px;">
                            <a-textarea v-model:value="descriptionValue" placeholder="Mô tả sản phẩm" :rows="3" />
                        </a-col>
                        <a-upload @change="uploadImageReview" v-model:file-list="fileReviewImageList" :max-count="3" list-type="picture-card"
                            @preview="handlePreviewImage">
                            <div v-if="fileReviewImageList.length < 3">
                                <plus-outlined />
                                <div style="margin-top: 8px">Upload</div>
                            </div>
                        </a-upload>
                        <a-modal :open="previewVisible" :title="previewTitle" :footer="null"
                            @cancel="handleCancelPreviewImage">
                            <img alt="example" style="width: 100%" :src="previewImage" />
                        </a-modal>
                        <a-col span="24">
                            <a-popconfirm title="Bạn chắc chắn đánh giá sản phẩm này？" @confirm="reviewProduct">
                                <a-button type="primary" danger>Đánh Giá</a-button>
                            </a-popconfirm>
                        </a-col>
                        <a-col span="24" style="margin-top: 20px;">
                            <span style="color: red;">{{ messageError }}</span>
                        </a-col>
                    </a-row>
                </a-card>
            </a-col>
        </a-row>
    </a-spin>
</template>

<style></style>
