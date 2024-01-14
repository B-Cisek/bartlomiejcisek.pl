<script setup lang="ts">
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import {Head, useForm} from "@inertiajs/vue3";
import {ref} from "vue";
import RecentFiles from "@/Components/RecentFiles.vue";
import CardFiles from "@/Components/CardFiles.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import Modal from "@/Components/Modal.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";

defineProps<{
    recentFiles: object;
}>();

const form = useForm<{ file_name: string, file: File | null }>({
    file_name: '',
    file: null,
})

function submit(): void {
    form.post(route('storage.store'), {
        onSuccess: () => closeModal()
    })
}

function setFile(event: Event): void {
    form.file = event.target.files[0]
    form.file_name = event.target.files[0].name
}

const uploadModal = ref<boolean>(false);

const closeModal = () => {
    uploadModal.value = false;
}

</script>

<template>
    <Head title="Storage"/>

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Storage</h2>
        </template>

        <div class="pt-5">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="w-full">
                    <div class="grid 2xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
                        <div class="2xl:col-span-4 sm:col-span-2">
                            <div class="flex items-center justify-between gap-4">
                                <PrimaryButton @click="uploadModal = true">Upload File</PrimaryButton>
                            </div>
                        </div>
                        <CardFiles/>
                        <RecentFiles :files="recentFiles"/>

                    </div>
                </div>
            </div>
        </div>
        <Modal :show="uploadModal" @close="closeModal">
            <div class="p-5">
                <form @submit.prevent="submit">
                    <div class="flex items-center justify-center w-full">
                        <label for="dropzone-file"
                               class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span>
                                    or drag and drop</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX.
                                    800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" @input="setFile($event)" class="hidden"/>
                        </label>
                    </div>
                    <div class="mt-6 flex justify-end">
                        <SecondaryButton @click="closeModal"> Cancel</SecondaryButton>

                        <PrimaryButton
                            type="submit"
                            class="ms-3"
                            :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing"
                        >
                            Upload
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    </AuthenticatedLayout>
</template>
