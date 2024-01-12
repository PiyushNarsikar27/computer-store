import { Offers } from "../types/Offers";
import { PricingRules } from "../types/PricingRules";

const ipdOffers: Offers = {
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

export const pricingRules:PricingRules = new Map([['ipd', ipdOffers], ['atv', atvOffers]]);