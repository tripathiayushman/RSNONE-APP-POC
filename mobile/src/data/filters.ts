export type FilterChip = {
  id: string;
  label: string;
};

/**
 * Origin chips for the Refine sheet. The house sources at origin, so where a
 * piece was made is the facet members actually filter on — these mirror the
 * countries represented in the catalogue.
 */
export const originFilters: FilterChip[] = [
  { id: "np", label: "Nepal" },
  { id: "cn", label: "China" },
  { id: "kr", label: "Korea" },
  { id: "th", label: "Thailand" },
  { id: "lk", label: "Sri Lanka" },
  { id: "gb", label: "United Kingdom" },
  { id: "ae", label: "UAE" },
];

/** Default handle positions (percent along the rail) for the price range control. */
export const priceRangeDefault: { lowPercent: number; highPercent: number } = {
  lowPercent: 18,
  highPercent: 70,
};

/** Availability / standing chips for the Refine sheet. */
export const availabilityFilters: FilterChip[] = [
  { id: "in-stock", label: "In Stock" },
  { id: "low-stock", label: "Low Stock" },
  { id: "members-only", label: "Members Only" },
  { id: "newly-admitted", label: "Newly Admitted" },
  { id: "best-sellers", label: "Best Sellers" },
  { id: "rsn-tested", label: "RSN Tested" },
];
