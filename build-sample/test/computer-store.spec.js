"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pricingRules_1 = require("../src/data/pricingRules");
const Checkout_1 = __importDefault(require("../src/implementations/Checkout"));
describe("Tests for testing the checkout interface of computer store", () => {
    test("When no SKU is scanned", () => {
        const co = new Checkout_1.default(pricingRules_1.pricingRules);
        const total = co.total();
        expect(total).toBe(0);
    });
    test("Wrong SKU passed", () => {
        const co = new Checkout_1.default(pricingRules_1.pricingRules);
        try {
            co.scan('ipad');
        }
        catch (error) {
            expect(error.message).toBe("Invalid SKU scanned");
        }
    });
    test("No offers applicable", () => {
        const emptyPricingRules = new Map();
        const co = new Checkout_1.default(emptyPricingRules);
        co.scan('ipd');
        co.scan('ipd');
        co.scan('vga');
        co.scan('mbp');
        co.scan('ipd');
        co.scan('ipd');
        const total = co.total();
        expect(total).toBe(3629.95);
    });
    test("Offer applicable but not en enough items bought", () => {
        const co = new Checkout_1.default(pricingRules_1.pricingRules);
        co.scan('ipd');
        co.scan('atv');
        const total = co.total();
        expect(total).toBe(659.49);
    });
    test("Buy 5 for price of 4 on MacBookPro and Buy 3 for price of 2 on Apple TV", () => {
        const mbpOffers = {
            buyXItemsForCostOfY: {
                x: 5,
                y: 4,
                applies: true,
            },
            bulkDiscount: {
                minBuyCountThreshold: 0,
                pricePerItem: 0,
                applies: false,
            }
        };
        const atvOffers = {
            buyXItemsForCostOfY: {
                x: 3,
                y: 2,
                applies: true,
            },
            bulkDiscount: {
                minBuyCountThreshold: 0,
                pricePerItem: 0,
                applies: false,
            }
        };
        const newPricingRules = new Map([['mbp', mbpOffers], ['atv', atvOffers]]);
        const co = new Checkout_1.default(newPricingRules);
        co.scan('mbp');
        co.scan('mbp');
        co.scan('atv');
        co.scan('mbp');
        co.scan('mbp');
        co.scan('atv');
        co.scan('mbp');
        co.scan('atv');
        co.scan('atv');
        co.scan('mbp');
        co.scan('mbp');
        co.scan('mbp');
        co.scan('mbp');
        co.scan('mbp');
        co.scan('mbp');
        const total = co.total();
        expect(total).toBe(12928.41);
    });
    test("Buy 4 for price of 3 on MacBookPro and bulk discount on VGA adapter", () => {
        const mbpOffers = {
            buyXItemsForCostOfY: {
                x: 4,
                y: 3,
                applies: true,
            },
            bulkDiscount: {
                minBuyCountThreshold: 0,
                pricePerItem: 0,
                applies: false,
            }
        };
        const vgaOffers = {
            buyXItemsForCostOfY: {
                x: 0,
                y: 0,
                applies: false,
            },
            bulkDiscount: {
                minBuyCountThreshold: 3,
                pricePerItem: 25,
                applies: true,
            }
        };
        const newPricingRules = new Map([['mbp', mbpOffers], ['vga', vgaOffers]]);
        const co = new Checkout_1.default(newPricingRules);
        co.scan('mbp');
        co.scan('mbp');
        co.scan('vga');
        co.scan('vga');
        co.scan('vga');
        co.scan('vga');
        co.scan('vga');
        const total = co.total();
        expect(total).toBe(2924.98);
    });
});
