import axios, { AxiosInstance } from 'axios'
import { useLoading } from '@/store/loading'
import { config } from '@/config'
import { useWebAppCloudStorage } from 'vue-tg'

const cloudStorage = useWebAppCloudStorage()

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

// Function to set token in headers
export const setTokenInHeaders = async (instance: AxiosInstance) => {
	const token = await cloudStorage.getStorageItem('token')
	instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
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

export const profileInstance = axios.create({
	baseURL: config.SERVER_API_URL + '/profile',
})

export const locationsInstance = axios.create({
	baseURL: config.SERVER_API_URL + '/locations',
})

// Apply interceptors to all instances
// and set token to all instances except authInstance
setInterceptors(itemsInstance)
setInterceptors(authInstance)
setInterceptors(categoryInstance)
setInterceptors(orderInstance)
setInterceptors(profileInstance)
setInterceptors(locationsInstance)

setTokenInHeaders(itemsInstance)
setTokenInHeaders(categoryInstance)
setTokenInHeaders(orderInstance)
setTokenInHeaders(profileInstance)
setTokenInHeaders(locationsInstance)
