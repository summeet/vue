<template>
    <div v-if="show" :class="[show ? 'slideleft' : '', show && isClosing ? 'slideright' : '']">
        <div class="backdrop" @click="onClose"></div>
        <div class="common-modal shadow">
            <div class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3 px-3">
                <h4 class="modal-title">{{title}}</h4>
                <button type="button close-btn" class="btn-close" aria-label="Close" @click="onClose"></button>
            </div>
            <div class="content-modal"><slot></slot></div>
            <div class="footer-modal">
                <Button label="Submit" childclass="me-3 modal-btn-outline" @click="onsubmit"/>
                <Button label="Cancel" childclass="modal-btn" @click="onClose"/>
            </div>
        </div>
    </div>
</template>

<script>
import Button from "./button.vue"
export default {
    name: 'Modal',
    props: {
        show: Boolean,
        title: String
    },
    data(){
        return {
            isClosing: false
        }
    },
    components: {
        Button
    },
    methods: {
        onClose(){
            this.isClosing = true
            setTimeout(() => {
                this.isClosing = false
                this.$emit("close")
            }, 500)
        },
        onsubmit() {
            this.$emit('onSubmit')
        }
    },
    watch: {
        show(newVal) {
            document.body.style.overflow = newVal ? 'hidden' : 'auto'
        },
    }
}
</script>

<style scoped>
    .backdrop {
        position: fixed;
        bottom: 0;
        top: 0;
        right: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .slideleft .backdrop {
        animation: fadeIn .3s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
    }
    @keyframes fadeIn {
        0% {
            background: rgba(0, 0, 0, .0);
        }
        100% {
            background: rgba(0, 0, 0, .7);
        }
    }
    .slide-out .backdrop {
        animation: fadeOut .3s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
    }
    @keyframes fadeOut {
        0% {
            background: rgba(0, 0, 0, .7);
        }
        100% {
            background: rgba(0, 0, 0, .0);
        }
    }
    .common-modal {
        position: fixed;
        display: table;
        bottom: 0;
        top: 0;
        right: 0%;
        max-width: 50%;
        background-color: #FFF;
        padding: 20px 0;  
        z-index: 1;
        height: 100%;
        width: 100%;
    }
    .slideleft .common-modal {
        animation: 0.5s slide-right;
    }
    @keyframes slide-right {
        from {
            right: -100%;
        }
        to {
            right: 0%;
        }
    }
    .slideright .common-modal  {
        animation: 0.5s slide-left;
    }
   @keyframes slide-left {
        from {
            right: 0%;
        }
        to {
            right: -100%;
        }
    }
    .content-modal {
        overflow: auto;
        max-height: 78vh;
        padding: 0 20px;
    }
    .modal-title {
        margin-bottom: 0;
        font-size: 20px;
    }
    .footer-modal {
        background-color: #FFF;
        padding: 20px;
        box-shadow: 0 0 2px 0px;
        display: flex;
        justify-content: flex-end;
        position: absolute;
        width: 100%;
        bottom: 0;
    }
    .modal-btn-outline {
        background-color: #FFF;
        border-color: chocolate;
        color: #FFF;
        box-shadow: none;
        outline: none;
    }
    .modal-btn {
        background-color: chocolate;
        border-color: chocolate;
        box-shadow: none;
        outline: none;
    }
    .modal-open {
        overflow: hidden
    }
</style>