import { ImageSourcePropType } from "react-native";

/**
 * Non-product editorial photography and the six room tiles. All copied from
 * the production storefront (rsn-one/apps/web/public/storefront/), so the POC
 * shows the house's own art direction rather than stand-ins.
 *
 * Keyed by a plain string so screens can compose keys like
 * `category:${categorySlug}`. Plate falls back to its gradient placeholder for
 * any key with no entry here.
 */
export const editorialImages: Partial<Record<string, ImageSourcePropType>> = {
  // The six rooms — keyed by category slug (see products.ts `categories`).
  "category:home-living": require("../../assets/editorial/category-home-living.jpg"),
  "category:beauty-care": require("../../assets/editorial/category-beauty-care.jpg"),
  "category:mom-baby": require("../../assets/editorial/category-mom-baby.jpg"),
  "category:food-beverage": require("../../assets/editorial/category-food-beverage.jpg"),
  "category:fashion-bags": require("../../assets/editorial/category-fashion-bags.jpg"),
  "category:electronics": require("../../assets/editorial/category-electronics.jpg"),

  // Atmosphere / editorial
  "home-hero": require("../../assets/editorial/home-hero.jpg"),
  provenance: require("../../assets/editorial/provenance.jpg"),
  "corridor-globe": require("../../assets/editorial/corridor-globe.jpg"),
  "membership-hero": require("../../assets/editorial/membership-hero.jpg"),
  concierge: require("../../assets/editorial/concierge.jpg"),

  // The three house standards
  "standard-origin": require("../../assets/editorial/standard-origin.jpg"),
  "standard-priced": require("../../assets/editorial/standard-priced.jpg"),
  "standard-sealed": require("../../assets/editorial/standard-sealed.jpg"),
};

/** The house wordmark — cream + rose-gold on transparent, built for dark UI. */
export const brandLogo: ImageSourcePropType = require("../../assets/brand/rsn-one-logo.png");

/** Natural aspect ratio of the wordmark (1122 × 515), for sizing by width. */
export const BRAND_LOGO_ASPECT = 1122 / 515;
