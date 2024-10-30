<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import {
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerFooter,
	Drawer,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MapPin, Plus, ChevronDown } from 'lucide-vue-next'
import { useLocations } from '@/store/locations'
import { storeToRefs } from 'pinia'

const locationStore = useLocations()

const { savedLocations } = storeToRefs(locationStore)

const isOpen = ref(false)
const showMap = ref(false)

defineEmits(['update:modelValue'])

async function loadMap() {
	showMap.value = true
	await locationStore.loadMap('map')
}
</script>

<template>
	<Drawer class="h-screen">
		<DrawerTrigger as-child>
			<slot name="trigger"></slot>
		</DrawerTrigger>
		<DrawerContent class="h-screen">
			<DrawerHeader>
				<DrawerTitle class="flex items-center gap-2">
					<MapPin class="h-5 w-5 text-primary" />
					Manzilni tanlash
				</DrawerTitle>
			</DrawerHeader>

			<div v-show="showMap" id="map" class="map w-full h-full"></div>

			<!-- Saved Locations Section -->
			<div v-if="savedLocations && savedLocations.length" class="px-4">
				<ScrollArea class="h-[400px] w-full pr-4">
					<!-- Location List -->
					<div class="space-y-3">
						<button
							v-for="l in savedLocations"
							:key="l.id"
							class="w-full p-4 rounded-lg border hover:bg-accent transition-colors flex items-start gap-3"
						>
							<MapPin class="h-5 w-5 text-primary mt-1" />
							<div class="text-left">
								<h3 class="font-medium">{{ l.displayName }}</h3>
							</div>
						</button>
					</div>
				</ScrollArea>
			</div>

			<DrawerFooter>
				<Button @click="loadMap" class="w-full py-6">
					<Plus class="mr-2 h-4 w-4" />
					Add New Location
				</Button>
			</DrawerFooter>
		</DrawerContent>
	</Drawer>
</template>

<style scoped>
/* Add any required Leaflet custom styles here */
</style>
