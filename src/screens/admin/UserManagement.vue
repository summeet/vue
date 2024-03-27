<template>
   <div class="d-flex justify-content-between ">
        <h2 class="admin-page-title">User Management</h2>
        <div>
            <button 
                class="btn btn-primary add-user-btn" 
                @click="toggleModal">
                Add User
            </button>
        </div>
    </div>
   <CustomTable v-if="list.length" :header="header" :data="list">
        <tr v-for="(user, index) in list" :key="'user' + user.id">
            <td>{{index + 1}}</td>
            <td>{{user.firstName}} {{user.lastName }}</td>
            <td>{{user.email}}</td>
            <td>{{user.address[0].city}}</td>
            <td><button @click="handleEdit(user.id)">Edit</button>&nbsp;<button @click="deleteUserById(user.id, index)">Delete</button></td>
        </tr>
   </CustomTable>
   <div v-if="showLoading" class="wraploader">
    <Loader />
    </div>
    <Pagination v-model:currentPage="currentPage" @update:currentPage="handlePageChange"/>
    <Modal :show="showModal" @close="toggleModal" title="Add user" @onSubmit="onSubmit">
        <div class="row">
            <div class="col mb-3">
                <CustomInput 
                    type="text" 
                    id="firstname" 
                    label="First Name*" 
                    v-model="form.firstname"
                    customClass="field"
                    @keypress="preventNumericInput"
                />
                <div v-if="formErrors.firstname" class="invalid-feedback d-block">
                    {{ formErrors.firstname }}
                </div>
            </div>
            <div class="col mb-3">
                <CustomInput 
                    type="text" 
                    id="lastname" 
                    label="Last Name*" 
                    v-model="form.lastname"
                    customClass="field"
                    @keypress="preventNumericInput"
                />
                <div v-if="formErrors.lastname" class="invalid-feedback d-block">
                    {{ formErrors.lastname }}
                </div>
            </div>
             <div class="col mb-3">
                <CustomInput 
                    type="text" 
                    id="username"
                    label="User Name*" 
                    customClass="field"
                    v-model="form.username"
                />
                <div v-if="formErrors.username" class="invalid-feedback d-block">
                    {{ formErrors.username }}
                </div>
            </div>
            <div class="col mb-3">
                <CustomInput 
                    id="email"
                    type="email" 
                    label="Email*" 
                    v-model="form.email"
                />
                <div v-if="formErrors.email" class="invalid-feedback d-block">
                    {{ formErrors.email }}
                </div>
            </div>
            <div class="mb-3">
                <CustomInput 
                    id="number"
                    type="number" 
                    label="Phone Number*" 
                    customClass="field"
                    v-model="form.phone"
                />
                <div v-if="formErrors.phone" class="invalid-feedback d-block">
                    {{ formErrors.phone }}
                </div>
            </div>
            <div class="col mb-3">
                <CustomInput 
                    type="text" 
                    id="address"
                    label="Address*" 
                    v-model="form.address"
                />
            </div>
            <div class="col-6 mb-3">
                <label class="form-label">Country*</label>
                <CustomSelect :data="countries" key="isoCode" v-model="form.country" id="isoCode" label="name"/>
            </div>
            <div class="col-6 mb-3">
                <label class="form-label">State</label>
                <CustomSelect :data="states" key="isoCode" v-model="form.state" id="isoCode" label="name" :disable="!form.country"/>
            </div>
            <div class="col-6 mb-3">
                <label class="form-label">City</label>
                <CustomSelect :data="cities" key="name" v-model="form.city" id="name" label="name" :disable="!form.state || !form.state"/>
            </div>
            <div class="col-6 mb-3">
                <CustomInput label="Zip Code" type="text" id="zip" v-model="form.zip"/>
            </div>
        </div>
    </Modal>
</template>

<script>
import { Country, State, City }  from 'country-state-city';
import { ref, watch, computed } from 'vue';
import CustomTable from "@/components/admin/Table.vue"
import Loader from "@/components/common/loader.vue";
import Modal from "@/components/common/modal.vue";
import CustomInput from "@/components/common/input.vue";
import CustomSelect from "@/components/common/select.vue";
import Pagination from "@/components/common/pagination.vue";
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/stores/user"

export default {
    name: "userManagement",
    components: {
        CustomTable,
        Loader,
        Modal,
        CustomInput,
        CustomSelect,
        Pagination
    },
    data(){
        return {
            header: [ "Name",  "Email", "City"],
            isEdit: false,
            users: [],
            showLoading: false,
            showModal: false,
            countries: Country.getAllCountries() || [],
            formErrors: {},
            currentPage: 1,
        }
    },
    created(){
        this.fetchUsers()
    },
    computed: {
        ...mapState(useUserStore, ['list']),
    },
    watch: {
        
    },
    methods: {
        handleEdit: async function(id){
            this.isEdit = !this.isEdit;
            this.showModal = !this.showModal
            const resp = await this.getUserById(id);
            if(resp.status === 200) {
                const { 
                    address: {
                        city,
                        street,
                        zipcode
                    },
                    email,
                    name: {
                        firstname,
                        lastname
                    },
                    phone,
                    username
                 } = resp.data;
                 this.form.city = city;
                 this.form.email = email;
                 this.form.firstname = firstname;
                 this.form.lastname = lastname;
                 this.form.phone = phone;
                 this.form.zip = zipcode;
                 this.form.address = street;
                 this.form.username = username
            }
        },
        handlePageChange(e) {
            this.currentPage = e
        },
        preventNumericInput(e) {
            let char = String.fromCharCode(e.keyCode); // Get the character
            if(/^[A-Za-z]+$/.test(char)) return true; // Match with regex 
            else e.preventDefault(); // If not match, don't add to input text
        },
        checkErrors() {
            let errors = {};
            const newForm = {...this.form};
            for(const property in newForm){
                if(property) {
                    if(newForm[property] === "") {
                        errors[property] = "Required"
                    } else if(property === "firstname" || property === "lastname" || property === "username") {
                       if(newForm[property] !== "" && newForm[property] < 3){
                            errors[property] = "Please enter valid name"
                       }
                    } else if(property === "email" && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(newForm.email)) {
                        errors[property] = "Please enter valid email"
                    }
                }
                if(property && newForm[property] === ""){
                    errors[property] = "Required"
                } else if(property && newForm[property].length < 2) {
                    errors[property] = "Value should be max 2 characters"
                }
            }
            return errors;
        },
        fetchUsers() {
            this.showLoading = true
            this.getAllUsers(this).then(() => this.showLoading = false)
            
        },
        toggleModal() {
            this.showModal = !this.showModal;
            this.formErrors = {};
            this.form = {}
        },
        onSubmit(){
            const { 
                email, 
                username, 
                firstname, 
                lastname,
                city,
                state,
                zip,
                phone,
                address
             } = this.form;
            const newForm = {
                email,
                username,
                firstname,
                lastname,
                address: {
                    city,
                    street: address,
                    pincode: zip,
                    state,
                },
                phone
            }
            const errors = this.checkErrors();
            if(Object.keys(errors).length){
                this.formErrors = errors
            } else {
                this.createUser(newForm, this)
            }
        },
        ...mapActions(useUserStore, ['createUser', 'getAllUsers', 'getUserById', 'deleteUserById'])
    },
    setup() {
        const form = ref({
            firstname: '',
            lastname: '',
            username: '',
            country: '',
            email: '',
            city: '',
            zip: '',
            phone: '',
            state: ''
        })
        const states = ref([]);
        const cities = ref([]);
        const countryWatcher = computed(() => form.value.country)
        const stateWatcher = computed(() => form.value.state)
    
        watch(countryWatcher, (newCountry, oldCountry) => {
            if(newCountry !== oldCountry){
                const newStates = State.getStatesOfCountry(newCountry);
                states.value.splice(0, states.value.length, ...newStates)
            }
        })
        watch(stateWatcher, (newState, oldState) => {
            if(newState !== oldState){
                const newCities =  City.getCitiesOfState(countryWatcher.value, newState)
                cities.value.splice(0, cities.value.length, ...newCities)
            }
        })

        return {
            form,
            states,
            cities,
        }
    }
}
</script>

<style scoped>
    .wraploader {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60%;
    }
    .add-user-btn {
        background-color: chocolate;
        border-color: chocolate;
    }
    .add-user-btn:focus {
        outline: none;
        box-shadow: none;
    }
</style>
