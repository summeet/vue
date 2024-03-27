<script>
export default {
    methods: {
        clicked(){
            this.$emit('click')
        }
    }
}
</script>

<template>
 <div>
   <span>Anything can be added here.</span>
   <button class="action" @click.stop="clicked">Open!</button>
 </div>
</template>