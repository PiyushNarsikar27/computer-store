import { Item } from "./Item";

export interface ICheckout{
    scan(sku: string): void;
    total(): number;
}