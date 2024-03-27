<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li  class="page-item">
                <a class="page-link" href="#" @click.prevent="handlePrev">Previous</a>
            </li>
            <li 
                v-for="pageNumber in numbers" 
                :key="pageNumber" 
                class="page-item" 
                :class="{ active: pageNumber === currentPage }">
                <a class="page-link" href="#" @click.prevent="setCurrentPage(pageNumber)">{{pageNumber}}</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#" @click.prevent="handleNext">Next</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "Pagination",
    props: {
        currentPage: {
            type: Number,
            default: 1
        },
        length: {
            type: Number,
            default: 30
        },
        limit: {
            type: Number,
            default: 10
        }
    },
    computed: {
        numbers() {
            const totalPage = Math.ceil(this.length / this.limit);
            return Array.from({ length: totalPage }, (_, index) => index + 1);
        },
    },
    methods: {
        handlePrev() {
            if (this.currentPage > 1) {
                this.$emit("update:currentPage", this.currentPage - 1);
            }
        },
        handleNext() {
            const totalPage = Math.ceil(this.length / this.limit);
            if(this.currentPage < totalPage){
                this.$emit("update:currentPage", this.currentPage + 1)
            }
        },
        setCurrentPage(pageNumber) {
            this.$emit("update:currentPage", pageNumber);
        },
     },
}
</script>

<style scoped>
    .pagination .page-item.active {
        z-index: 0;
    }

    .pagination .page-item .page-link {
        outline: none;
        box-shadow: none;
    }
</style>