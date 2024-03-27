<template>
    <h2 class="admin-page-title">Dashboard</h2>
    <div class="dashboard-container">
        <div class="mb-3">
            <CommonInput label="Title"/>
        </div>
        <div class="mb-5">
            <CommonInput label="URI" />
        </div>
        <div class=" mb-5">
            <h2 class="admin-page-title">Right Menu</h2>
            <div class="row mb-3" v-for="(item, index) in rightMenu" :key="index">
                <div class="col">
                <CommonInput label="Title" v-model="item.title"/>
            </div>
            <div class="col"> 
                <CommonInput label="Icon" v-model="item.icon"/>
            </div>
            <div class="col-3 action-wrap">
                <button class="btn add-btn" @click="handleAdd"><i class="bi bi-plus"></i></button>
                <button class="btn delete-btn" @click="handleRemove(index)"><i class="bi bi-trash"></i></button>
            </div>
            </div>
        </div>
        <div>
            <CommonButton label="Submit" @click="onSubmit"/>
        </div>
    </div>
</template>

<script>
import CommonInput from "../../components/common/input.vue"
import { mapActions } from 'pinia';
import { useDashboard } from "../../stores/dashboard"
import CommonButton from "../../components/common/button.vue";

export default {
    name: "DashBoard",
    data() {
        return {
            uri: '',
            title: '',
            rightMenu: [
                {
                    title: "",
                    icon: ""
                }
            ],
            isFixed: false,
            offset: 80
        }
    },
    components: {
        CommonInput,
        CommonButton
    },
    created() {
        window.addEventListener("scroll", this.handleScroll)
    },
    unmounted() {
        window.removeEventListener("scroll", this.handleScroll)
    },
    methods: {
        ...mapActions(useDashboard, ['uploadLogo']),
        onUpload(file){
            const form = new FormData();
            form.append('file', file)
            this.uploadLogo(form)
        },
        onSubmit() {
            
        },
        handleAdd() {
            this.rightMenu = [...this.rightMenu, {
                title: '',
                icon: ''
            }]
        },
        handleRemove(index) {
            this.rightMenu.splice(index, 1)
        },
        handleScroll() {
            const el = document.getElementById("Admin-Header");
            this.isFixed = el?.scrollTop > this.offset;
        }
    }
}
</script>

<style scoped>
    .dashboard-container {
        width: 50%
    }
    .dashboard-container .card .card-body .card-title {
        font-weight: 700;
        font-size: 18px;
    }
    .dashboard-container .card .card-body .card-text {
        font-weight: 400;
        font-size: 16px;
    }
    .action-wrap {
        display: flex;
        align-items:flex-end;
        margin-bottom: 1px;
        gap: 10px;
    }
    .action-wrap .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        box-shadow: none;
        border: 1px solid chocolate;
       
    }
    .action-wrap .add-btn {
        font-size: 18px;
    }
</style>