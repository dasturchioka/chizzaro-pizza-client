<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Pizza, ShoppingCart, User } from 'lucide-vue-next'
import { PageTransition, TransitionPresets } from 'vue3-page-transition'
import { Toaster } from 'vue-sonner'
import { useTelegramId } from '@/composables/useTelegramId'
import LoginModal from './components/auth/login-modal.vue'
import { useAuth } from './store/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuth()
const { userIdOnTelegram } = useTelegramId()

const { isLoggedIn } = storeToRefs(authStore)
</script>

<template>
	<div
		class="h-screen max-h-screen overflow-y-scroll w-full bg-brand-light flex flex-col font-raleway"
	>
		<Toaster
			position="top-center"
			:toastOptions="{
				style: { background: '#fff' },
				class: 'my-toast',
				descriptionClass: 'my-toast-description',
			}"
		/>
		<nav class="top-nav">
			<div class="select-location"></div>
		</nav>
		<router-view v-slot="{ Component }">
			<PageTransition :name="TransitionPresets.fadeInUp" mode="out-in" appear>
				<component :is="Component" />
			</PageTransition>
		</router-view>
		<div
			class="tabs bg-brand-third flex items-center justify-between self-center mb-2 fixed bottom-0 z-50 shadow-2xl rounded-full w-[96%] border-2 border-brand-dark"
		>
			<RouterLink
				:to="`/menu/${userIdOnTelegram}`"
				class="link transition-all w-full justify-center flex items-center p-4 font-semibold rounded-full"
				><Pizza class="icon transition-all scale-[0.7] w-6 h-6" />
			</RouterLink>
			<RouterLink
				v-if="isLoggedIn"
				to="/account"
				class="link transition-all w-full justify-center flex items-center p-4 font-semibold rounded-full"
			>
				<User class="icon transition-all scale-[0.7] w-6 h-6" />
			</RouterLink>
			<LoginModal v-else>
				<template #trigger>
					<button
						class="link transition-all w-full justify-center flex items-center p-4 font-semibold rounded-full"
					>
						<User class="icon transition-all scale-[0.7] w-6 h-6" />
					</button>
				</template>
			</LoginModal>
			<RouterLink
				to="/cart"
				class="link transition-all w-full justify-center flex items-center p-4 font-semibold rounded-full"
				><ShoppingCart class="icon transition-all scale-[0.7] w-6 h-6" />
			</RouterLink>
		</div>
	</div>
</template>

<style scoped>
.link.router-link-active.router-link-exact-active {
	@apply bg-brand-dark  shadow-md;
}

.link.router-link-active.router-link-exact-active .icon {
	@apply scale-105 left-4 text-white;
}
</style>
