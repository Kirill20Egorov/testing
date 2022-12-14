const chai = require('chai');
const assert = chai.assert
const baseUrl = 'http://shop.qatl.ru/api';
const expect = chai.expect;
const request = require('supertest')(baseUrl)

class APIrequests {

    addedIds = []
    constructor(request)
    {
        request = require('supertest')(baseUrl)
    }
    async addProduct(product) {
        const res = await request
            .post('/addproduct')
            .send(product)
        this.addedIds.push(res.body.id)
        return res;
    }

    async getProducts() {
        const res = await request.get('/products')
        return res;
    }

    async editProduct(id, editData) {
        const res = await request
            .post('/editproduct')
            .send({
                id: id,
                ...editData,
            })
        return res
    }

    async deleteProduct(id) {
        const res = await request.get('/deleteproduct?id=' + id)
        let deletedIndex = this.addedIds.indexOf(id)
        if (deletedIndex != -1) {
            this.addedIds.splice(deletedIndex, 1)
        }
        return res
    }

    getAddedIds() {
        return this.addedIds
    }
}

module.exports = {
    APIrequests
}