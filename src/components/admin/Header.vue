<template>
    <div class="admin-header-container" id="Admin-Header">
        <nav class="admin-header">
            <h2>Admin</h2>
            <button class="btn d-block d-sm-none"> 
                <i class="bi bi-list"></i>
            </button>
        </nav>
    </div>
</template>

<script>
export default {
    name: "AdminHeader",
}
</script>

<style scoped>
    .admin-header-container {
        width: 100%;
        background-color: chocolate;
    }
    .admin-header {
        margin: auto;
        max-width: 90%;
        padding: 20px 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .admin-header h2 {
        color: #fff;
    }
    .admin-header .btn {
        outline: none;
        box-shadow: none;
    }
    .admin-header .bi.bi-list {
        font-size: 30px;
        color: #FFF;
    }
</style>