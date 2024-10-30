import { profileInstance } from '@/http'
import { useLoading } from './loading'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { useWebAppCloudStorage } from 'vue-tg'

export const useProfile = defineStore('profile-store', () => {
	const loadingStore = useLoading()
	const cloudStorage = useWebAppCloudStorage()

	const profile = ref()
	const isLoggedIn = ref(false)
	async function checkLoggedIn() {
		try {
			await loadingStore.setGlobalLoading(true)
			const token = await cloudStorage.getStorageItem('token')
			const id = await cloudStorage.getStorageItem('id')

			if (!token || !token.includes('ey')) {
				isLoggedIn.value = false
				await loadingStore.setGlobalLoading(false)
				return
			}
			if (!id) {
				isLoggedIn.value = false
				await loadingStore.setGlobalLoading(false)
				return
			} else {
				const response = await profileInstance.get(`/check/${id}`)

				if (!response) {
					toast("Internet yoki server bilan aloqa yo'q")
					return
				}

				const data = await response.data

				if (data.status === 'bad') {
					await cloudStorage.removeStorageItems(['token', 'id'])
					isLoggedIn.value = false
					profile.value = {}
					await loadingStore.setGlobalLoading(false)
					toast("Ro'yxatdan o'tilmagan: ", data.msg)
					return
				}

				await cloudStorage.setStorageItem('token', data.token)
				await cloudStorage.setStorageItem('id', data.profile.id)
				await cloudStorage.setStorageItem('telegramId', data.profile.telegramId)

				profile.value = data.profile
				isLoggedIn.value = true
				await loadingStore.setGlobalLoading(false)
			}
		} catch (error: any) {
			await loadingStore.setGlobalLoading(false)
			toast(error.message || error.response.data.msg || 'Boshqatdan kiring')
		}
	}

	return { profile, isLoggedIn, checkLoggedIn }
})
