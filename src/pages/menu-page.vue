<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Item from '@/components/menu/item.vue'
import { useItems } from '@/store/items'
import { storeToRefs } from 'pinia'
import { useCategory } from '@/store/category'
import Button from '@/components/ui/button/Button.vue'
import { useCart } from '@/store/cart'
import { PageTransition, TransitionPresets } from 'vue3-page-transition'
import { ShoppingCart } from 'lucide-vue-next'

const cartStore = useCart()
const itemsStore = useItems()
const categoryStore = useCategory()
const activeSection = ref('pizza')

const { cart, itemsQuantity } = storeToRefs(cartStore)
const { items } = storeToRefs(itemsStore)
const { categories } = storeToRefs(categoryStore)

const setActiveSection = async (section: string) => {
	activeSection.value = section
}

onMounted(async () => {
	await itemsStore.getAllItems()
	await categoryStore.getCategories()
	await setActiveSection('pizza')
})

const isItemInCart = computed(() => {
	if (cart.value && cart.value.length) return true

	return false
})

const itemsLengthInCart = computed(() => {
	return cart.value.length
})
</script>

<template>
	<div class="menu-page">
		<nav
			class="bg-brand-dark text-white px-4 py-2 flex justify-between items-center w-full sticky top-0"
		>
			<div class="flex space-x-4 max-h-full overflow-x-scroll scroll-container-no-pd">
				<a
					v-for="(category, index) in categories"
					:key="index"
					:href="`#${category.name.toLowerCase()}`"
					@click="setActiveSection(category.name.toLowerCase())"
					class="transition-all px-4 py-2 rounded-full font-semibold flex-shrink-0"
					:class="[
						activeSection === category.name.toLowerCase()
							? 'bg-brand-third text-brand-dark'
							: 'text-brand-third bg-brand-dark ',
					]"
					:hidden="!category.isOnTheBase"
				>
					{{ category.name }}
				</a>
			</div>
		</nav>
		<section class="pb-8">
			<div
				v-for="(category, index) in items"
				:id="category.name.toLowerCase()"
				class="p-4"
				:key="index"
			>
				<h2 class="text-2xl mb-4 font-bold">{{ category.name }}</h2>
				<div class="scroll-container">
					<div class="flex space-x-2">
						<div v-for="i in category.items">
							<Item :item="i" />
						</div>
					</div>
				</div>
			</div>
		</section>
		<PageTransition :name="TransitionPresets.fadeInUp" mode="out-in" appear>
			<Button
				v-show="isItemInCart"
				@click="$router.push('/cart')"
				class="transition-all fixed right-4 bottom-16 mb-4"
			>
				<ShoppingCart class="size-4 mr-2" /> Savatga o'tish ({{ itemsQuantity }})
			</Button>
		</PageTransition>
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
