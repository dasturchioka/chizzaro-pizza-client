import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Item } from '@/models'

export const useCart = defineStore('cart-store', () => {
	const id = ref('cart-store')
	const cart = ref<Item[]>([])

	async function pushItemToCart(item: Item) {
		cart.value.push({ ...item, quantity: 1 })
	}

	async function increaseQuantity(id: string) {
		const item = cart.value.find((i: any) => i.id === id)
		if (item) {
			item.quantity++
		}
	}

	async function decreaseQuantity(id: string) {
		const itemIndex = cart.value.findIndex((i: any) => i.id === id)
		if (itemIndex === -1) return
		if (cart.value[itemIndex].quantity === 1) {
			cart.value.splice(itemIndex, 1)
		} else {
			cart.value[itemIndex].quantity -= 1
		}
	}

	return { cart, pushItemToCart, increaseQuantity, decreaseQuantity, id }
})
