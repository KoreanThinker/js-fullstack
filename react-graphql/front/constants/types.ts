export type IUser = {
    id: number
    name: string
    email: string
}

export type Image = {
    id: number
    src: string
}

export type Item = {
    id: number
    published: boolean
    price: number
    name: string
    mainImage: string
}

export type ItemState =
    'receiving' |
    'receiptCompleted' |
    'deliveryProgress' |
    'deliveryCompleted' |
    'canceled' |
    'confirmation' 