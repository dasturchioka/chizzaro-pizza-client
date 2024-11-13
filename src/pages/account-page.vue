<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { useProfile } from '@/store/profile'
import AskBeforeAction from '@/components/app/ask-before-action.vue'

const profileStore = useProfile()
</script>

<template>
	<div class="home-page max-h-screen p-4">
		<h1 class="text-2xl font-semibold text-center mb-6">Account page</h1>
		<AskBeforeAction @do:action="profileStore.logOut">
			<template #trigger>
				<Button>Chiqish</Button>
			</template>
		</AskBeforeAction>
	</div>
</template>
