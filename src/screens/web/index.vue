<template>
    <Header @closeLoginModal="close"/>
    <Login v-if="showLoginModal" @onClose="close"/>
    <router-view></router-view>
</template>

<script>
import Header from '../../components/website/Header.vue'
import Login from '@/components/website/Login.vue'
export default {
    name: "Website",
    components: {
        Header,
        Login
    },
    data() {
        return {
            showLoginModal: false
        }
    },
    methods: {
        close() {
            this.showLoginModal = !this.showLoginModal
        }
    }
}
</script>

<style scoped>

</style>
