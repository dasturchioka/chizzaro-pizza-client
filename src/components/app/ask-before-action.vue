<script lang="ts" setup>
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

defineProps<{ title?: string; description?: string }>()
const emit = defineEmits(['do:action'])
</script>

<template>
	<AlertDialog>
		<AlertDialogTrigger as-child>
			<slot name="trigger"></slot>
		</AlertDialogTrigger>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>{{ title ?? 'Ishonchingiz komilmi?' }}</AlertDialogTitle>
				<AlertDialogDescription>
					{{ description ?? "Jarayon yoki ma'lumotlar qayta tiklanmaydi" }}
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Bekor qilish</AlertDialogCancel>
				<AlertDialogAction @click="emit('do:action')">Davom etish</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
</template>
