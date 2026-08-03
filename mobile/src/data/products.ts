import { SwatchColorKey } from "../components/Swatch";

/**
 * The RSN One member catalogue — transcribed from the production storefront
 * catalog (rsn-one/apps/web/src/lib/storefront-demo/catalog.ts), so this POC
 * shows the house's real goods, real copy, and real photography rather than
 * invented stand-ins. Each `id` matches a photo in assets/products/<id>.jpg.
 *
 * Prices are member-facing NPR, the currency members actually think in.
 */

export type ProductFlag = "new" | "best-seller" | "low-stock" | "members-only";

export type Product = {
  id: string;
  name: string;
  /** One-line material/qualifier shown under the name. */
  meta: string;
  /** Preformatted member price, e.g. "Rs. 14,750". */
  price: string;
  priceValue: number;
  /** Display name of the room, e.g. "Home & Living". */
  category: string;
  categorySlug: string;
  description: string;
  /** Where it was made — the house sources at origin, so this is on every record. */
  origin: { place: string; country: string };
  plateNo?: string;
  /** Single headline tag rendered on cards and rows. */
  lotTag?: string;
  /** Reserved for members — gated behind admission. */
  membersOnly?: boolean;
  swatches?: { id: string; colorKey: SwatchColorKey }[];
};

/** The six rooms of the house, in display order. */
export const categories: { slug: string; name: string; subtitle: string }[] = [
  { slug: "home-living", name: "Home & Living", subtitle: "The rooms you return to" },
  { slug: "beauty-care", name: "Beauty & Care", subtitle: "Rituals, kept simple" },
  { slug: "mom-baby", name: "Mom & Baby", subtitle: "Soft things, held to a hard standard" },
  { slug: "food-beverage", name: "Food & Beverage", subtitle: "The table, sourced at origin" },
  { slug: "fashion-bags", name: "Fashion & Bags", subtitle: "What you carry, and for years" },
  { slug: "electronics", name: "Electronics", subtitle: "Quiet machines for the home" },
];

/** Formats a whole-rupee figure the way the member-facing web app does. */
export function formatNpr(value: number): string {
  return `Rs. ${value.toLocaleString("en-US")}`;
}

export const products: Product[] = [
  // ——— Home & Living ———
  {
    id: "jingdezhen-tea-service",
    name: "Jingdezhen Tea Service",
    meta: "High-fired porcelain, unglazed foot",
    price: "Rs. 14,750",
    priceValue: 14750,
    category: "Home & Living",
    categorySlug: "home-living",
    description:
      "Thrown and glazed in Jingdezhen, where porcelain has been made since the Song dynasty. The service holds one pot and four cups, each with an unglazed foot ring left raw so the hand knows the clay. The glaze is a warm ivory that deepens with use.",
    origin: { place: "Jingdezhen", country: "CN" },
    plateNo: "PL. 001",
    lotTag: "BEST SELLER",
  },
  {
    id: "lambswool-throw-ecru",
    name: "Lambswool Throw in Undyed Ecru",
    meta: "Undyed fleece, teasel finished",
    price: "Rs. 17,200",
    priceValue: 17200,
    category: "Home & Living",
    categorySlug: "home-living",
    description:
      "The mill has run since 1837 and still brushes its cloth with natural teasels. The fleece is left undyed, so the colour is the colour of the sheep. It is a generous size, made to be used rather than draped for show.",
    origin: { place: "Yorkshire", country: "GB" },
    plateNo: "PL. 002",
    lotTag: "BEST SELLER",
  },
  {
    id: "cedar-vetiver-diffuser",
    name: "Reed Diffuser, Cedar and Vetiver",
    meta: "A low, dry scent, four months",
    price: "Rs. 6,450",
    priceValue: 6450,
    category: "Home & Living",
    categorySlug: "home-living",
    description:
      "Cedar holds the base, vetiver keeps it dry, and a trace of cardamom keeps it from going to sleep. The vessel is hand-thrown stoneware in a matte oat glaze. One set scents a room for about four months.",
    origin: { place: "Chiang Mai", country: "TH" },
    plateNo: "PL. 003",
    lotTag: "BEST SELLER",
  },
  {
    id: "evening-candle-ritual",
    name: "Evening Candle Ritual, Set of Three",
    meta: "Rapeseed wax, three scents in sequence",
    price: "Rs. 8,900",
    priceValue: 8900,
    category: "Home & Living",
    categorySlug: "home-living",
    description:
      "Poured in Seoul from rapeseed wax, which burns clean and slow. The three scents are sequenced for an evening, moving from green fig to warm sandalwood to a near-nothing of white musk. Each burns for roughly twenty hours.",
    origin: { place: "Seoul", country: "KR" },
    plateNo: "PL. 004",
    lotTag: "NEW",
  },
  {
    id: "hand-knotted-wool-runner",
    name: "Hand-Knotted Wool Runner",
    meta: "Tibetan knot, sixty knots an inch",
    price: "Rs. 41,200",
    priceValue: 41200,
    category: "Home & Living",
    categorySlug: "home-living",
    description:
      "The same hands, the same looms, the same highland wool that leaves the valley wearing other names. Sixty knots to the inch in the Tibetan style, undyed, in three natural greys. Each runner takes a weaver about seven weeks.",
    origin: { place: "Kathmandu Valley", country: "NP" },
    plateNo: "PL. 005",
    lotTag: "LOW STOCK",
    membersOnly: true,
  },
  {
    id: "stoneware-dinner-service",
    name: "Stoneware Dinner Service for Four",
    meta: "Twelve pieces, matte oat glaze",
    price: "Rs. 19,100",
    priceValue: 19100,
    category: "Home & Living",
    categorySlug: "home-living",
    description:
      "Dinner plates, low bowls, and side plates for four, thrown heavy enough to feel certain in the hand. The matte glaze shrugs off cutlery marks, and every piece stacks flat. Made to be the only service a kitchen needs.",
    origin: { place: "Jingdezhen", country: "CN" },
    plateNo: "PL. 006",
    lotTag: "NEW",
  },

  // ——— Beauty & Care ———
  {
    id: "seoul-skincare-edit",
    name: "The Seoul Skincare Edit",
    meta: "Five steps, fragrance free",
    price: "Rs. 12,900",
    priceValue: 12900,
    category: "Beauty & Care",
    categorySlug: "beauty-care",
    description:
      "A cleanser, an essence, a serum, a cream, and a morning sunscreen, formulated by the contract laboratories behind several familiar names. The edit is fragrance-free and chosen for the dry Kathmandu winter as much as the humid summer.",
    origin: { place: "Seoul", country: "KR" },
    plateNo: "PL. 007",
    lotTag: "BEST SELLER",
    membersOnly: true,
  },
  {
    id: "camellia-facial-oil",
    name: "Camellia Facial Oil",
    meta: "First press, single harvest",
    price: "Rs. 7,050",
    priceValue: 7050,
    category: "Beauty & Care",
    categorySlug: "beauty-care",
    description:
      "Camellia oil has been the quiet staple of Korean dressing tables for centuries. This one is cold-pressed from a single harvest and bottled in amber glass within the season. Three drops, pressed in with the palm, after water and before cream.",
    origin: { place: "Jeju", country: "KR" },
    plateNo: "PL. 008",
  },
  {
    id: "beech-bristle-brush",
    name: "Boar-Bristle Brush in Oiled Beech",
    meta: "Boar bristle, oiled beech",
    price: "Rs. 5,800",
    priceValue: 5800,
    category: "Beauty & Care",
    categorySlug: "beauty-care",
    description:
      "Hand-finished beech, oiled rather than lacquered, set with natural boar bristle that carries oil from root to end. It is the kind of object that outlasts the dressing table it sits on.",
    origin: { place: "Devon", country: "GB" },
    plateNo: "PL. 009",
  },
  {
    id: "mulberry-silk-pillowcase",
    name: "Mulberry Silk Pillowcase",
    meta: "22 momme, hidden zip",
    price: "Rs. 6,750",
    priceValue: 6750,
    category: "Beauty & Care",
    categorySlug: "beauty-care",
    description:
      "Silk on both faces, not silk over cotton, at a weight that survives real use. The zip is hidden in the seam and the seam is flat, because a pillowcase is judged at two in the morning. Hair and skin will notice within the week.",
    origin: { place: "Suzhou", country: "CN" },
    plateNo: "PL. 010",
    lotTag: "BEST SELLER",
  },
  {
    id: "rice-enzyme-cleansing-powder",
    name: "Rice Enzyme Cleansing Powder",
    meta: "Powder to foam, morning rice",
    price: "Rs. 3,450",
    priceValue: 3450,
    category: "Beauty & Care",
    categorySlug: "beauty-care",
    description:
      "Sealed dry, so the enzymes stay alive until the water hits. Rice bran polishes, papain lifts, and the foam rinses to nothing. Gentle enough for every day, effective enough to retire the scrub.",
    origin: { place: "Seoul", country: "KR" },
    plateNo: "PL. 011",
    lotTag: "NEW",
  },

  // ——— Mom & Baby ———
  {
    id: "muslin-swaddle-set",
    name: "Organic Muslin Swaddle, Set of Two",
    meta: "Six-times-washed organic muslin",
    price: "Rs. 5,200",
    priceValue: 5200,
    category: "Mom & Baby",
    categorySlug: "mom-baby",
    description:
      "Woven loose, then washed six times before it is folded, so it arrives the way most muslin takes a year to become. Certified organic cotton, undyed in natural ecru, generously sized for swaddle, shade, and everything after.",
    origin: { place: "Chiang Mai", country: "TH" },
    plateNo: "PL. 012",
    lotTag: "BEST SELLER",
  },
  {
    id: "beechwood-rattle-set",
    name: "Beechwood Rattle and Teether",
    meta: "One piece of beech, beeswax finish",
    price: "Rs. 4,250",
    priceValue: 4250,
    category: "Mom & Baby",
    categorySlug: "mom-baby",
    description:
      "No paint, no lacquer, no seam. The rattle and teether are turned from single pieces of European beech and sealed with food-grade beeswax, because everything ends up in the mouth. Tested to EN 71 and made to be handed down.",
    origin: { place: "Yorkshire", country: "GB" },
    plateNo: "PL. 013",
  },
  {
    id: "merino-first-blanket",
    name: "Merino First Blanket",
    meta: "Seamless knit, 19.5 micron",
    price: "Rs. 10,400",
    priceValue: 10400,
    category: "Mom & Baby",
    categorySlug: "mom-baby",
    description:
      "Extra-fine merino, knitted seamless so there is nothing to catch small fingers. Merino carries warmth without weight and forgives the washing machine, which matters more than anything else in the first year.",
    origin: { place: "Inner Mongolia", country: "CN" },
    plateNo: "PL. 014",
    lotTag: "NEW",
  },
  {
    id: "bamboo-feeding-set",
    name: "Bamboo First Feeding Set",
    meta: "Suction base, five pieces",
    price: "Rs. 3,200",
    priceValue: 3200,
    category: "Mom & Baby",
    categorySlug: "mom-baby",
    description:
      "Plate, bowl, cup, and first cutlery in pressed bamboo fibre, food-safe and quietly handsome. The silicone base grips the table through the experimental months. Light enough for small hands, heavy enough not to fly.",
    origin: { place: "Chiang Mai", country: "TH" },
    plateNo: "PL. 015",
  },
  {
    id: "organic-sleep-suits",
    name: "Organic Cotton Sleep Suits, Set of Two",
    meta: "Brushed organic cotton, fold-over cuffs",
    price: "Rs. 3,700",
    priceValue: 3700,
    category: "Mom & Baby",
    categorySlug: "mom-baby",
    description:
      "Brushed organic cotton with the seams sewn outward and the labels printed, not stitched. Fold-over cuffs for the newborn weeks, a two-way zip for the two-in-the-morning change. Cut generously so they last past the season.",
    origin: { place: "Chiang Mai", country: "TH" },
    plateNo: "PL. 016",
  },

  // ——— Food & Beverage ———
  {
    id: "ilam-first-flush",
    name: "Ilam First Flush, Spring Pick",
    meta: "One garden, spring pick",
    price: "Rs. 3,700",
    priceValue: 3700,
    category: "Food & Beverage",
    categorySlug: "food-beverage",
    description:
      "Nepal's eastern hills grow tea the equal of their famous neighbour, and this is the proof. One garden, one picking, two leaves and a bud, packed within the month. Bright, floral, and best taken without milk.",
    origin: { place: "Ilam", country: "NP" },
    plateNo: "PL. 017",
    lotTag: "LOW STOCK",
    membersOnly: true,
  },
  {
    id: "jasmine-rice-new-crop",
    name: "Single-Estate Jasmine Rice, New Crop",
    meta: "New crop, milled to order",
    price: "Rs. 3,400",
    priceValue: 3400,
    category: "Food & Beverage",
    categorySlug: "food-beverage",
    description:
      "The club exists for objects like this. New-crop jasmine rice is a different food from what sits on shelves for a year, and one estate in Surin mills ours to order. The grain is fragrant when the bag opens, before the pot is on.",
    origin: { place: "Surin", country: "TH" },
    plateNo: "PL. 018",
    lotTag: "BEST SELLER",
  },
  {
    id: "kandy-spice-index",
    name: "The Kandy Spice Index",
    meta: "Eight estates, ground this quarter",
    price: "Rs. 7,050",
    priceValue: 7050,
    category: "Food & Beverage",
    categorySlug: "food-beverage",
    description:
      "True cinnamon, two peppers, cloves, cardamom, turmeric, nutmeg, and mace, each from estates in the central highlands and ground within the quarter. The jars are labelled with harvest dates, because spice is produce.",
    origin: { place: "Kandy", country: "LK" },
    plateNo: "PL. 019",
  },
  {
    id: "himalayan-wildflower-honey",
    name: "Himalayan Wildflower Honey",
    meta: "Raw, single apiary, Jumla",
    price: "Rs. 2,150",
    priceValue: 2150,
    category: "Food & Beverage",
    categorySlug: "food-beverage",
    description:
      "Gathered above three thousand metres where the wildflowers are short-seasoned and fierce, and bottled raw. It crystallises in winter, as honest honey does. A jar lasts a household a season and tastes of the meadow it came from.",
    origin: { place: "Jumla", country: "NP" },
    plateNo: "PL. 020",
    lotTag: "BEST SELLER",
  },
  {
    id: "ceylon-breakfast-tin",
    name: "Ceylon Breakfast Tea, Estate Tin",
    meta: "Dimbula estate, full leaf",
    price: "Rs. 2,600",
    priceValue: 2600,
    category: "Food & Beverage",
    categorySlug: "food-beverage",
    description:
      "The western slopes of Dimbula make the breakfast tea other regions imitate. This is one estate's full-leaf pekoe, packed at origin in a tin that refills. Brisk, malty, and built for the first pot of the day.",
    origin: { place: "Dimbula", country: "LK" },
    plateNo: "PL. 021",
  },

  // ——— Fashion & Bags ———
  {
    id: "suzhou-silk-scarf",
    name: "Mulberry Silk Scarf, Hand-Rolled",
    meta: "Mulberry silk, hand-rolled edge",
    price: "Rs. 11,700",
    priceValue: 11700,
    category: "Fashion & Bags",
    categorySlug: "fashion-bags",
    description:
      "Suzhou has woven silk since before the city had walls. The scarf is a twenty-two momme twill, dyed in a single tone, with edges rolled and stitched by hand. The hem is the difference, and you can feel it.",
    origin: { place: "Suzhou", country: "CN" },
    plateNo: "PL. 022",
    lotTag: "BEST SELLER",
    swatches: [
      { id: "walnut", colorKey: "walnut" },
      { id: "oxblood", colorKey: "oxblood" },
      { id: "noir", colorKey: "noir" },
    ],
  },
  {
    id: "bridle-leather-crossbody",
    name: "Bridle Leather Crossbody",
    meta: "English bridle leather, unlined",
    price: "Rs. 25,200",
    priceValue: 25200,
    category: "Fashion & Bags",
    categorySlug: "fashion-bags",
    description:
      "Walsall made saddles for an empire, and the leather is still dressed the same way, stuffed with tallow and wax until it can hold a curve for decades. The bag is cut clean, stitched at eight to the inch, and unlined on purpose so the leather can speak.",
    origin: { place: "Walsall", country: "GB" },
    plateNo: "PL. 023",
    lotTag: "NEW",
    swatches: [
      { id: "saddle", colorKey: "saddle" },
      { id: "walnut", colorKey: "walnut" },
      { id: "noir", colorKey: "noir" },
    ],
  },
  {
    id: "cashmere-travel-wrap",
    name: "Cashmere Travel Wrap",
    meta: "Four-ply, herder direct",
    price: "Rs. 21,300",
    priceValue: 21300,
    category: "Fashion & Bags",
    categorySlug: "fashion-bags",
    description:
      "Bought directly from a herders' cooperative in Inner Mongolia and spun to four plies, which is twice the weight most houses use. It is a blanket that behaves like a garment, and it earns its place in a carry-on for the rest of your life.",
    origin: { place: "Inner Mongolia", country: "CN" },
    plateNo: "PL. 024",
    swatches: [
      { id: "walnut", colorKey: "walnut" },
      { id: "noir", colorKey: "noir" },
    ],
  },
  {
    id: "pebbled-card-wallet",
    name: "Pebbled Leather Card Wallet",
    meta: "Six cards, edge painted",
    price: "Rs. 7,350",
    priceValue: 7350,
    category: "Fashion & Bags",
    categorySlug: "fashion-bags",
    description:
      "Pebbled calf with the structure to stand up to a back pocket, six card slots and a centre slip for folded notes. The edges are painted and polished by hand, which is where lesser wallets give themselves away.",
    origin: { place: "Walsall", country: "GB" },
    plateNo: "PL. 025",
    lotTag: "NEW",
    swatches: [
      { id: "saddle", colorKey: "saddle" },
      { id: "oxblood", colorKey: "oxblood" },
    ],
  },
  {
    id: "cashmere-beanie",
    name: "Ribbed Cashmere Beanie",
    meta: "Two-ply rib, herder direct",
    price: "Rs. 6,000",
    priceValue: 6000,
    category: "Fashion & Bags",
    categorySlug: "fashion-bags",
    description:
      "Knitted from the cooperative's two-ply yarn in a deep rib that holds its shape without gripping. No logo, no cuff badge, nothing to date it. The kind of beanie that gets stolen by the rest of the household.",
    origin: { place: "Inner Mongolia", country: "CN" },
    plateNo: "PL. 026",
    lotTag: "LOW STOCK",
  },

  // ——— Electronics ———
  {
    id: "stone-temperature-kettle",
    name: "Temperature Kettle in Matte Stone",
    meta: "One-degree control, matte stone",
    price: "Rs. 11,000",
    priceValue: 11000,
    category: "Electronics",
    categorySlug: "electronics",
    description:
      "Most machines apologise for themselves. This one holds 85 degrees for green tea or a rolling boil for the pot, pours slowly from a balanced gooseneck, and wears a matte mineral coating the colour of river stone. It is quiet in every sense.",
    origin: { place: "Seoul", country: "KR" },
    plateNo: "PL. 027",
    lotTag: "BEST SELLER",
  },
  {
    id: "cordless-brass-lamp",
    name: "Cordless Table Lamp in Warm Brass",
    meta: "Solid brass, thirty hours a charge",
    price: "Rs. 13,500",
    priceValue: 13500,
    category: "Electronics",
    categorySlug: "electronics",
    description:
      "Machined brass, left unlacquered so it ages where fingers touch it. The light runs from a candle-low 1800 kelvin to a working warm white, and the cell carries an evening's dinner party many times over. Charge it monthly and forget it otherwise.",
    origin: { place: "Dubai", country: "AE" },
    plateNo: "PL. 028",
    lotTag: "NEW",
  },
  {
    id: "quiet-tower-purifier",
    name: "Air Purifier, Quiet Tower",
    meta: "HEPA-13, nineteen decibels",
    price: "Rs. 22,300",
    priceValue: 22300,
    category: "Electronics",
    categorySlug: "electronics",
    description:
      "Chosen for this city in particular. A true HEPA-13 filter, a sleep mode measured at nineteen decibels, and a fabric-wrapped body in warm grey that does not ask to be hidden. The filters are stocked by the club so replacements are never a search.",
    origin: { place: "Seoul", country: "KR" },
    plateNo: "PL. 029",
  },
  {
    id: "sunrise-alarm-clock",
    name: "Sunrise Alarm Clock",
    meta: "Light before sound, linen face",
    price: "Rs. 8,000",
    priceValue: 8000,
    category: "Electronics",
    categorySlug: "electronics",
    description:
      "The light comes up the way a window does, from ember to morning over half an hour, and most mornings the chime never gets its turn. The face is wrapped in linen, the buttons are on the back, and the display dims to nothing at night.",
    origin: { place: "Seoul", country: "KR" },
    plateNo: "PL. 030",
    lotTag: "NEW",
  },
  {
    id: "quiet-stone-humidifier",
    name: "Cool-Mist Humidifier, Quiet Stone",
    meta: "Ultrasonic, ceramic body",
    price: "Rs. 10,800",
    priceValue: 10800,
    category: "Electronics",
    categorySlug: "electronics",
    description:
      "Kathmandu winters are dry enough to crack furniture, let alone skin. This one holds three litres, runs a night and a half on a fill, and hides its workings inside a matte ceramic shell that looks like it was always on the shelf.",
    origin: { place: "Seoul", country: "KR" },
    plateNo: "PL. 031",
    lotTag: "BEST SELLER",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** How many pieces sit in a given room — drives the Archive counts. */
export function countByCategory(name: string): number {
  return products.filter((p) => p.category === name).length;
}
