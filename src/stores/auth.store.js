import { defineStore } from 'pinia';

import { router } from '@/router';

import UserService from "@/services/user.service";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user'))
    }),
    actions: {
        async signinStore(data) {
            try {
                const isSignedIn = await UserService.signin(data);
                const userEmail = JSON.parse(JSON.stringify(data))?.email;

                const userData = await UserService.getUserDetailsByEmail(userEmail);

                if (isSignedIn) {
                    // update pinia state
                    this.user = userData;

                    // store user details in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(this.user));

                    // redirect to the previous page before sign in
                    router.push({ name: "homepage" });
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateUserProfile(data) {
            try {
                const userEmail = JSON.parse(JSON.stringify(data))?.email;
                const userData = await UserService.getUserDetailsByEmail(userEmail);
                // update pinia state
                this.user = userData;

                // store user details in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(this.user));
            } catch (error) {
                console.log(error);
            }
        },
        async addFavoriteStore(productId) {
            try {
                let isFavorited = false;
                this.user.favoriteProducts.map((favProd) => {
                    if (favProd === productId) {
                        isFavorited = true;
                    }
                });
                if (isFavorited === false) {
                    this.user.favoriteProducts.push(productId);
                    localStorage.setItem('user', JSON.stringify(this.user));
                }
            } catch (error) {
                console.log(error);
            }
        },
        async removeFavoriteStore(productId) {
            try {
                this.user.favoriteProducts.map((favProd, index) => {
                    if (favProd === productId) {
                        this.user.favoriteProducts.splice(index, 1);
                    }
                });
                localStorage.setItem('user', JSON.stringify(this.user));
            } catch (error) {
                console.log(error);
            }
        },
        signoutStore() {
            this.user = null;
            localStorage.removeItem('user');
            router.push({ name: "signinpage" });
        }
    },
    persist: true,
});