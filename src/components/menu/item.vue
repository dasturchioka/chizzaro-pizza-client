<script setup lang="ts">
import { Item, useCart } from '@/store/cart.ts'
import { storeToRefs } from 'pinia'
import { computed, toRefs } from 'vue'
import Button from '../ui/button/Button.vue'
import { config } from '@/config'
import { RouterLink } from 'vue-router'

const props = defineProps<{ item: Item; showTotalPrice?: boolean }>()

const cartStore = useCart()

const { cart } = storeToRefs(cartStore)

const { item, showTotalPrice } = toRefs(props)

const isItemAvailableInCart = computed(() => {
	return cart.value.some(item => item.id === props.item.id)
})

const itemsQuantity = computed(() => {
	return cart.value.find(item => item.id === props.item.id)?.quantity
})

const totalPriceOfItemInCart = computed(() => {
	if (!item) return

	const priceFormatted = +item.value.price.replace(',', '')

	if (!itemsQuantity.value) return

	const currencyFormatter = new Intl.NumberFormat('uz-UZ', {
		style: 'currency',
		currency: 'UZS',
		compactDisplay: 'short',
		minimumFractionDigits: 0,
	})

	const formattedCurrency = currencyFormatter
		.format(priceFormatted * itemsQuantity.value)
		.replace('UZS', '')

	return formattedCurrency
})
</script>

<template>
	<div
		class="w-[220px] h-auto bg-brand-third p-4 rounded-xl border-4 border-brand-dark flex flex-col items-center shadow-lg flex-shrink-0"
	>
		<img :src="config.SERVER_BASE_URL + `/` + item.img" alt="pizza image" class="w-32 h-32 mb-2" />
		<div class="text text-left self-start my-2">
			<h3 class="text-xl font-extrabold">{{ item.name }}</h3>
			<p class="text-3xl font-bold text-[#931714]">{{ item.price }}</p>
		</div>
		<div class="w-full">
			<div class="flex items-center justify-around mt-2 w-full" v-show="isItemAvailableInCart">
				<Button @click="cartStore.decreaseQuantity(item.id)" class="text-white bg-brand-dark">
					-
				</Button>
				<span class="text-lg font-bold">{{ itemsQuantity }}</span>
				<Button @click="cartStore.increaseQuantity(item.id)" class="text-white bg-brand-dark">
					+
				</Button>
			</div>
			<Button
				@click="cartStore.pushItemToCart(item)"
				v-show="!isItemAvailableInCart"
				class="w-full font-bold rounded-lg py-4"
				>Qo'shish</Button
			>
			<Button variant="ghost" class="w-full mt-2 font-bold">
				<RouterLink class="w-full" :to="`/item/${item.id}`">Ko'rish</RouterLink>
			</Button>
			<p v-show="showTotalPrice" class="calculator font-raleway text-brand-dark mt-2 text-center">
				<b>x{{ item.quantity }} {{ totalPriceOfItemInCart }} so'm</b>
			</p>
		</div>
	</div>
</template>
