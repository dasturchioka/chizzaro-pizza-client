import { useTelegramId } from '@/composables/useTelegramId'
import { Item } from '@/models'
import { defineStore, storeToRefs } from 'pinia'
import { toast } from 'vue-sonner'
import { useProfile } from './profile'
import { useSocket } from './socket'
import { useWebAppCloudStorage } from 'vue-tg'

export const useOrder = defineStore('order-store', () => {
	const socketStore = useSocket()
	const profileStore = useProfile()
	const cloudStorage = useWebAppCloudStorage()
	const { userIdOnTelegram } = useTelegramId()

	const { profile } = storeToRefs(profileStore)
	const { socket } = storeToRefs(socketStore)

	async function requestToCreateOrder(payload: { items: Item[] }) {
		try {
			console.log(socket)

			if (!profile.value) {
				await profileStore.checkLoggedIn()
			}

			const id = await cloudStorage.getStorageItem('id')
			const telegramId = userIdOnTelegram.value

			const modifiedItems = payload.items.reduce(
				(acc: { id: string; quantity: number }[], item: Item) => {
					const existingItem = acc.find(i => i.id === item.id)
					if (existingItem) {
						existingItem.quantity++
					} else {
						acc.push({ id: item.id, quantity: 1 })
					}
					return acc
				},
				[]
			)

			socket.value.emit('order:creating', {
				items: modifiedItems,
				user: { fullname: profile.value.fullname, id, telegramId },
			})

			socket.value.on('message:order-creating-confirmed', async data => {
				toast(data.status)
			})
		} catch (error: any) {
			console.log(error)

			toast(error.message || error.response.data.msg || "Boshqatdan urinib ko'ring")
		}
	}

	return { requestToCreateOrder }
})
