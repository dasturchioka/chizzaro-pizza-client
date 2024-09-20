import { defineStore } from 'pinia'
import { itemsInstance } from '@/http'
import { ref } from 'vue'
import { Item } from './cart'
import { toast } from 'vue-sonner'

export interface CategoryOfItems {
	id: string
	name: string
	items: Item[]
	[key: string]: any
}

export const useItems = defineStore('items-store', () => {
	const id = ref('items-store')
	const items = ref<CategoryOfItems[]>()

	async function getAllItems() {
		try {
			const response = await itemsInstance.get('/get-all')

			if (!response) {
				toast("Yuklashda xatolik bo'ldi")
				return
			}

			items.value = response.data.items
		} catch (error: any) {
			console.log(error)
			toast(
				error.message ||
					error.response.data.msg ||
					'Xatolik yuzaga keldi, boshqatdan ishga tushiring'
			)
		}
	}

	return { getAllItems, items, id }
})
