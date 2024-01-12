import { Item } from "../types/Item";

const ipdItem: Item = {
    sku: 'ipd',
    name: 'Super iPad',
    price: 549.99,
};

const mbpItem: Item = {
    sku: 'mbp',
    name: 'MacBook Pro',
    price: 1399.99,
};

const atvItem: Item = {
    sku: 'atv',
    name: 'Apple TV',
    price: 109.50,
}

const vgaItem: Item = {
    sku: 'vga',
    name: 'VGA Adapter',
    price: 30.00,
}

export const catalogue: Item[] = [ipdItem, mbpItem, atvItem, vgaItem,];