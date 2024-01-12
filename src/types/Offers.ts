//Type of the list of all available offers
export type Offers = {
    buyXItemsForCostOfY: {
        x: number,
        y: number,
        applies: boolean, //Specifies if the offer is applicable to the SKU
    },
    bulkDiscount: {
        minBuyCountThreshold: number,
        pricePerItem: number,
        applies: boolean,
    },
};