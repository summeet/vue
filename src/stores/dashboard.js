import { defineStore } from 'pinia';
import axios from "../request";
import apiUrl from '../utils/constant';

export const useDashboard = defineStore("dashboard", {
    state: () => ({
        
    }),
    actions: {
        async uploadLogo(formData) {
            return await axios.post('/dashboard/upload', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        },
        async createDashboard(data) {
            return await axios.post(apiUrl.dashboard, data)
        }
    }
})