import {defineStore} from 'pinia'
import {categoryInstance} from '@/http'
import {ref} from 'vue'
import {toast} from 'vue-sonner'
import {Category} from "@/models"

export const useCategory = defineStore('category-store', () => {
	const id = ref('category-store')
	const categories = ref<Category[]>()
	
	async function getCategories() {
		try {
			const response = await categoryInstance.get('/get-category-types')
			
			if (!response) {
				toast('Internet yoki server bilan aloqa mavjud emas')
				return
			}
			
			const data = await response.data
			
			categories.value = data.categories
			console.log(categories.value)
		} catch (error: any) {
			console.log(error)
			toast(
				error.message ||
				error.response.data.msg ||
				'Xatolik yuzaga keldi, boshqatdan ishga tushiring'
			)
		}
	}
	
	return {
		getCategories,
		categories,
		id,
	}
})
