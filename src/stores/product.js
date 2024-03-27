import { defineStore } from 'pinia';
import axios from "../request";
import apiUrl from '../utils/constant';

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [],
        categories: []
    }),
    actions: {
        getAllProducts(limit = 10) {
            const path = apiUrl.products + '?limit=' + limit
            return axios.get(path)
                .then(res => {
                    this.products = res.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getAllCategories() {
            return axios.get(apiUrl.categories)
            .then(res => {
                this.categories = res.data
            })
            .catch(err => {
                console.log(err)
            })
        },
        addProduct(form) {
            return axios.post(apiUrl.products, form)
        }
    }
})