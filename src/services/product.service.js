import createApiClient from "./api.service";

class ProductService {
    constructor(baseUrl = "/api/products") {
        this.api = createApiClient(baseUrl);
    }
    async getAllProducts() {
        return (await this.api.get("/getAllProducts")).data;
    }
    async getProductsByType(type) {
        return (await this.api.get(`/getProductsByType/${type}`)).data;
    }
    async searchProductsByName(name) {
        return (await this.api.get(`/searchProductsByName/${name}`)).data;
    }
    async createProduct(data) {
        return (await this.api.post("/createProduct", data)).data;
    }
    async updateProduct(id, data) {
        return (await this.api.post(`/updateProduct/${id}`, data)).data;
    }
    async getProductDetails(id) {
        return (await this.api.get(`/getProductDetails/${id}`)).data;
    }
}

export default new ProductService();