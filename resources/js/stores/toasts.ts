import { defineStore } from 'pinia'
import {computed, ref, watch} from 'vue'

export enum Type {
    SUCCESS = 'success',
    DANGER = 'danger',
    WARNING = 'warning'
}

interface Item {
    key: Symbol
    message: string
    type: Type
}


export const useToastsStore = defineStore('toasts', () => {
    const items = ref<Item[]>([]);

    function add(message: string, type: Type) {
        items.value.unshift({
            key: Symbol(),
            message: message,
            type: type
        })
    }

    function remove(index: number) {
        items.value.splice(index, 1)
    }

    return {
        remove,
        add,
        items
    }
})
