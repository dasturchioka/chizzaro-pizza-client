<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Item from '@/components/menu/item.vue'
import { useItems } from '@/store/items'
import { storeToRefs } from 'pinia'

const itemsStore = useItems()
const activeSection = ref('pizza')

const { items } = storeToRefs(itemsStore)

const setActiveSection = async (section: string) => {
	activeSection.value = section
}

onMounted(async () => {
	await itemsStore.getAllItems()
})
</script>

<template>
	<div class="menu-page">
		<nav class="bg-brand-dark text-white p-4 flex justify-between items-center w-full sticky top-0">
			<div class="flex space-x-4 max-h-full overflow-x-scroll scroll-container-no-pd">
				<a
					href="#pizza"
					@click="setActiveSection('pizza')"
					class="transition-all px-4 py-2 rounded-full font-semibold flex-shrink-0"
					:class="[
						activeSection === 'pizza'
							? 'bg-brand-third text-brand-dark'
							: 'text-brand-third bg-brand-dark ',
					]"
				>
					Pizza
				</a>
				<a
					href="#drink"
					@click="setActiveSection('drink')"
					class="transition-all px-4 py-2 rounded-full font-semibold flex-shrink-0"
					:class="[
						activeSection === 'drink'
							? 'bg-brand-third text-brand-dark'
							: 'text-brand-third bg-brand-dark ',
					]"
				>
					Ichimlik
				</a>
				<a
					href="#desert"
					@click="setActiveSection('desert')"
					class="transition-all px-4 py-2 font-semibold rounded-full flex-shrink-0"
					:class="[
						activeSection === 'desert'
							? 'bg-brand-third text-brand-dark'
							: 'text-brand-third bg-brand-dark ',
					]"
				>
					Gazak
				</a>
				<a
					href="#burger"
					@click="setActiveSection('burger')"
					class="transition-all px-4 py-2 font-semibold rounded-full flex-shrink-0"
					:class="[
						activeSection === 'burger'
							? 'bg-brand-third text-brand-dark'
							: 'text-brand-third bg-brand-dark ',
					]"
				>
					Burgerlar
				</a>
				<a
					href="#lavash"
					@click="setActiveSection('lavash')"
					class="transition-all px-4 py-2 font-semibold rounded-full flex-shrink-0"
					:class="[
						activeSection === 'lavash'
							? 'bg-brand-third text-brand-dark'
							: 'text-brand-third bg-brand-dark ',
					]"
				>
					Lavashlar
				</a>
			</div>
		</nav>
		<section class="pb-8">
			<div v-for="(category, index) in items" :id="category.id" class="p-4">
				<h2 class="text-2xl mb-4 font-bold">{{ category.name }}</h2>
				<div class="scroll-container">
					<div class="flex space-x-4">
						<div v-for="i in category.items">
							<Item :item="i" />
						</div>
					</div>
				</div>
			</div>
		</section>
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
