<template>
    <button class="btn btn-primary" :class="[childclass]">{{label}}</button>
</template>

<script>
export default {
    name: "Button",
    props: ['label', 'childclass']
}
</script>

<style scoped>
    .btn.btn-primary {
        background-color: chocolate;
        outline: none;
        border: none;
        box-shadow: none;
        width: 100%;
    }
</style>