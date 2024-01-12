"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catalogue_1 = require("../data/catalogue");
class Checkout {
    scan(sku) {
        const itemDetails = catalogue_1.catalogue.filter(item => item.sku === sku);
        if (itemDetails.length === 0) {
            throw Error("Invalid SKU scanned");
        }
        if (itemDetails.length > 1) {
            throw Error("The given SKU has duplicate entries in the catalogue");
        }
        const item = itemDetails[0];
        if (!(this.itemCountAndPrice.get(sku))) {
            this.itemCountAndPrice.set(sku, { count: 1, price: item.price });
        }
        else {
            this.itemCountAndPrice.get(sku).count++;
        }
    }
    total() {
        let total = 0;
        this.itemCountAndPrice.forEach((_, sku) => {
            const offersAvailable = this.pricingRules.get(sku);
            if (!offersAvailable) {
                total += this.itemCountAndPrice.get(sku).price; //can safely use non null assertion as sku is from parameter of callback function of forEach itself
            }
            else {
                const itemCount = this.itemCountAndPrice.get(sku).count;
                // Below code is based on the assumption that only one offer is applicable to an SKU at a time
                if (offersAvailable.buyXItemsForCostOfY.applies) {
                    const noOfOfferEligibleItems = itemCount - (itemCount % offersAvailable.buyXItemsForCostOfY.x);
                    const noOfNonEligibleItems = itemCount % offersAvailable.buyXItemsForCostOfY.x;
                    const effectiveNoOfItems = noOfNonEligibleItems +
                        noOfOfferEligibleItems * offersAvailable.buyXItemsForCostOfY.y / offersAvailable.buyXItemsForCostOfY.x;
                    total += this.itemCountAndPrice.get(sku).price * effectiveNoOfItems;
                }
                if (offersAvailable.bulkDiscount.applies) {
                    if (itemCount >= offersAvailable.bulkDiscount.minBuyCountThreshold) {
                        total += itemCount * offersAvailable.bulkDiscount.pricePerItem;
                    }
                    else {
                        total += itemCount * this.itemCountAndPrice.get(sku).price;
                    }
                }
            }
        });
        return total;
    }
    constructor(pricingRules) {
        this.pricingRules = pricingRules;
        this.itemCountAndPrice = new Map();
    }
}
exports.default = Checkout;
