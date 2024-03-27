<template>
    <div class="lgoin-backdrop" @click="toggleModal"></div>
    <div class="login-modal">
        <h2 class="text-center">Login</h2>
        <hr/>
    <div class="overflow-auto mt-4">
         <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">User Name</label>
                <input type="text" v-model="form.username" class="form-control login-input-field" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" v-model="form.password" class="form-control login-input-field" id="exampleInputPassword1">
            </div>
            <div class="mb-3 form-check ms-1">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
    </div>
            <div class="login-modal-footer">
            <hr class="mt-4"/>
            <button class="btn btn-chocolate" @click="onsubmit">Submit</button>

            
            <span class="d-flex align-items-center m-auto w-100 justify-content-between mt-2">
                If don't have an account?<a class="btn btn-link fs-7">Please register</a>
            </span>
                
            </div>
            </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue';
export default {
    name: 'Login',
    methods: {
        toggleModal() {
            this.$emit("onClose")
        },
        onsubmit(){
            const auth = useUserStore();
            const { username, password } = this.form;
            if(!username || !password){
                return null
            }
            auth.login({username, password}, this)
        }
    },
    setup() {
        const show = ref(true)
        const form = ref({
            username: "",
            password: ""
        });

        return {
            form,
            show
        }
    }
}
</script>

<style scoped>
    .lgoin-backdrop {
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .login-modal {
        max-width: 30%;
        background-color: #FFF;
        height: calc(100% - 150px);
        width: 100%;
        position: fixed;
        border-radius: 20px;
        padding: 30px;
        left: 0;
        right: 0;
        margin: auto;
        overflow: hidden;
    }
    .login-modal-footer {
       
    }
    .btn-chocolate {
        background-color: chocolate;
        color: #FFF;
        width: 50%;
        margin: auto;
        display: block;
        margin-top: 20px;
    }
    .login-input-field {
        outline: none;
        box-shadow: none;
    }
    .login-input-field:hover {
        box-shadow: none;
        outline: none;
    }
    @media (min-width: 768px) and (max-width: 992px){
        .login-modal {
            max-width: 50%
        }
    }
    @media (min-width: 576px) and (max-width: 768px){
        .login-modal {
            max-width: 70%;
        }
    }
    @media (max-width: 576px){
        .login-modal {
            max-width: 80%;
        }
    }
    
</style>