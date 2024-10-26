import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useOrder = defineStore('order-store', () => {
	const id = ref('order-store')
	
	async function createOrder() {
		try {
		
		} catch (error) {
		}
	}
	
	return {createOrder}
})
