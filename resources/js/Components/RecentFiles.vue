<script setup lang="ts">

import {ref} from "vue";
import {Type} from "@/stores/toasts";
import {Link} from "@inertiajs/vue3";

defineProps<{
    files: object;
}>();

const showOptions = ref(false);


</script>

<template>
    <div class="2xl:col-span-4 sm:col-span-2">
        <div class="bg-white dark:bg-gray-800 shadow rounded-md">
            <div class="py-3 px-4">
                <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-300">Recent Files</h4>
            </div>

            <div class="flex flex-col">
                <div class="overflow-x-auto">
                    <div class="inline-block min-w-full align-middle">
                        <div class="overflow-hidden">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                                <thead class="bg-gray-50 dark:bg-gray-700">
                                <tr class="text-gray-800 dark:text-gray-300">
                                    <th scope="col" class="p-3.5 text-sm text-start font-semibold min-w-[10rem]">File Name</th>
                                    <th scope="col" class="p-3.5 text-sm text-start font-semibold min-w-[10rem]">Uploaded At</th>
                                    <th scope="col" class="p-3.5 text-sm text-start font-semibold min-w-[6rem]">File Size</th>
                                    <th scope="col" class="p-3.5 text-sm text-start font-semibold min-w-[8rem]">Owner</th>
                                    <th scope="col" class="p-3.5 text-sm text-start font-semibold">Action</th>
                                </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
                                <tr v-for="file in files" :key="file.id">
                                    <td class="p-3.5 text-sm text-gray-700 dark:text-gray-400">
                                        {{file.origin_file_name}}
                                    </td>
                                    <td class="p-3.5 text-sm text-gray-700 dark:text-gray-400">
                                        <p>{{file.uploaded_at}}</p>
                                        <span class="text-xs">by {{file.user.username}}</span>
                                    </td>
                                    <td class="p-3.5 text-sm text-gray-700 dark:text-gray-400">{{file.file_size}} MB</td>
                                    <td class="p-3.5 text-sm text-gray-700 dark:text-gray-400">
                                        {{file.user.username}}
                                    </td>
                                    <td class="p-3.5">
                                        <div>
                                            <button @click="showOptions = !showOptions" class="inline-flex text-slate-700 hover:bg-slate-100 dark:hover:bg-gray-700 dark:text-gray-300 rounded-full p-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical w-4 h-4"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                            </button>

                                            <div v-show="showOptions" class="w-40 z-50 mt-2 transition-all duration-300 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                                                <Link method="delete" :href="route('storage.destroy', file.id)" class="flex items-center py-2 px-4 text-sm rounded text-gray-500  hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3 w-4 h-4 me-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                                    Delete
                                                </Link>
                                                <a class="flex items-center py-2 px-4 text-sm rounded text-gray-500  hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link w-4 h-4 me-3"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                                                    Copy Link
                                                </a>
                                                <a class="flex items-center py-2 px-4 text-sm rounded text-gray-500  hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share-2 w-4 h-4 me-3"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                                                    Share
                                                </a>
                                                <a class="flex items-center py-2 px-4 text-sm rounded text-gray-500  hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download w-4 h-4 me-3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                                    Download
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
