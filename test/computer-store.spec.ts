import { pricingRules } from "../src/data/pricingRules"
import Checkout from "../src/implementations/Checkout"
import { Offers } from "../src/types/Offers";
import { PricingRules } from "../src/types/PricingRules";

describe("Tests for testing the checkout interface of computer store", ()=>{
    test("When no SKU is scanned", ()=>{
        const co = new Checkout(pricingRules);
        const total = co.total();
        expect(total).toBe(0);
    });

    test("Wrong SKU passed", ()=>{
        const co = new Checkout(pricingRules);
        try{
            co.scan('ipad');
        }
        catch(error){
            expect(error.message).toBe("Invalid SKU scanned");
        }
        
    })

    test("No offers applicable", ()=>{
        const emptyPricingRules: PricingRules = new Map();
        const co = new Checkout(emptyPricingRules);
        co.scan('ipd');
        co.scan('ipd');
        co.scan('vga');
        co.scan('mbp');
        co.scan('ipd');
        co.scan('ipd');
        const total = co.total();
        expect(total).toBe(3629.95);
    });

    test("Offer applicable but not en enough items bought", ()=>{
        const co = new Checkout(pricingRules);
        co.scan('ipd');
        co.scan('atv');
        const total = co.total();
        expect(total).toBe(659.49);
    })

    test("Buy 5 for price of 4 on MacBookPro and Buy 3 for price of 2 on Apple TV", ()=>{
        const mbpOffers: Offers = {
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
        
        const atvOffers: Offers = {
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
        const newPricingRules:PricingRules = new Map([['mbp', mbpOffers], ['atv', atvOffers]]);
        const co = new Checkout(newPricingRules);
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

    test("Buy 4 for price of 3 on MacBookPro and bulk discount on VGA adapter", ()=>{
        const mbpOffers: Offers = {
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
        
        const vgaOffers: Offers = {
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
        const newPricingRules:PricingRules = new Map([['mbp', mbpOffers], ['vga', vgaOffers]]);
        const co = new Checkout(newPricingRules);
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