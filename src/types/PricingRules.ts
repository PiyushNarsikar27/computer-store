import { Offers } from "./Offers";

//Pricing rules as the map of SKUs (keys) to offers (applies property set true for all applicable offers)
export type PricingRules = Map<string, Offers>;