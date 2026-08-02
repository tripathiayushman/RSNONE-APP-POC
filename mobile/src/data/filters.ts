export type FilterChip = {
  id: string;
  label: string;
};

/** Material chip options for the Refine sheet. */
export const materialFilters: FilterChip[] = [
  { id: "calfskin", label: "Calfskin" },
  { id: "suede", label: "Suede" },
  { id: "bridle", label: "Bridle" },
  { id: "exotic", label: "Exotic" },
  { id: "vachetta", label: "Vachetta" },
  { id: "nubuck", label: "Nubuck" },
  { id: "lacquered", label: "Lacquered Calf" },
];

/** Default handle positions (percent along the rail) for the price range control. */
export const priceRangeDefault: { lowPercent: number; highPercent: number } = {
  lowPercent: 18,
  highPercent: 70,
};

/** Availability / edition tags for the Refine sheet. */
export const availabilityFilters: FilterChip[] = [
  { id: "in-stock", label: "In Stock" },
  { id: "in-transit", label: "In Transit" },
  { id: "delivered", label: "Delivered" },
  { id: "salon-invited", label: "Salon — Invited" },
  { id: "edition-9", label: "Edition of 9" },
  { id: "archive", label: "Archive" },
  { id: "bespoke-only", label: "Bespoke Only" },
];
