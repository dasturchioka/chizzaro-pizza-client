import { authInstance } from '@/http'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { useWebAppCloudStorage } from 'vue-tg'

export const useAuth = defineStore('auth-store', () => {
	const cloudStorage = useWebAppCloudStorage()
	const profile = ref()

	const isLoggedIn = ref(false)

	async function checkLoggedIn() {
		const token = await cloudStorage.getStorageItem('token')

		if (!token || !token.includes('ey')) {
			isLoggedIn.value = false
		} else {
			isLoggedIn.value = true
		}
	}

	async function login(payload: { phone: string }) {
		try {
			const response = await authInstance.post('/login', { phone: payload.phone, fullname: '' })

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

	return { login, isLoggedIn, checkLoggedIn }
})
