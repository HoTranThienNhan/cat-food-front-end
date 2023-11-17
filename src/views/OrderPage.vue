<script setup>
import { useAuthStore } from '@/stores/auth.store';
import OrderService from "@/services/order.service";
import { ref, onMounted } from 'vue';
import { router } from '@/router';
import ProductCard from "@/components/ProductCard.vue";
import { message } from 'ant-design-vue';
import { ExpandAltOutlined, ShrinkOutlined, SmileTwoTone } from '@ant-design/icons-vue';

const authStore = useAuthStore();
const user = authStore?.user;

// props
const orders = ref([]);
const loading = ref(false);

// methods
const fetchData = async () => {
    try {
        // loading.value = true;
        orders.value = await OrderService.getOrder(user?._id);
        // loading.value = false;
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    fetchData();
});


// cancel order
const cancelOrder = async (order) => {
    await OrderService.cancelOrder(order, "Đã Hủy");
    message.success('Hủy đơn hàng thành công', 3);
    fetchData();
}


// review order
const reviewProduct = async (orderId, productId) => {
    router.replace({
        name: "reviewpage",
        params: {
            orderId: orderId,
            productId: productId
        },
    });
}


// shrink - expand order card
const handleShrinkOrderCard = (index) => {
    const targetDivClassName = "order-card-" + index;
    const targetDiv = document.getElementsByClassName(targetDivClassName)[0];
    targetDiv.classList.remove('order-card-expanded');
    targetDiv.classList.add('order-card-shrunk');
}

const handleExpandOrderCard = (index) => {
    const targetDivClassName = "order-card-" + index;
    const targetDiv = document.getElementsByClassName(targetDivClassName)[0];
    targetDiv.classList.remove('order-card-shrunk');
    targetDiv.classList.add('order-card-expanded');
}


// filter dropdown by order status
const orderStatusFiler = ref("Tất Cả");
const handleMenuClick = async (value) => {
    if (value.key === '1') {
        fetchData();
        orderStatusFiler.value = "Tất Cả";
    } else if (value.key === '2') {
        orders.value = await OrderService.getOrderByStatus('Chờ Xác Nhận');
        orderStatusFiler.value = "Chờ Xác Nhận";
    } else if (value.key === '3') {
        orders.value = await OrderService.getOrderByStatus('Chờ Lấy Hàng');
        orderStatusFiler.value = "Chờ Lấy Hàng";
    } else if (value.key === '4') {
        orders.value = await OrderService.getOrderByStatus('Đang Giao');
        orderStatusFiler.value = "Đang Giao";
    } else if (value.key === '5') {
        orders.value = await OrderService.getOrderByStatus('Đã Giao');
        orderStatusFiler.value = "Đã Giao";
    } else if (value.key === '6') {
        orders.value = await OrderService.getOrderByStatus('Đã Hủy');
        orderStatusFiler.value = "Đã Hủy";
    }
}


// navigate
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
            <span>Đơn Hàng Của Tôi</span>
        </a-breadcrumb-item>
    </a-breadcrumb>

    <a-spin :spinning="loading">
        <a-row justify="center" style="margin-bottom: 20px;">
            <a-col>
                <div style="font-weight: bold; font-size: 28px;">ĐƠN HÀNG CỦA TÔI</div>
            </a-col>
        </a-row>
        <a-row style="margin-bottom: 50px;">
            <a-col span="24">
                <a-row style="margin-bottom: 30px;">
                    <a-dropdown>
                        <template #overlay>
                            <a-menu @click="handleMenuClick">
                                <a-menu-item key="1">
                                    Tất Cả
                                </a-menu-item>
                                <a-menu-item key="2">
                                    Chờ Xác Nhận
                                </a-menu-item>
                                <a-menu-item key="3">
                                    Chờ Lấy Hàng
                                </a-menu-item>
                                <a-menu-item key="4">
                                    Đang Giao
                                </a-menu-item>
                                <a-menu-item key="5">
                                    Đã Giao
                                </a-menu-item>
                                <a-menu-item key="6">
                                    Đã Hủy
                                </a-menu-item>
                            </a-menu>
                        </template>
                        <a-button>
                            {{ orderStatusFiler }}
                            <DownOutlined />
                        </a-button>
                    </a-dropdown>
                </a-row>
                <a-row justify="space-evenly">
                    <a-col span="24" v-for="(order, index) in orders" style="margin-bottom: 30px;">
                        <a-card hoverable :class="'order-card-shrunk order-card-' + index">
                            <a-row justify="space-between">
                                <a-col>
                                    <a-row>
                                        <h4>Đơn Hàng #{{ order?._id }}</h4>
                                        <span style="margin-left: 20px;">
                                            <a-tag color="blue" style="font-size: 16px;">{{ order?.status }}</a-tag>
                                        </span>
                                    </a-row>
                                </a-col>
                                <a-col>
                                    <ExpandAltOutlined class="expand-button" style="font-size: 24px;"
                                        @click="handleExpandOrderCard(index)" />
                                    <ShrinkOutlined class="shrink-button" style="font-size: 24px;"
                                        @click="handleShrinkOrderCard(index)" />
                                </a-col>
                            </a-row>
                            <a-row>
                                <div style="font-size: 16px; margin-bottom: 20px;">
                                    Tổng Tiền: <span style="font-weight: 700;">{{ order?.totalPrice?.toLocaleString() }}
                                        VNĐ</span>
                                </div>
                            </a-row>
                            <a-row>
                                <a-col span="7">
                                    <div style="font-size: 16px; margin-bottom: 10px;">
                                        Phương Thức Thanh Toán: <span style="font-weight: 500;">{{ order?.method }}</span>
                                    </div>
                                    <div style="font-size: 16px; margin-bottom: 10px;">
                                        Phí Vận Chuyển: <span style="font-weight: 500;">{{
                                            order?.deliveryFee?.toLocaleString() }} VNĐ</span>
                                    </div>
                                    <div style="font-size: 16px; margin-bottom: 10px;">
                                        Nơi Nhận: <span style="font-weight: 500;">{{ order?.address }}</span>
                                    </div>
                                    <div style="font-size: 16px; margin-bottom: 10px;">
                                        Số Điện Thoại: <span style="font-weight: 500;">{{ order?.phone }}</span>
                                    </div>
                                    <div style="font-size: 16px; margin-bottom: 15px;">
                                        Tình Trạng: <span style="font-weight: 500;">{{ order?.status }}</span>
                                    </div>
                                    <div>
                                        <a-popconfirm
                                            v-if="order?.status === 'Chờ Xác Nhận' || order?.status === 'Chờ Lấy Hàng'"
                                            title="Bạn có muốn hủy đơn hàng này？" @confirm="() => cancelOrder(order)">
                                            <a-button
                                                v-if="order?.status === 'Chờ Xác Nhận' || order?.status === 'Chờ Lấy Hàng'"
                                                type="primary" danger>
                                                Hủy Đơn Hàng
                                            </a-button>
                                        </a-popconfirm>
                                    </div>
                                </a-col>
                                <a-col span="17" class="order-product-card">
                                    <a-row v-for="(product, productIndex) in order?.products" align="middle"
                                        style="margin-bottom: 10px;">
                                        <a-col span="5" style="margin-right: 20px;">
                                            <a-image v-bind:src="`${product?.image}`" :width="110" :preview="false"
                                                :previewMask="false" />
                                        </a-col>
                                        <a-col span="8">
                                            <div>
                                                <h5>{{ product?.name }}</h5>
                                            </div>
                                            <div style="font-size: 16px; margin-bottom: 10px;">
                                                Loại: <span style="font-weight: 500;">{{ product?.type }}</span>
                                            </div>
                                        </a-col>
                                        <a-col span="3">
                                            <div style="font-size: 16px; margin-bottom: 10px;">
                                                <span style="font-weight: 500;">x{{ product?.amount }}</span>
                                            </div>
                                        </a-col>
                                        <a-col span="4">
                                            <div style="font-size: 16px; margin-bottom: 10px;">
                                                <span style="font-weight: 500;">{{ product?.price?.toLocaleString() }}
                                                    VNĐ</span>
                                            </div>
                                        </a-col>
                                        <a-col span="3">
                                            <a-button v-if="order?.status === 'Đã Giao' && product?.isReviewed === false"
                                                type="primary" @click="() => reviewProduct(order?._id, product?._id)">
                                                Đánh Giá
                                            </a-button>
                                            <a-button v-if="order?.status === 'Đã Giao' && product?.isReviewed === true"
                                                disabled>
                                                Đã Đánh Giá
                                            </a-button>
                                        </a-col>
                                    </a-row>
                                </a-col>
                            </a-row>
                        </a-card>
                    </a-col>
                </a-row>
                <a-result v-if="orders?.length === 0" title="Hình như chưa có đơn hàng nào">
                    <template #icon>
                        <SmileTwoTone />
                    </template>
                </a-result>
            </a-col>
        </a-row>
    </a-spin>


    <!-- </div> -->
</template>

<style>
.order-product-card {
    height: 230px;
    overflow: auto;
    margin-bottom: 10px;
}

.order-card-expanded {
    height: 370px;
    padding: 0px 25px;
    border-radius: 20px;
    background-color: #f7f7f7;
    border: 3px dashed #c8c8c8;
}

.order-card-shrunk {
    height: 110px;
    padding: 0px 25px;
    overflow: hidden;
    border-radius: 20px;
    background-color: #f7f7f7;
    border: 3px dashed #c8c8c8;
}

.order-card-shrunk .expand-button {
    display: block;
}

.order-card-shrunk .shrink-button {
    display: none;
}

.order-card-expanded .shrink-button {
    display: block;
}

.order-card-expanded .expand-button {
    display: none;
}
</style>
