import { defineStore } from "pinia";
import axios from "../request";
import apiUrl from "../utils/constant";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: null,
        isLoggedIn: false,
        list: []
    }),
    actions: {
        login(user, context){
            return axios
            .post(apiUrl.login, user)
            .then(res => {
                if(res.data.token){
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("user", user)
                    this.isLoggedIn = true
                    context.toggleModal();
                }
            })
        },
        logout() {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            this.isLoggedIn = false
        },
        createUser(form, context) {
            return axios.post(apiUrl.user, form)
                .then(res => {
                    
                })
        },
        getAllUsers(context) {
            return axios.get(apiUrl.user)
            .then(response => {
                this.list = response.data
                context.showLoading = false
            })
            .catch(err => console.log(err))
        },
        async getUserById(id) {
            const path = apiUrl.users + "/" + id
            return await axios.get(path)
        },
        deleteUserById(id, index) {
            const path = apiUrl.users + "/" + id;
            this.list.splice(index, 1)
            return axios.get(path).then(res => console.log(res))
        }
    },
})