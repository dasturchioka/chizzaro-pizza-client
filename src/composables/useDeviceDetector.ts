import { ref, onMounted } from 'vue'

export function useDeviceDetector() {
	const isMobile = ref(false)

	onMounted(() => {
		const userAgent = navigator.userAgent
		isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			userAgent
		)
	})

	return { isMobile }
}
