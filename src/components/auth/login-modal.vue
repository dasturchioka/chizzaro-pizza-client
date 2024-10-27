<script lang="ts" setup>
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { vMaska } from 'maska/vue'
import Label from '../ui/label/Label.vue'
import Input from '../ui/input/Input.vue'
import Button from '../ui/button/Button.vue'
import { XIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const userDetails = ref({
	phone: '998',
})

const buttonDisabled = computed(() => {
	return userDetails.value.phone.length !== 12
})
</script>

<template>
	<Drawer>
		<DrawerTrigger as-child>
			<slot name="trigger"> </slot>
		</DrawerTrigger>
		<DrawerContent class="px-4">
			<DrawerClose class="absolute top-4 right-4">
				<Button variant="ghost"> <XIcon /> </Button>
			</DrawerClose>
			<DrawerHeader class="text-left px-0">
				<DrawerTitle>Akkauntga kirish</DrawerTitle>
				<DrawerDescription>Telefon raqamingizni kiriting</DrawerDescription>
			</DrawerHeader>
			<form>
				<div class="form-group">
					<Label for="phone-number">Telefon raqam</Label>
					<Input
						v-model:model-value="userDetails.phone"
						id="phone-number"
						v-maska="`998#########`"
						class="py-6 text-lg font-semibold"
					/>
				</div>
			</form>
			<DrawerFooter class="px-0">
				<Button :disabled="buttonDisabled" class="py-6 font-semibold text-lg">Kirish</Button>
			</DrawerFooter>
		</DrawerContent>
	</Drawer>
</template>
