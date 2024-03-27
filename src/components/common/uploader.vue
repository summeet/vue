<template>
    <template v-if="!loading">
        <div v-if="!url">
        <input type="file" ref="inputRef" class="form-control d-none" id="inputGroupFile01" @change="onFileChange">
        <button class="btn upload-btn" @click="upload" >
            <i class="bi bi-plus upload-plus-icon"></i>
            <div class="upload-text">Upload</div>
        </button>
    </div>
    <div v-else class="preview">
        <button class="btn delete-btn" @click="deletePreview"><i class="bi bi-trash"></i></button>
        <img v-if="url" :src="url" class="image-preview"/>
    </div>
    </template>
</template>


<script>
import { ref } from "vue";
import RadialProgressBarVue from './radialProgressBar.vue';
export default {
    components: {
      RadialProgressBarVue
    },
    data() {
        return {
            url: null,
            loading: false,
            completedSteps: 4,
            totalSteps: 10
        }
    },
    methods: {
        upload() {
            this.inputRef.click()
            this.emit("click")
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            this.url = URL.createObjectURL(files[0]);
            this.$emit('onUpload', files[0])
        },
        deletePreview() {
            this.url = ""
        }
    },
    setup() {
        const inputRef = ref(null)
        return {
            inputRef
        }
    },
}
</script>

<style scoped>
    :root {
        --progress-width: 200px;
        --progress-height: 200px;
    }
    .upload-btn {
        background-color: transparent;
        width: 100%;
        border-width: 1px;
        border-style: dashed;
        border-color: #DDD;
        height: 180px;
    }
    .upload-plus-icon {
        font-size: 30px;
    }
    .upload-text {
        font-size: 16px;
    }
    .image-preview {
        height: 180px;
        margin: auto;
        display: block;
    }
    .bi-trash {
        font-size: 20px;
    }
    .delete-btn {
        position: absolute;
        right: 15px;
        top: -20px;
        background-color: #FFF;
        border: 1px solid #ddd;
        border-radius: 50%;
        box-shadow: none;
    }
    .preview {
        position: relative;
        border: 1px dashed #ddd;
        border-radius: 8px;
    }
    .progress-bar {

    }
</style>