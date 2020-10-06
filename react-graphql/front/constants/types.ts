export type IUser = {
    id: string;
    name: string;
    email: string;
}

export type ItemState =
    'receiving' |
    'receiptCompleted' |
    'deliveryProgress' |
    'deliveryCompleted' |
    'canceled' |
    'confirmation' 