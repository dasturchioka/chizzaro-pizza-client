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
import { PinInput, PinInputGroup, PinInputInput } from '@/components/ui/pin-input'
import { vMaska } from 'maska/vue'
import Label from '../ui/label/Label.vue'
import Input from '../ui/input/Input.vue'
import Button from '../ui/button/Button.vue'
import { Loader2Icon, XIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useAuth } from '@/store/auth'
import { useLoading } from '@/store/loading'
import { storeToRefs } from 'pinia'

const loadingStore = useLoading()
const authStore = useAuth()

const { loading } = storeToRefs(loadingStore)

const userDetails = ref({
	phone: '998',
	code: [''],
})

const buttonDisabled = computed(() => {
	return userDetails.value.phone.length !== 12
})

const drawerCloseButton = ref<HTMLButtonElement | null>(null)

const isDisabledPinInput = ref(false)
const isConfirming = ref(false)

const login = async () => {
	if (buttonDisabled.value) return
	const result = await authStore.login({ phone: userDetails.value.phone })

	if (result && result.status === 'ok') {
		isConfirming.value = true
	}
}

const confirmLogin = async () => {
	isDisabledPinInput.value = true

	const result = await authStore.confirmLogin({
		phone: userDetails.value.phone,
		code: userDetails.value.code.join(''),
	})

	if (result && result.status === 'bad') {
		isDisabledPinInput.value = false
		userDetails.value.code = ['']
		return
	}

	if (result && result.status === 'ok') {
		isDisabledPinInput.value = false
		drawerCloseButton.value?.click()
	}
}

const changePhoneNumber = () => {
	isConfirming.value = false
}
</script>

<template>
	<Drawer>
		<DrawerTrigger as-child>
			<slot name="trigger"> </slot>
		</DrawerTrigger>
		<DrawerContent class="px-4">
			<div v-if="!isConfirming" class="">
				<DrawerClose as-child class="absolute top-4 right-4">
					<Button ref="drawerCloseButton" variant="ghost"> <XIcon /> </Button>
				</DrawerClose>
				<DrawerHeader class="text-left px-0">
					<DrawerTitle>Akkauntga kirish</DrawerTitle>
					<DrawerDescription>Telefon raqamingizni kiriting</DrawerDescription>
				</DrawerHeader>
				<form @submit.prevent="login">
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
					<Button @click="login" :disabled="buttonDisabled" class="py-6 font-semibold text-lg">
						<Loader2Icon v-show="loading" class="size-5 mr-2 animate-spin" /> Kirish
					</Button>
				</DrawerFooter>
			</div>
			<div v-else>
				<DrawerClose class="absolute top-4 right-4">
					<Button variant="ghost"> <XIcon /> </Button>
				</DrawerClose>
				<DrawerHeader class="text-left px-0">
					<DrawerTitle>Tasdiqlash</DrawerTitle>
					<DrawerDescription>Telefoningizga SMS qilib yuborilgan kodni kiriting</DrawerDescription>
				</DrawerHeader>
				<div>
					<div class="form-group flex items-center justify-center">
						<PinInput
							id="pin-input"
							v-model:model-value="userDetails.code"
							placeholder="○"
							@complete="confirmLogin"
							:disabled="isDisabledPinInput"
						>
							<PinInputGroup>
								<PinInputInput v-for="(id, index) in 5" :key="id" :index="index" />
							</PinInputGroup>
						</PinInput>
					</div>
				</div>
				<DrawerFooter class="px-0">
					<Button @click="changePhoneNumber" variant="ghost" class="py-6">
						Raqamni o'zgartirish
					</Button>
				</DrawerFooter>
			</div>
		</DrawerContent>
	</Drawer>
</template>
