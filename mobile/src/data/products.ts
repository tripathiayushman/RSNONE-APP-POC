import { SwatchColorKey } from "../components/Swatch";

export type Product = {
  id: string;
  name: string;
  meta: string;
  price: string;
  priceValue: number;
  category: string;
  description: string;
  plateNo?: string;
  lotTag?: string;
  swatches?: { id: string; colorKey: SwatchColorKey }[];
};

export const products: Product[] = [
  {
    id: "bordeaux-tote",
    name: "The Bordeaux Tote",
    meta: "Calfskin, Brass Hardware",
    price: "$4,850",
    priceValue: 4850,
    category: "Bags",
    description:
      "Cut from a single hide of French calfskin and finished by hand over eleven days, the Bordeaux Tote carries its structure without a single interior seam. Brass fittings are cast, not stamped.",
    plateNo: "PL. 001",
    lotTag: "NEW",
    swatches: [
      { id: "walnut", colorKey: "walnut" },
      { id: "oxblood", colorKey: "oxblood" },
      { id: "noir", colorKey: "noir" },
    ],
  },
  {
    id: "signet-yellow",
    name: "Signet, 18k Yellow",
    meta: "18k Yellow Gold",
    price: "$2,200",
    priceValue: 2200,
    category: "Jewelry",
    description:
      "A house signet cast to order in eighteen-karat gold, left unengraved until you decide what it should carry forward. Weighted for presence, not spectacle.",
    plateNo: "PL. 002",
  },
  {
    id: "meridian-minaudiere",
    name: "The Meridian Minaudière",
    meta: "Lacquered Calfskin",
    price: "$3,600",
    priceValue: 3600,
    category: "Evening",
    description:
      "Lacquered to a depth that takes six passes to achieve, the Meridian closes on a hidden brass clasp tuned to a particular, satisfying weight of click.",
    plateNo: "PL. 003",
    lotTag: "EDITION OF 9",
  },
  {
    id: "vetiver-minuit",
    name: "Vetiver de Minuit",
    meta: "100ml Eau de Parfum",
    price: "$340",
    priceValue: 340,
    category: "Fragrance",
    description:
      "Haitian vetiver root over smoked cedar and a low note of leather accord — composed to read as an extension of the house's tanneries rather than a departure from them.",
    plateNo: "PL. 004",
  },
  {
    id: "attache-slim",
    name: "The Attaché, Slim",
    meta: "Bridle Leather",
    price: "$5,200",
    priceValue: 5200,
    category: "Bags",
    description:
      "Bridle leather, curried and waxed by the same tannery since the house's founding. The slim profile holds a single ledger and nothing else — deliberately.",
    plateNo: "PL. 005",
    lotTag: "BESPOKE",
    swatches: [
      { id: "saddle", colorKey: "saddle" },
      { id: "noir", colorKey: "noir" },
      { id: "walnut", colorKey: "walnut" },
    ],
  },
  {
    id: "cavallo-loafer",
    name: "The Cavallo Loafer",
    meta: "Suede, Leather Sole",
    price: "$980",
    priceValue: 980,
    category: "Footwear",
    description:
      "Unlined suede over a leather sole, built on a last that has not changed in three decades. Breaks in within a week, holds its shape for twenty years.",
    plateNo: "PL. 006",
  },
  {
    id: "cufflinks-onyx",
    name: "Cufflinks, Onyx & Gold",
    meta: "Onyx, 18k Gold",
    price: "$1,450",
    priceValue: 1450,
    category: "Jewelry",
    description:
      "Black onyx set in eighteen-karat gold, the toggle hand-fitted so the face sits flush rather than swinging loose through the day.",
    plateNo: "PL. 007",
  },
  {
    id: "marchetti-card-case",
    name: "The Marchetti Card Case",
    meta: "Alligator",
    price: "$890",
    priceValue: 890,
    category: "Small Leather Goods",
    description:
      "A single alligator hide yields perhaps four of these cases. Edges are painted by hand, twelve coats, and burnished between each.",
    plateNo: "PL. 008",
    lotTag: "ARCHIVE",
  },
  {
    id: "ambre-imperiale",
    name: "Ambre Impériale",
    meta: "100ml Eau de Parfum",
    price: "$360",
    priceValue: 360,
    category: "Fragrance",
    description:
      "Amber resin, tobacco leaf, and a trace of the same brass-tinged musk used to finish the hardware room. Worn close, it does not travel far from the skin.",
    plateNo: "PL. 009",
  },
  {
    id: "voussoir-belt",
    name: "The Voussoir Belt",
    meta: "Bridle Leather, Brass Buckle",
    price: "$620",
    priceValue: 620,
    category: "Accessories",
    description:
      "Named for the keystone shape of its buckle plate, cast in solid brass and hand-set into a strap of bridle leather cut on the bias for a cleaner roll.",
    plateNo: "PL. 010",
    swatches: [
      { id: "saddle", colorKey: "saddle" },
      { id: "oxblood", colorKey: "oxblood" },
    ],
  },
  {
    id: "pearl-brass-earrings",
    name: "Drop Earrings, Pearl & Brass",
    meta: "Freshwater Pearl, Brass",
    price: "$1,650",
    priceValue: 1650,
    category: "Jewelry",
    description:
      "A single freshwater pearl, hand-matched for lustre, set below a brushed brass baton. Lighter than they look, which is the point.",
    plateNo: "PL. 011",
  },
  {
    id: "corsair-weekender",
    name: "The Corsair Weekender",
    meta: "Calfskin, Brass Hardware",
    price: "$6,400",
    priceValue: 6400,
    category: "Bags",
    description:
      "Built on the same last as the Bordeaux Tote at twice the volume, with a removable shoe pouch and a strap long enough to wear crossbody without adjustment.",
    plateNo: "PL. 012",
    lotTag: "NEW",
    swatches: [
      { id: "walnut", colorKey: "walnut" },
      { id: "noir", colorKey: "noir" },
    ],
  },
  {
    id: "occhiali-sun-no3",
    name: "The Occhiali Sun, No. 3",
    meta: "Acetate, Brass Trim",
    price: "$520",
    priceValue: 520,
    category: "Eyewear",
    description:
      "Italian acetate, hand-polished, with a brass temple detail lifted directly from the buckle room. Lenses are glass, not composite.",
    plateNo: "PL. 013",
  },
  {
    id: "sommelier-case",
    name: "The Sommelier Case",
    meta: "Walnut & Saddle Leather",
    price: "$2,950",
    priceValue: 2950,
    category: "Accessories",
    description:
      "A travel case for two bottles, walnut shell wrapped in saddle leather, lined in a wool felt milled to the house's own specification.",
    plateNo: "PL. 014",
    lotTag: "BESPOKE",
    swatches: [
      { id: "saddle", colorKey: "saddle" },
      { id: "walnut", colorKey: "walnut" },
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
