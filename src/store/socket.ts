import { onUnmounted, ref } from 'vue'
import { io, Socket } from 'socket.io-client'
import { config } from '@/config'
import { defineStore, storeToRefs } from 'pinia'
import { toast } from 'vue-sonner'
import { useProfile } from './profile'
import { useLoading } from '@/store/loading.ts'
import { useWebAppCloudStorage } from 'vue-tg'
import { useTelegramId } from '@/composables/useTelegramId'
import { useWebApp } from 'vue-tg'

export const useSocket = defineStore('socket-store', () => {
	const webApp = useWebApp()
	const cloudStorage = useWebAppCloudStorage()
	const profileStore = useProfile()
	const loadingStore = useLoading()

	const { userIdOnTelegram } = useTelegramId()

	const { profile } = storeToRefs(profileStore)

	const state = ref({
		connected: false,
		socketId: '',
		disconnected: false,
	})

	const socket = ref<Socket>(
		io(config.SERVER_BASE_URL, {
			autoConnect: false,
		})
	)

	const connectSocket = async () => {
		try {
			if (!state.value.connected) {
				socket.value.connect()
			} else if (state.value.connected) {
				toast("Allaqachon ulangan yoki boshqatdan urinib ko'ring")
			}
		} catch (error: any) {
			console.error('Error connecting socket:', error)
			toast(
				error.message ||
					error.response?.data?.msg ||
					'Faollikni ishga tushirishda xatolik yuzaga keldi, dasturni boshqatdan ishga tushiring'
			)
		}
	}

	const initConnection = async (socketId: string) => {
		try {
			await loadingStore.setLoading(true)
			if (!profile.value) {
				await profileStore.checkLoggedIn()
			}

			const id = await cloudStorage.getStorageItem('id')

			if (id) {
				const user = {
					socketId: socket.value.id ?? socketId,
					login: '',
					type: 'client',
					id: profile.value.id,
					telegramId: userIdOnTelegram.value,
					details: {
						fullname: profile.value.fullname,
						phone: profile.value.phone,
					},
				}
				socket.value.emit('connection:init', { user })
			} else {
				return
			}
		} catch (error) {
			await loadingStore.setLoading(false)
			console.error('Error initializing connection:', error)
			toast('Connection initialization failed. Please try again.')
		} finally {
			await loadingStore.setLoading(false)
		}
	}

	const disconnectSocket = async () => {
		try {
			if (state.value.connected) {
				const login = await cloudStorage.getStorageItem('login')
				if (login) {
					socket.value.emit('connection:disconnect')
					state.value.disconnected = true
					state.value.socketId = ''
				} else {
					throw new Error('Login is not found')
				}
			} else {
				return
			}
		} catch (error: any) {
			console.error('Error disconnecting socket:', error)
			toast(
				error.message ||
					error.response?.data?.msg ||
					"Faollikni o'chirishda xatolik yuzaga keldi, dasturni boshqatdan ishga tushiring"
			)
		}
	}

	socket.value.on('connect', async () => {
		state.value.socketId = socket.value.id as string
		state.value.connected = true
		await initConnection(socket.value.id as string)
	})

	socket.value.on('disconnect', () => {
		state.value.connected = false
		state.value.socketId = ''
		console.log('Disconnected from server')
	})

	socket.value.on('connection:lose', () => {
		webApp.close()
	})

	socket.value.on('connection:error', async data => {
		toast(data.msg)
		state.value.connected = false
		state.value.socketId = ''
		socket.value.disconnect()
	})

	socket.value.on('message:disconnection-confirmed', async data => {
		await loadingStore.setLoading(false)
	})

	socket.value.on('message:connection-confirmed', async data => {
		await loadingStore.setLoading(false)
	})

	onUnmounted(() => {
		socket.value.off('connect')
		socket.value.off('disconnect')
		socket.value.off('message:disconnection-confirmed')
		socket.value.off('message:connection-confirmed')
	})

	return {
		state,
		connectSocket,
		initConnection,
		disconnectSocket,
		socket,
	}
})
