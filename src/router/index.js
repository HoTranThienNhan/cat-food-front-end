import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import SignInPage from "@/views/SignInPage.vue";
import SignUpPage from "@/views/SignUpPage.vue";
import MenuPage from "@/views/MenuPage.vue";
import SearchProduct from "@/views/SearchProduct.vue";
import ProductPage from "@/views/ProductPage.vue";
import CartPage from "@/views/CartPage.vue";
import CheckOutPage from "@/views/CheckOutPage.vue";
import OrderPage from "@/views/OrderPage.vue";
import OrderSuccessPage from "@/views/OrderSuccessPage.vue";
import ReviewPage from "@/views/ReviewPage.vue";
import FavoritePage from "@/views/FavoritePage.vue";
import EditProfilePage from "@/views/EditProfilePage.vue";
import ContactPage from "@/views/ContactPage.vue";
import AboutPage from "@/views/AboutPage.vue";

const routes = [
    {
        path: "/",
        name: "homepage",
        component: HomePage,
    },
    {
        path: "/signin",
        name: "signinpage",
        component: SignInPage,
    },
    {
        path: "/signup",
        name: "signuppage",
        component: SignUpPage,
    },
    {
        path: "/menu", 
        name: "menupage",
        component: MenuPage,
    },
    {
        path: "/searchproduct/:name?", // nullable props
        name: "searchproductpage",
        component: SearchProduct,
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/order",
        name: "orderpage",
        component: OrderPage,
    },
    {
        path: "/ordersuccess",
        name: "ordersuccesspage",
        component: OrderSuccessPage,
    },
    {
        path: "/product/:id",
        name: "productpage",
        component: ProductPage,
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/cart",
        name: "cartpage",
        component: CartPage,
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/checkout",
        name: "checkoutpage",
        component: CheckOutPage,
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/favorite",
        name: "favoritepage",
        component: FavoritePage,
    },
    {
        path: "/review/:orderId&:productId",
        name: "reviewpage",
        component: ReviewPage,
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/editprofile",
        name: "editprofilepage",
        component: EditProfilePage,
    },
    {
        path: "/contact",
        name: "contactpage",
        component: ContactPage,
    },
    {
        path: "/about",
        name: "aboutpage",
        component: AboutPage,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfoundpage",
        component: () => import("@/views/NotFound.vue"),
    },
];

export const router = createRouter({
    history: createWebHistory(!import.meta.env.BASE_URL),
    routes,
});

export default router;