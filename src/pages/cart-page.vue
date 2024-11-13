<script setup lang="ts">
import Item from '@/components/menu/item.vue'
import { useCart } from '@/store/cart'
import { storeToRefs } from 'pinia'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { computed, ref } from 'vue'
import Button from '@/components/ui/button/Button.vue'
import { Check, CheckCheck } from 'lucide-vue-next'
import LoginModal from '@/components/auth/login-modal.vue'
import { useProfile } from '@/store/profile'
import { useOrder } from '@/store/order'
import AskBeforeAction from '@/components/app/ask-before-action.vue'

const orderStore = useOrder()
const profileStore = useProfile()
const cartStore = useCart()

const { isLoggedIn } = storeToRefs(profileStore)
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

const paymentType = ref<'cash' | 'card'>('cash')

const handlePaymentType = (payload: string) => {
	paymentType.value = payload as any
}
</script>

<template>
	<div class="cart-page max-h-screen p-4" v-if="cart.length">
		<section class="pb-8">
			<h2 class="title font-bold text-3xl mb-6 mt-4">Savatcha</h2>
			<div class="scroll-container">
				<div class="flex space-x-2">
					<div v-for="(item, index) in cart">
						<Item :show-total-price="true" :item="item" />
					</div>
				</div>
			</div>
		</section>
		<div class="details">
			<div class="payment-type">
				<Drawer>
					<DrawerTrigger as-child>
						<div
							class="cursor-pointer border-2 rounded-lg bg-brand-third border-brand-dark transition-all p-2 hover:bg-brand-light"
						>
							<p class="font-bold text-sm opacity-60">To'lov turini tanlang</p>
							<h1 v-show="paymentType === 'cash'" class="font-extrabold text-xl">💵 Naqt pul</h1>
							<h1 v-show="paymentType === 'card'" class="font-extrabold text-xl">
								💳 Karta <small class="font-medium">(buyurtma yetib kelganida)</small>
							</h1>
						</div>
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle>To'lov turini tanlang</DrawerTitle>
							<DrawerDescription>
								O'zingizga qulay to'lov turini tanlab davom eting
							</DrawerDescription>
						</DrawerHeader>
						<div class="option flex flex-col p-4 space-y-2">
							<DrawerClose as-child>
								<Button
									@click="handlePaymentType('cash')"
									class="font-bold py-6"
									:variant="paymentType === 'cash' ? 'default' : 'outline'"
								>
									<Check class="size-5" v-show="paymentType === 'cash'" /> 💵 Naqt pul
								</Button>
							</DrawerClose>
							<DrawerClose as-child>
								<Button
									@click="handlePaymentType('card')"
									class="font-bold py-6"
									:variant="paymentType === 'card' ? 'default' : 'outline'"
								>
									<Check class="size-5" v-show="paymentType === 'card'" /> 💳 Karta
								</Button>
							</DrawerClose>
						</div>
					</DrawerContent>
				</Drawer>
			</div>
		</div>
		<div class="buttons w-full flex justify-between items-center mt-8">
			<p class="text-left font-bold text-brand-dark">Jami: {{ totalPriceOfCart }}</p>
			<AskBeforeAction
				@do:action="orderStore.requestToCreateOrder({ items: cart })"
				v-if="isLoggedIn"
				title="Mahsulotlarni to'g'riligiga ishonchingiz komilmi?"
				description="To'g'ri mahsulotlarni buyurtma qilganingizga ishonch hosil qiling"
			>
				<template #trigger>
					<Button><CheckCheck class="w-4 h-4 mr-2" /> Buyurtma berish</Button>
				</template>
			</AskBeforeAction>
			<LoginModal v-else>
				<template #trigger>
					<Button><CheckCheck class="w-4 h-4 mr-2" /> Buyurtma berish</Button>
				</template>
			</LoginModal>
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
