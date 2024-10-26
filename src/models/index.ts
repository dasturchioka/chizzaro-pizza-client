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