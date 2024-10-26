import {defineStore} from 'pinia'
import {itemsInstance} from '@/http'
import {ref} from 'vue'
import {Item, CategoryOfItems} from '@/models'
import {toast} from 'vue-sonner'


export const useItems = defineStore('items-store', () => {
	const id = ref('items-store')
	const items = ref<CategoryOfItems[]>()
	const item = ref<Item>()
	const itemNotFound = ref<boolean>(false)
	
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
	
	async function getSingleItem(id: string) {
		try {
			const response = await itemsInstance.get('/get-item/' + id)
			
			if (!response) {
				item.value = {} as Item
				itemNotFound.value = true
				toast('Internet yoki server bilan aloqa mavjud emas')
				return
			}
			
			if (response.data.status === 'bad') {
				item.value = {} as Item
				itemNotFound.value = true
				toast(response.data.msg)
				return
			}
			
			item.value = response.data.item
			itemNotFound.value = false
		} catch (error: any) {
			console.log(error)
			toast(
				error.message ||
				error.response.data.msg ||
				'Xatolik yuzaga keldi, boshqatdan ishga tushiring'
			)
		}
	}
	
	return {getAllItems, getSingleItem, item, itemNotFound, items, id}
})
