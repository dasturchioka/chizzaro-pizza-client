<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarLogo from './components/navbar-logo.vue'
import { Pizza, User } from 'lucide-vue-next'
import { PageTransition, TransitionPresets } from 'vue3-page-transition'

// @ts-ignore-all
const sendDataToBot = async () => {
	// @ts-ignore-all
	Telegram.WebApp.sendData(JSON.stringify({ msg: 'hello' }))
}
</script>

<template>
	<div
		class="h-screen max-h-screen overflow-y-scroll w-full bg-brand-light flex flex-col justify-between font-raleway"
	>
		<router-view v-slot="{ Component }">
			<PageTransition :name="TransitionPresets.fadeInUp" mode="out-in" appear>
				<component :is="Component" />
			</PageTransition>
		</router-view>
		<div
			class="tabs bg-brand-third flex items-center justify-between self-center mb-4 w-[90%] rounded-full fixed bottom-0 z-50 shadow-lg"
		>
			<RouterLink
				to="/menu"
				class="link transition-all w-full justify-center  flex items-center p-4 font-semibold rounded-full"
				><Pizza class="icon transition-all scale-80 w-6 h-6 mr-2" />
				<p class="scale-90 transition-all">Menu</p>
			</RouterLink>
			<RouterLink
				to="/account"
				class="link transition-all w-full justify-center  flex items-center p-4 font-semibold rounded-full"
				><User class="icon transition-all scale-80 w-6 h-6 mr-2" />
				<p class="scale-90 transition-all">Account</p>
			</RouterLink>
		</div>
	</div>
</template>

<style scoped>
.link.router-link-active.router-link-exact-active {
	@apply bg-brand-dark text-white shadow-md
}

.link.router-link-active.router-link-exact-active p {
	@apply scale-100
}

.link.router-link-active.router-link-exact-active .icon {
	@apply scale-100;
}
</style>
