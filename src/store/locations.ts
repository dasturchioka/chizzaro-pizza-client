import { Location } from '@/models'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { useWebAppCloudStorage } from 'vue-tg'
import { useProfile } from './profile'
import { locationsInstance } from '@/http'
import { useTelegramId } from '@/composables/useTelegramId'
import { useDeviceDetector } from '@/composables/useDeviceDetector'
import router from '@/router'
import L from 'leaflet'

export const useLocations = defineStore('locations-store', () => {
	const { userIdOnTelegram } = useTelegramId()
	const { isMobile } = useDeviceDetector()
	const cloudStorage = useWebAppCloudStorage()
	const profileStore = useProfile()

	const { isLoggedIn, profile } = storeToRefs(profileStore)

	const sharedMap = ref<L.Map>()

	const savedLocations = ref<Location[]>()
	const selectedLocation = ref<Location>()
	const currentLocation = ref<{ lat: number; lng: number }>({ lat: 0, lng: 0 })

	async function getLocations() {
		try {
			const id = await cloudStorage.getStorageItem('id')

			if (!id) {
				toast("Nimadir xato ketdi, boshqatdan ro'yxatdan o'ting")
				await cloudStorage.removeStorageItem('token')
				await cloudStorage.removeStorageItem('id')
				profile.value = {}
				isLoggedIn.value = false
				await router.push(`/menu/${userIdOnTelegram}`)
				return
			}

			const response = await locationsInstance.get(`/get-locations/${id}`)

			if (!response) {
				toast("Server yoki internet bilan aloqa mavjud emas, boshqatdan urinib ko'ring")
				return
			}

			const data = await response.data

			if (data.status === 'bad') {
				toast(response.data.msg)
				await cloudStorage.removeStorageItem('token')
				await cloudStorage.removeStorageItem('id')
				profile.value = {}
				isLoggedIn.value = false
				await router.push(`/menu/${userIdOnTelegram}`)
				return
			}

			savedLocations.value = data.locations
			return
		} catch (error: any) {
			toast(
				error.message || error.response.data.msg || "Xatolik yuz berdi, boshqatdan urinib ko'ring"
			)
		}
	}

	async function getCurrentLocation() {
		try {
			if (!isMobile.value) {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(
						async position => {
							const { latitude, longitude } = position.coords
							currentLocation.value = { lat: latitude, lng: longitude }
						},
						async error => {
							toast(error.message)
						},
						{ enableHighAccuracy: true }
					)
				} else {
					console.error('Geolocation is not supported by this browser.')
				}
			}
		} catch (error: any) {
			toast(
				error.message || error.response.data.msg || "Xatolik yuz berdi, boshqatdan urinib ko'ring"
			)
		}
	}

	async function loadMap(id: string) {
		try {
			const layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 18,
			})

			sharedMap.value = L.map(id)
				.setView([currentLocation.value.lat, currentLocation.value.lng], 13)
				.addLayer(layer)
		} catch (error) {
			console.error(error)
		}
	}
	return {
		getLocations,
		savedLocations,
		selectedLocation,
		getCurrentLocation,
		currentLocation,
		loadMap,
		sharedMap,
	}
})
