import { computed, ref } from 'vue'
import { useWebAppCloudStorage } from 'vue-tg'

export const useTelegramId = () => {
	const cloudStorage = useWebAppCloudStorage()
	const telegramIdOnCloud = ref('')

	async function checkCloudStorage() {
		const telegramId = await cloudStorage.getStorageItem('telegramId')

		if (telegramId) {
			telegramIdOnCloud.value = telegramId
			return
		}
	}

	checkCloudStorage()

	const userIdOnTelegram = computed(() => {
		if (telegramIdOnCloud.value) return telegramIdOnCloud.value
		
		const url = window.location.href
		const match = url.match(/menu\/(\d+)#/)
		const id = match ? match[1] : null

		return id
	})

	return { userIdOnTelegram }
}
