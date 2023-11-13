import { defineStore } from 'pinia';

import { router } from '@/router';

import UserService from "@/services/user.service";

export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        cart: JSON.parse(localStorage.getItem('cart'))
            ? JSON.parse(localStorage.getItem('cart'))
            : [{
                "userId": "",
                "products": [
                    {
                        "_id": "",
                        "name": "",
                        "type": "",
                        "price": 0,
                        "image": "",
                        "amount": 0,
                        "description": "",
                    }
                ]
            }]
    }),
    actions: {
        async createCart(data) {
            const userEmail = JSON.parse(JSON.stringify(data))?.email;
            const userData = await UserService.getUserDetailsByEmail(userEmail);

            // store user cart in local storage
            // if user cart is not created, create user cart state
            let existedUserCart = false;
            this.cart.map((userCart) => {
                if (userData?._id === userCart.userId) {
                    existedUserCart = true;
                }
            });
            if (existedUserCart === false) {
                this.$state.cart.push({
                    "userId": userData?._id,
                    "products": [
                        {
                            "_id": "",
                            "name": "",
                            "type": "",
                            "price": 0,
                            "image": "",
                            "amount": 0,
                            "description": "",
                        }
                    ]
                });
                localStorage.setItem('cart', JSON.stringify(this.cart));
            }
            console.log(JSON.parse(localStorage.getItem('cart')));
        },
        async addCart(data) {
            try {
                const { userId, product } = data;

                this.$state.cart.map((cartState) => {
                    if (cartState.userId === userId) {
                        // flag for checking exist product in cart
                        let isExistProductInCart = false;

                        cartState.products.map((item, index) => {
                            item = JSON.parse(JSON.stringify(item));
                            if (product?._id === item?._id) {
                                // update amount if product exists in cart
                                cartState.products[index].amount = cartState.products[index].amount + product?.amount;
                                isExistProductInCart = true;
                            }
                        });
                        // if not exist product in cart
                        if (isExistProductInCart === false) {
                            cartState.products.push(product);
                        }

                        // store user cart in local storage
                        localStorage.setItem('cart', JSON.stringify(this.cart));
                        console.log(localStorage);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
        getCart(userId) {
            let userCart = null;
            JSON.parse(localStorage.getItem('cart'))?.map((cart) => {
                if (cart?.userId === userId) {
                    userCart = cart;
                }
            });
            return userCart;
        },
        removeProduct(productId, userId) {
            this.$state.cart.map((cartState, userIndex) => {
                if (cartState.userId === userId) {
                    // find product index in state array
                    const productIndex = this.$state.cart[userIndex].products.findIndex(item => item._id === productId);
                    // remove this product from the array
                    this.$state.cart[userIndex].products.splice(productIndex, 1);
                    // update local storage
                    localStorage.setItem('cart', JSON.stringify(this.cart));
                }
            });
        },
        clearUserCart(userId) {
            this.$state.cart.map((cartState, userIndex) => {
                if (cartState.userId === userId) {
                    // remove all products from the array
                    this.$state.cart[userIndex].products.splice(1);
                    // update local storage
                    localStorage.setItem('cart', JSON.stringify(this.cart));
                }
            });
        },
        increaseAmount(data) {
            try {
                const { userId, product } = data;
                this.$state.cart.map((cartState, userIndex) => {
                    if (cartState.userId === userId) {
                        cartState.products.map((item, cartProductsIndex) => {
                            item = JSON.parse(JSON.stringify(item));
                            if (product?._id === item?._id) {
                                // update amount if product exists in cart
                                if (this.$state.cart[userIndex].products[cartProductsIndex].amount < 10) {
                                    this.$state.cart[userIndex].products[cartProductsIndex].amount++;
                                } else {
                                    this.$state.cart[userIndex].products[cartProductsIndex].amount = 10;
                                }
                                console.log(this.cart);
                            }
                        });
                    }
                });
                // store user cart in local storage
                localStorage.setItem('cart', JSON.stringify(this.cart));
            } catch (error) {
                console.log(error);
            }
        },
        decreaseAmount(data) {
            try {
                const { userId, product } = data;
                this.$state.cart.map((cartState, userIndex) => {
                    if (cartState.userId === userId) {
                        cartState.products.map((item, cartProductsIndex) => {
                            item = JSON.parse(JSON.stringify(item));
                            if (product?._id === item?._id) {
                                // update amount if product exists in cart
                                if (this.$state.cart[userIndex].products[cartProductsIndex].amount > 1) {
                                    this.$state.cart[userIndex].products[cartProductsIndex].amount--;
                                } else {
                                    this.$state.cart[userIndex].products[cartProductsIndex].amount = 1;
                                }
                            }
                        });
                    }
                });
                // store user cart in local storage
                localStorage.setItem('cart', JSON.stringify(this.cart));
            } catch (error) {
                console.log(error);
            }
        },
        getTotalAmount(userId) {
            let totalAmount = 0;

            this.$state.cart.map((cartState) => {
                if (cartState.userId === userId) {
                    this.$state.cart.products.map((item, index) => {
                        totalAmount += item.amount;
                    });
                }
            });

            return totalAmount;
        },
        getTotalPrice(userId) {
            let totalPrice = 0;

            this.$state.cart.map((cartState) => {
                if (cartState.userId === userId) {
                    cartState.products.map((item, index) => {
                        totalPrice += item.amount * item.price;
                    });
                }
            });
            return totalPrice;
        },
        clearAllCarts() {
            localStorage.removeItem('cart');
        }
    },
    persist: true,
});