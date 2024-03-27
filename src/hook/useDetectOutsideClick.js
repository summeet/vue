import { onBeforeMount, onMounted } from "vue";


export default function useDetectOutsideClick(component, callback) {
    if(!component) return;
    const listener = (evt) => {
        if(evt.target !== component.value && evt.composedPath().includes(component.value)){
            return 
        }
        if(typeof callback === 'function'){
            callback()
        }
    }
    onMounted(() => { window.addEventListener('click', listener) })
    onBeforeMount(() => { window.removeEventListener('click', listener) })

    return {listener}
}