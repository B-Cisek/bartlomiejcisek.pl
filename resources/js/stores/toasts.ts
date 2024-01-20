import { defineStore } from 'pinia'
import { ref } from 'vue'

export enum Type {
    SUCCESS = 'success',
    DANGER = 'danger',
    WARNING = 'warning'
}

export function typeFromString(type: string): Type {
    switch (type) {
        case 'success':
            return Type.SUCCESS
        case 'danger':
            return Type.DANGER
        case 'warning':
            return Type.WARNING
    }
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
