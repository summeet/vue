<template>
    <header class="header">
        <div class="container d-flex align-items-center">
            <h2>MANTRA</h2>
            <div class="hamburger hamburger--vortex" :class="{isactive: isMenuActive}">
                <div class="hamburger-box">
                <div class="hamburger-inner"></div>
            </div>
         </div>
        <div class="menu d-none d-lg-block">
            <ul class="navbar">
                <li>
                    <router-link to="/home">HOME</router-link>
                </li>
                <li>
                  <div class="dropdown" ref="componentRef">
                    <button @click="toggleDropdown" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-person-circle"></i>
                        {{isLoggedIn ?  'User' : 'Log In'}}
                    </button>
                    <ul v-if="isLoggedIn" class="dropdown-menu" :class="{ show: showProfileMenu }" aria-labelledby="dropdownMenuButton1">
                      <li><router-link class="dropdown-item" to="/admin/dashboard">Admin</router-link></li>
                      <li><router-link class="dropdown-item" to="" @click.prevent="logout">Logout</router-link></li>
                    </ul>
                  </div>
                </li>
            </ul>
        </div>
        </div>
    </header>
</template>

<script >
import { ref, computed } from 'vue';
import useDetectOutsideClick from "@/hook/useDetectOutsideClick";
import { useUserStore } from "../../stores/user"

export default {
  
  methods: {
    toggleDropdown() {
      if(this.isLoggedIn){
        this.showProfileMenu = !this.showProfileMenu
      } else {
        this.$emit("closeLoginModal")
      }
    },
  },
  setup(){
    const componentRef = ref(null);
    const showProfileMenu = ref(false);
    const auth = useUserStore();
    useDetectOutsideClick(componentRef, () => showProfileMenu.value = false)
    const isLoggedIn = computed(() => auth.isLoggedIn) 
    return {
      componentRef,
      showProfileMenu,
      isLoggedIn,
      logout: auth.logout
    }
  },
}
</script>


<style scoped>
    .logo {
      width: auto;
      height: 90px;
      background-repeat: no-repeat;
    }
    .header {
        display: flex;
        background-color: chocolate;
        width: 100%;
        font-family: 300;
    }
    .header h2 {
        margin-bottom: 0;
        color: white;
    }
    .menu {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .menu .navbar {
        list-style-type: none;
        gap: 10px;
        margin-bottom: 0;
        justify-content: flex-end;
    }
    .menu .navbar li {
        padding: 10px 15px;
    }
    .menu .navbar li a {
        color: #FFF;
        font-size: 15px;
        font-weight: 300;
    }
    .menu .navbar li a.profile-link {
        display: flex;
    }
    .menu .navbar .dropdown .dropdown-menu {
      bottom: -98px
    }
    .menu .navbar .dropdown .dropdown-menu li {
      padding: 0;
    }
    .menu .navbar .dropdown .dropdown-item {
      color: #000 !important; 
    }
    .menu .navbar li a.profile-link i {
        width: 33px;
        height: 26px;
        display: block;
    }

</style>