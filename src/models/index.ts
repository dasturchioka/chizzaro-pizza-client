export interface Item {
	id: string
	name: string
	size: string
	price: string
	quantity: number
	img: string
	description?: string
	category: {
		name: string
		[key: string]: any
	}
}

export interface Category {
	name: string
	isOnTheBase: boolean
	[key: string]: any
}

export interface CategoryOfItems {
	id: string
	name: string
	items: Item[]
	[key: string]: any
}

export interface Location {
	id: string
	displayName: string
	lat: string
	lng: string
	Client?: Client
	clientId?: string
}

export interface Client {
	id: string
	phone: string
	fullname: string
	status: ClientStatus
	confirmation?: object
	telegramId: string
	orders: Order[]
	createdAt?: Date
	locations: Location[]
}

export interface Order {
	id: string
	price: string
	deliveryFee: string
	items: Item[]
	location: string
	lat: string
	lng: string
	distance: string // in km
	status?: OrderStatus
	client?: Client
	courier?: Courier
	createdAt: Date
	clientId?: string
	courierId?: string
}

export interface Courier {
	id: string
	phone: string
	login: string
	fullname: string
	status: CourierStatus
	password: string
	orders: Order[]
	createdAt: Date
}

type CourierStatus = 'IDLE' | 'OFFLINE' | 'BUSY'

type OrderStatus =
	| 'CREATED'
	| 'COOKING'
	| 'COOKED'
	| 'ONTHEWAY'
	| 'COMPLETED'
	| 'CANCELLED_BY_CLIENT'
	| 'CANCELLED_BY_COURIER'
	| 'CANCELLED_BY_SERVER'

type ClientStatus = 'IDLE' | 'OFFLINE'
