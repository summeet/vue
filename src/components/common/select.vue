<template>
    <select 
        class="form-select" 
        @input="$emit('update:modelValue', $event.target.value)" 
        :value="modelValue"
        :disabled="disable"
    >
        <option v-for="item in list" :key="item[key]" :value="item[id]">{{ item[label] }}</option>
    </select>
</template>

<script>
export default {
    name: 'Select',
    props: {
        data: {
            default: []
        },
        key: String,
        modelValue: {
            default: '',
            required: false,
            type: String
        },
        id: String,
        label: String,
        disable: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            list: this.data
        }
    },
    emits: ['update:modelValue']
}
</script>

<style scoped>

</style>