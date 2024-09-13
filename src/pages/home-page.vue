<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
	<div class="home-page h-screen flex flex-col items-center justify-center">
		<h1 class="text-2xl font-bold">Bosh sahifa</h1>
		<p class="font-semibold mb-4">Menuni ko'rmoqchimisiz?</p>
		<Button class="bg-brand-dark" @click="router.push('/menu')">Menuga o'tish</Button>
	</div>
</template>
