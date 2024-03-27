<template>
    <div class="admin-sidebar" :class="{fixed: isFixed}">
        <div class="admin-nav-sidebar">
            <ul>
                 <li>
                    <router-link to="/admin/dashboard" active-class="active">Dashboard</router-link>
                </li>
                <li>
                    <router-link to="/admin/user-management" active-class="active">User Management</router-link>
                </li>
                <li>
                    <router-link to="/admin/product-management" active-class="active">Product Management</router-link>
                </li>
                <li>
                    <router-link to="/" active-class="active">Logout</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isFixed: false,
            offset: 80
        }
    },
    beforeMount(){
        const path = this.$router.currentRoute._value.fullPath;
        if(path === "/admin" || path === "/admin/"){
            this.$router.push("/admin/dashboard")
        }
    },
    created() {
        window.addEventListener("scroll", this.handleScroll)
    },
   unmounted() {
        window.removeEventListener("scroll", this.handleScroll)
    },
    methods: {
        handleScroll(event) {
            const el = document.body;
            this.isFixed = el?.scrollTop > this.offset;
        }
    }
}
</script>

<style scoped>
    .admin-sidebar {
        background-color: chocolate;
        height: 100%;
        width: 21%;
        padding-top: 20px;
        margin-top: 1px;
        overflow: hidden;
    }
    .admin-nav-sidebar ul {
        list-style-type: none;
        padding-left: unset;
    }
    .fixed {
        position: fixed;
    }
    .admin-nav-sidebar ul li:hover {
        background-color: #FFF;
        cursor: pointer;
    }
    .admin-nav-sidebar ul li:hover a {
        color: #000;
    }
    .admin-nav-sidebar ul li a {
        color: #fff;
        font-size: calc(150% - 5px);
        font-weight: 500;
        padding: 20px 0 20px 30px;
        display: block;
    }
    .admin-nav-sidebar ul li a.active {
        background-color: #FFF;
        color: #000;
    }
    @media (max-width: 992px) {
        .admin-nav-sidebar ul li a {
            padding-left: 20px;
        }
    }
</style>