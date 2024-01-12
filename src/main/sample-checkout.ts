import { pricingRules } from "../data/pricingRules";
import Checkout from "../implementations/Checkout";

const co1 = new Checkout(pricingRules);
co1.scan('atv');
co1.scan('atv');
co1.scan('atv');
co1.scan('vga');
console.log(co1.total());

const co2 = new Checkout(pricingRules);
co2.scan('atv');
co2.scan('ipd');
co2.scan('ipd');
co2.scan('atv');
co2.scan('ipd');
co2.scan('ipd');
co2.scan('ipd');
console.log(co2.total());