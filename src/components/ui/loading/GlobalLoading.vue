<script lang="ts" setup>
import Logo from '@/components/icons/Logo.vue'
import { LoaderCircle } from 'lucide-vue-next'
import { useLoading } from '@/store/loading'
import { storeToRefs } from 'pinia'

const loadingStore = useLoading()

const { globalLoading } = storeToRefs(loadingStore)
</script>

<template>
	<transition name="fade">
		<div
			v-show="globalLoading"
			class="global-loading w-full h-screen fixed inset-0 flex items-center justify-center bg-brand-dark z-[100]"
		>
			<div class="box flex flex-col items-center justify-center h-auto">
				<Logo class="w-[200px] h-[300px]" />
				<transition name="fade">
					<div v-show="globalLoading" class="flex items-center space-x-2 text-white">
						<LoaderCircle class="size-7 animate-spin" />
						<h1 class="text-lg font-semibold">Yuklanmoqda...</h1>
					</div>
				</transition>
			</div>
		</div>
	</transition>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
