<template>
<div class="position-relative">
    <label :for="id" class="form-label">{{label}}</label>
    <input 
        class="form-control" 
        :class="customClass"
        :id="id" 
        :name="name" 
        :type="type" 
        @input="handleInput"
        @keypress="handleKeyPress" 
        :value="modelValue"
    />
    <div v-if="type === 'password'" class="passwordIcon">
        <i class="btn bi bi-eye-slash-fill" v-if="showPassword" @click="handleShow"></i>
        <i  class="btn bi bi-eye" v-else-if="!showPassword" @click="handleShow"></i>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showPassword: false
        }
    },
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        type: String,
        name: String,
        label: String,
        id: String,
        customClass: String
    },
    emits: ['update:modelValue'],
    methods: {
        handleInput(event) {
            this.$emit('update:modelValue', event.target.value) 
        },
        handleKeyPress(event) {
            this.$emit("keypress", event)
        },
        handleShow() {
            this.showPassword = !this.showPassword
        }
    },  
}
</script>

<style scoped>
.field {
    min-width: 160px;
}
.passwordIcon {
    position: absolute;
    top: 43%;
    right: 10px;
}
</style>