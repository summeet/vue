<template >
   <span>
    <AdminHeader />
        <div class="d-flex h-100">
            <Sidebar class="d-none d-sm-block"/>
            <div class="admin-main">
                <router-view ></router-view>
            </div>
        </div>
   </span>
</template>

<script>
import AdminHeader from "@/components/admin/Header.vue"
import Sidebar from "@/components/admin/Sidebar.vue"
export default {
   name: "ADMIN",
   components: {
        AdminHeader,
        Sidebar
   },
}
</script>

<style scoped>
    .admin-main {
        width: 79%;
        padding: 20px;
    }
    @media (max-width: 575px){
        .admin-main {
            width: 100%;
        }
    }
</style>