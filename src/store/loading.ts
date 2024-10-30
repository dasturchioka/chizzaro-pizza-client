import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoading = defineStore('loading-store', () => {
	const id = ref('loading-store')
	const loading = ref(false)
	const globalLoading = ref(false)

	async function setLoading(payload: boolean) {
		loading.value = payload
	}

	async function setGlobalLoading(payload: boolean) {
		globalLoading.value = payload
	}

	return { setLoading, loading, setGlobalLoading, globalLoading, id }
})
