<template>
    <table class="table table-hover">
        <thead>
            <tr >
                <th>#</th>
                <th v-for="title in header" :key="'user' + title">{{title}}</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <slot></slot>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "Table",
    props: {
        header: {
            default: []
        },
    },
}
</script>