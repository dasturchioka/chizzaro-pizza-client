<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Pizza, ShoppingCart, User } from 'lucide-vue-next'
import { PageTransition, TransitionPresets } from 'vue3-page-transition'
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
			class="tabs bg-brand-third flex items-center justify-between self-center mb-2 fixed bottom-0 z-50 shadow-lg rounded-full w-[96%]"
		>
			<RouterLink
				to="/menu"
				class="link transition-all w-full justify-center flex items-center p-4 font-semibold rounded-full"
				><Pizza class="icon transition-all scale-[0.7] w-6 h-6 mr-2" />
			</RouterLink>
			<RouterLink
				to="/account"
				class="link transition-all w-full justify-center flex items-center p-4 font-semibold rounded-full"
				><User class="icon transition-all scale-[0.7] w-6 h-6 mr-2" />
			</RouterLink>
			<RouterLink
				to="/cart"
				class="link transition-all w-full justify-center flex items-center p-4 font-semibold rounded-full"
				><ShoppingCart class="icon transition-all scale-[0.7] w-6 h-6 mr-2" />
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
