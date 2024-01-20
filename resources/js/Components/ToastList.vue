<script setup lang="ts">
import ToastListItem from '@/Components/ToastListItem.vue';
import { Type, typeFromString, useToastsStore } from '@/stores/toasts';
import { watch } from 'vue';
import { usePage } from '@inertiajs/vue3';

const { remove, items, add } = useToastsStore();

watch(
    () => usePage().props.flash.value,
    next => {
        add(next.alertMessage, typeFromString(next.alertType));
    },
);

watch(
    () => usePage().props.errors,
    fields => {
        for (const [key, value] of Object.entries(fields)) {
            add(value, Type.DANGER);
        }
    },
);
</script>

<template>
    <TransitionGroup
        class="fixed right-4 top-4 z-50 space-y-4 w-full max-w-xs"
        tag="div"
        enter-from-class="translate-x-full opacity-0"
        enter-active-class="duration-500"
        leave-active-class="duration-500"
        leave-to-class="translate-x-full opacity-0"
    >
        <ToastListItem
            v-for="(item, index) in items"
            :key="item.key"
            :message="item.message"
            :type="item.type"
            @remove="remove(index)"
        />
    </TransitionGroup>
</template>
