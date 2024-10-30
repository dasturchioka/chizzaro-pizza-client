import { authInstance } from '@/http'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { useWebAppCloudStorage } from 'vue-tg'
import { useTelegramId } from '@/composables/useTelegramId'
import { useProfile } from './profile'

export const useAuth = defineStore('auth-store', () => {
	const cloudStorage = useWebAppCloudStorage()
	const profileStore = useProfile()
	const { userIdOnTelegram } = useTelegramId()

	const { isLoggedIn, profile } = storeToRefs(profileStore)

	async function login(payload: { phone: string }) {
		try {
			const response = await authInstance.post('/login', {
				phone: payload.phone,
				fullname: '',
				telegramId: userIdOnTelegram.value,
			})

			if (!response) {
				toast("Internet yoki server bilan aloqa yo'q, keyinroq urinib ko'ring")
				return { status: 'bad' }
			}

			const data = await response.data

			if (data.status === 'bad') {
				toast(data.msg)
				return { status: 'bad' }
			}

			return { status: 'ok' }
		} catch (error: any) {
			console.log(error)
			toast(
				error.message ||
					error.response.data.msg ||
					'Xatolik yuzaga keldi, boshqatdan ishga tushiring'
			)
		}
	}

	async function confirmLogin(payload: { phone: string; code: string }) {
		try {
			const response = await authInstance.post('/confirm-login', {
				phone: payload.phone,
				code: payload.code,
			})

			if (!response) {
				toast("Internet yoki server bilan aloqa yo'q, keyinroq urinib ko'ring")
				return { status: 'bad' }
			}

			const data = await response.data

			if (data.status === 'bad') {
				toast(data.msg)
				return { status: 'bad' }
			}

			await cloudStorage.setStorageItem('token', data.token)
			await cloudStorage.setStorageItem('id', data.id)
			isLoggedIn.value = true
			profile.value = data.profile

			const token = await cloudStorage.getStorageItem('token')
			const id = await cloudStorage.getStorageItem('id')

			console.log(token)
			console.log(id)

			toast(data.msg)

			return { status: 'ok' }
		} catch (error: any) {
			console.log(error)
			toast(
				error.message ||
					error.response.data.msg ||
					'Xatolik yuzaga keldi, boshqatdan ishga tushiring'
			)
		}
	}

	return { login, confirmLogin }
})
