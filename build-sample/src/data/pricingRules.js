"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pricingRules = void 0;
const ipdOffers = {
    buyXItemsForCostOfY: {
        x: 0,
        y: 0,
        applies: false,
    },
    bulkDiscount: {
        minBuyCountThreshold: 5,
        pricePerItem: 499.99,
        applies: true,
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
exports.pricingRules = new Map([['ipd', ipdOffers], ['atv', atvOffers]]);
