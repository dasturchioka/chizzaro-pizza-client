<script lang="ts" setup>
import { useItems } from '@/store/items'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '@/store/cart'
import { Button } from '@/components/ui/button'
import { config } from '@/config'
import Logo from '@/assets/logo.png'
import { ArrowLeft, ShoppingCart } from 'lucide-vue-next'

const cartStore = useCart()
const itemsStore = useItems()
const route = useRoute()

const { item, itemNotFound } = storeToRefs(itemsStore)
const { cart } = storeToRefs(cartStore)

onMounted(async () => {
	await itemsStore.getSingleItem(route.params.id as string)
})

const isItemInCart = computed(() => {
	return cart.value.some(itemInCart => itemInCart.id === route.params.id)
})

const itemsQuantity = computed(() => {
	const i = cart.value.find(itemInCart => itemInCart.id === route.params.id)

	if (i) return i.quantity
})

const totalPriceOfItemInCart = computed(() => {
	if (!item.value) return

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
	<div class="item-show-page">
		<div class="not-found h-screen flex flex-col items-center justify-center" v-if="itemNotFound">
			<h1 class="font-raleway font-bold mb-2 text-xl">Ma'lumot topilmadi</h1>
			<p class="font-manrope mb-4">Siz izlayotgan ma'lumot mavjud emas!</p>
			<Button @click="$router.go(-1)">Orqaga</Button>
		</div>
		<div class="item" v-else-if="item && !itemNotFound">
			<div class="top bg-brand-dark flex justify-between items-center px-4 py-6">
				<Button variant="ghost" class="text-white" @click="$router.go(-1)"><ArrowLeft/></Button>
				<img class="w-16" :src="Logo" alt="Chizzaro pizza logo" />
			</div>
			<div class="middle flex flex-col items-center">
				<img
					class="w-36 -translate-y-[70px]"
					:src="config.SERVER_BASE_URL + '/' + item.img"
					:alt="item.name"
				/>
				<div class="text flex flex-col items-center text-brand-dark -translate-y-[46px] px-4">
					<h1
						class="title font-raleway font-extrabold text-3xl flex text-center flex-col items-center"
					>
						{{ item.name }}
						<span class="font-medium text-base -translate-y-1">{{ item.size }}</span>
					</h1>
					<p class="description mt-2 font-semibold text-lg text-center">{{ item.description }}</p>
				</div>
			</div>
			<div class="price font-raleway text-brand-dark px-4 mb-2">
				<h3 class="text-lg font-medium">
					Narxi: <b class="text-xl">{{ item.price }} so'm</b>
				</h3>
			</div>
			<div class="add-cart-buttons w-full px-4">
				<Button
					v-show="!isItemInCart"
					class="w-full py-6 text-lg"
					@click="cartStore.pushItemToCart(item)"
					><ShoppingCart class="w-5 h-6 mr-2" /> Qo'shish</Button
				>
				<div class="flex items-center justify-between mt-6 w-full" v-show="isItemInCart">
					<Button @click="cartStore.decreaseQuantity(item.id)" class="text-white bg-brand-dark">
						-
					</Button>
					<span class="text-xl font-bold">{{ itemsQuantity }}</span>
					<Button @click="cartStore.increaseQuantity(item.id)" class="text-white bg-brand-dark">
						+
					</Button>
				</div>
				<p v-show="isItemInCart" class="calculator font-raleway text-brand-dark mt-6 text-center">
					Jami: <b>{{ totalPriceOfItemInCart }} so'm</b>
				</p>
			</div>
		</div>
	</div>
</template>
