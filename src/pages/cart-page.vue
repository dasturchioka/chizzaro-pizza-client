<script setup lang="ts">
import Item from '@/components/menu/item.vue'
import { useCart } from '@/store/cart'
import { storeToRefs } from 'pinia'
import { Button } from '@/components/ui/button'
import { CheckCheck } from 'lucide-vue-next'
import { computed } from 'vue'

const cartStore = useCart()

const { cart } = storeToRefs(cartStore)

const totalPriceOfCart = computed(() => {
	const currencyFormatter = new Intl.NumberFormat('uz-UZ', {
		style: 'currency',
		currency: 'UZS',
		compactDisplay: 'short',
		minimumFractionDigits: 0,
	})

	const totalPrice = cart.value.reduce(
		(acc, item) => acc + +item.price.replace(',', '') * item.quantity,
		0
	)

	const formattedCurrency = currencyFormatter.format(totalPrice).replace('UZS', '')

	return formattedCurrency
})
</script>

<template>
	<div class="cart-page max-h-screen p-4" v-if="cart.length">
		<section class="pb-8">
			<h2 class="title font-bold text-3xl mb-6 mt-4">Savatcha</h2>
			<div class="scroll-container">
				<div class="flex space-x-4">
					<div v-for="(item, index) in cart">
						<Item :show-total-price="true" :item="item" />
					</div>
				</div>
			</div>
		</section>
		<div class="buttons w-full flex justify-between items-center mt-8">
			<p class="text-left font-bold text-brand-dark">Jami: {{ totalPriceOfCart }} so'm</p>
			<Button><CheckCheck class="w-4 h-4 mr-2" /> Buyurtma berish</Button>
		</div>
	</div>
	<div v-else class="text-center flex justify-center items-center my-10">
		<h1 class="text-lg font-semibold">Hozircha savatchangiz bo'sh</h1>
	</div>
</template>

<style scoped>
.scroll-container::-webkit-scrollbar {
	display: none;
}

/* Hide the scrollbar in Firefox */
.scroll-container {
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
}

/* Custom style for scroll container */
.scroll-container {
	overflow-x: auto;
	padding-bottom: 1rem;
}

.scroll-container-no-pd {
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
	overflow-x: auto;
}
</style>
