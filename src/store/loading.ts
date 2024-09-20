import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoading = defineStore('loading-store', () => {
	const id = ref('loading-store')
	const loading = ref(false)

	async function setLoading(payload: boolean) {
		loading.value = payload
	}

	return { setLoading, loading, id }
})