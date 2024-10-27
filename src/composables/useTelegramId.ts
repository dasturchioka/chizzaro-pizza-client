import { computed } from 'vue'

export const useTelegramId = () => {
	const userIdOnTelegram = computed(() => {
		const url = window.location.href
		const match = url.match(/menu\/(\d+)#/)
		const id = match ? match[1] : null

		return id
	})

	return { userIdOnTelegram }
}
