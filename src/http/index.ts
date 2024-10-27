import axios, { AxiosInstance } from 'axios'
import { useLoading } from '@/store/loading'
import { config } from '@/config'

// Function to set interceptors
const setInterceptors = (instance: AxiosInstance) => {
	instance.interceptors.request.use(
		async config => {
			const loadingStore = useLoading()
			await loadingStore.setLoading(true)
			return config
		},
		async error => {
			const loadingStore = useLoading()
			await loadingStore.setLoading(false)
			return Promise.reject(error)
		}
	)

	instance.interceptors.response.use(
		async response => {
			const loadingStore = useLoading()
			await loadingStore.setLoading(false)
			return response
		},
		async error => {
			const loadingStore = useLoading()
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

export const orderInstance = axios.create({
	baseURL: config.SERVER_API_URL + '/order',
})

export const authInstance = axios.create({
	baseURL: config.SERVER_API_URL + '/auth',
})

// Apply interceptors to all instances
setInterceptors(itemsInstance)
setInterceptors(categoryInstance)
setInterceptors(orderInstance)
setInterceptors(authInstance)