import createApiClient from "./api.service";

class ReviewService {
    constructor(baseUrl = "/api/reviews") {
        this.api = createApiClient(baseUrl);
    }
    async createReview(data) {
        return (await this.api.post("/createReview", data)).data;
    }

    async getReviewsByProduct(id) {
        return (await this.api.get(`/getReviewsByProduct/${id}`)).data;
    }
}

export default new ReviewService();