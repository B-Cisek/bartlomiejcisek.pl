<script setup lang="ts">
import { FolderIcon } from '@heroicons/vue/24/solid';

const cards = [
    {
        name: 'Document',
        description: 'Using 25% of storage',
        size: 3,
        filesCount: 400,
        icon: FolderIcon,
    },
    {
        name: 'Music',
        description: 'Using 25% of storage',
        size: 3,
        filesCount: 400,
        icon: FolderIcon,
    },
    {
        name: 'Apps',
        description: 'Using 25% of storage',
        size: 3,
        filesCount: 400,
        icon: FolderIcon,
    },
    {
        name: 'Videos',
        description: 'Using 25% of storage',
        size: 3,
        filesCount: 400,
        icon: FolderIcon,
    },
];
</script>

<template>
    <div
        v-for="card in cards"
        class="bg-white dark:bg-gray-800 shadow-lg rounded-md"
    >
        <div class="p-5">
            <div class="space-y-4 text-gray-600 dark:text-gray-300">
                <div class="flex items-start relative gap-5">
                    <div class="flex items-center gap-3">
                        <div class="h-14 w-14">
                            <span
                                class="flex h-full w-full items-center justify-center"
                            >
                                <component
                                    class="text-yellow-500"
                                    :is="card.icon"
                                />
                            </span>
                        </div>
                        <div class="space-y-1">
                            <p class="font-semibold text-base">
                                {{ card.name }}
                            </p>
                            <p class="text-xs">{{ card.description }}</p>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <p class="text-sm">{{ card.size }} GB</p>
                    <span class="p-0.5 bg-gray-600 rounded-full"></span>
                    <p class="text-sm">{{ card.filesCount }} Files</p>
                </div>
            </div>
        </div>
    </div>
</template>
