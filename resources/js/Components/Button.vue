<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { computed } from 'vue'

const props = defineProps({
    leftIcon: Function,
    rightIcon: Function,
    loading: Boolean,
    disabled: Boolean,
    as: {
        type: [String, Object],
        default: 'button'
    },
    intent: {
        type: String,
        validator: (val: string) => ['primary', 'secondary', 'danger'].includes(val),
        default: 'primary'
    }
})

const buttonClass = computed(() => {
    return cva(
        'justify-center inline-flex items-center text-sm border border-transparent rounded-md min-h-[32px] px-4 py-2 font-semibold uppercase tracking-widest transition ease-in-out duration-150 focus:ring-offset-2 focus:outline-none focus:ring-2',
        {
            variants: {
                intent: {
                    primary: 'text-white bg-indigo-600 hover:bg-indigo-500',
                    secondary: 'text-white bg-gray-800 dark:bg-gray-200 dark:text-gray-800 hover:bg-gray-700 dark:hover:bg-white',
                    danger: 'bg-red-700 text-white hover:bg-red-600',
                },
                disabled: {
                    true: '!bg-gray-100 !text-gray-400 cursor-not-allowed'
                }
            }
        }
    )({
        intent: props.intent,
        disabled: props.disabled
    })
})
</script>

<template>
    <component :is="props.as" :class="buttonClass" :disabled="props.disabled">
        <svg
            v-if="props.loading"
            class="animate-spin h-5 w-5 absolute"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            ></circle>
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
        <component :is="props.leftIcon" :class="['w-5 h-5 mr-2', props.loading && 'invisible']" />
        <span :class="[props.loading && 'invisible']">
      <slot />
    </span>
        <component :is="props.rightIcon" :class="['w-5 h-5 ml-2', props.loading && 'invisible']" />
    </component>
</template>
