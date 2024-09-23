import axios, { AxiosInstance } from 'axios'
import { useLoading } from '@/store/loading'
import { config } from '@/config'

// Function to set interceptors
const setInterceptors = (instance: AxiosInstance) => {
	const loadingStore = useLoading()
	instance.interceptors.request.use(
		async config => {
			await loadingStore.setLoading(true)
			return config
		},
		async error => {
			await loadingStore.setLoading(false)
			return Promise.reject(error)
		}
	)

	instance.interceptors.response.use(
		async response => {
			await loadingStore.setLoading(true)
			return response
		},
		async error => {
			await loadingStore.setLoading(false)
			return Promise.reject(error)
		}
	)
}

// Example of usage:
export const itemsInstance = axios.create({
	baseURL: config.SERVER_API_URL + '/items',
})

export const categoryInstance = axios.create({
	baseURL: config.SERVER_API_URL + '/category',
})

// Apply interceptors to all instances
setInterceptors(itemsInstance)
setInterceptors(categoryInstance)
