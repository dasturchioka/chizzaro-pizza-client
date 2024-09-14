<script setup lang="ts">
import { Item, useCart } from '@/store/cart.ts'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import Button from '../ui/button/Button.vue'

const props = defineProps<{ pizza: Item }>()

const cartStore = useCart()

const { cart } = storeToRefs(cartStore)

const isItemAvailableInCart = computed(() => {
	return cart.value.some(item => item.id === props.pizza.id)
})

const itemsQuantity = computed(() => {
	return cart.value.find(item => item.id === props.pizza.id)?.quantity
})
</script>

<template>
	<div
		class="w-[220px] h-auto bg-brand-third p-4 rounded-xl border-4 border-brand-dark flex flex-col items-center shadow-lg flex-shrink-0"
	>
		<img :src="pizza.image" alt="pizza image" class="w-32 h-32 mb-2" />
		<div class="text text-left self-start my-2">
			<h3 class="text-xl font-extrabold">{{ pizza.name }}</h3>
			<p class="text-3xl font-bold text-[#931714]">{{ pizza.price }}</p>
		</div>
		<div class="w-full">
			<div class="flex items-center justify-around mt-2 w-full" v-show="isItemAvailableInCart">
				<Button @click="cartStore.decreaseQuantity(pizza.id)" class="text-white bg-brand-dark">
					-
				</Button>
				<span class="text-lg font-bold">{{ itemsQuantity }}</span>
				<Button @click="cartStore.increaseQuantity(pizza.id)" class="text-white bg-brand-dark">
					+
				</Button>
			</div>
			<Button
				@click="cartStore.pushItemToCart(pizza)"
				v-show="!isItemAvailableInCart"
				class="text-white bg-brand-dark w-full font-bold rounded-lg py-4"
				>Qo'shish</Button
			>
		</div>
	</div>
</template>
