<template>
    <div class="d-flex justify-content-between ">
        <h2 class="admin-page-title">Product Management</h2>
        <div>
            <button class="btn btn-primary add-product-btn" @click="openModal">Add Product</button>
        </div>
    </div>
    <Table v-if="products.length" :header="header" :data="products">
        <tr v-for="(product, index) in products" :key="'product' + product.id">
            <td>{{index + 1}}</td>
            <td class="product-title">{{product.title}}</td>
            <td>₹{{product.price}}</td>
            <td class="product-description">{{product.description}}</td>
            <td>{{product.category}}</td>
            <td>
                <button>Edit</button>&nbsp;<button>Delete</button>
            </td>
        </tr>
   </Table>
   <div v-if="showLoading" class="wraploader">
    <Loader />
    </div>
    <Pagination v-model:currentPage="currentPage"/>
    <Modal :show="showModal" @close="handleModalClose" title="Add Product" @onSubmit="onsubmit">
        <div class="col">
            <div class="mb-3">
                <Input type="text" label="Product Title" id="title" name="title" v-model="form.title"/>
            </div>
            <div class="mb-3">
                <Input type="text" label="Product Price" id="price" name="price" v-model="form.price"/>
            </div>
            <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea class="form-control" v-model="form.description"></textarea>
            </div>
            <div class="mb-3">
                <label for="category" class="form-label">Category</label>
                <select class="form-select" v-model="form.category">
                    <option selected value="">Select</option>
                    <option v-for="category in categories" :key="category" :value="category">{{category}}</option>
                </select>
            </div>
        </div>
    </Modal>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useProductStore } from "../../stores/product"
import Table from "../../components/admin/Table.vue";
import Loader from "../../components/common/loader.vue";
import Modal from "../../components/common/modal.vue";
import Input from "../../components/common/input.vue";
import Pagination from "../../components/common/pagination.vue"
import Select from "../../components/common/select.vue"
export default {
    name: "ProductManagement",
    components: {
        Table,
        Loader,
        Modal,
        Input,
        Pagination,
        Select
    },
    data() {
        return {
            header: ["Title", "Price", "Description", "Category"],
            showLoading: false,
            showModal: false,
            form: {
                title: "",
                price: "",
                description: "",
                category: ""
            },
            currentPage: 1
        }
    },
    created() {
       this.getAllProducts();
       this.getAllCategories();
    },
    methods: {
        ...mapActions(useProductStore, ['getAllProducts', 'getAllCategories', 'addProduct']),
        handleModalClose() {
            this.showModal = !this.showModal
        },
        openModal() {
            this.showModal = !this.showModal
        },
        onsubmit() {
            this.addProduct(this.form)
        }
    },
    computed: {
        ...mapState(useProductStore, ['products', 'categories'])
    }
}
</script>

<style scoped>
    .wraploader {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60%;
    }
    .product-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 150px;
    }
    .product-description {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 150px;
    }
    .add-product-btn {
        background-color: chocolate;
        border-color: chocolate;
    }
    .add-product-btn:focus {
        outline: none;
        box-shadow: none;
    }
</style>