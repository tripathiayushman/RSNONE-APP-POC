import { ImageSourcePropType } from "react-native";

/**
 * Maps a Product.id (see src/data/products.ts) to a bundled photo.
 * Empty until real photography/renders exist — Plate falls back to its
 * gradient placeholder for any id with no entry here.
 *
 * To wire in a generated image:
 *   1. Save the file to mobile/assets/products/<id>.jpg (see
 *      IMAGE-BRIEF.md at the repo root for the full manifest/specs).
 *   2. Add one line below: "<id>": require("../../assets/products/<id>.jpg"),
 * That's the only code change needed — ProductCard, LotRow, and
 * ProductDetail already pass productId through to Plate's `source` prop.
 */
export const productImages: Partial<Record<string, ImageSourcePropType>> = {
  // "bordeaux-tote": require("../../assets/products/bordeaux-tote.jpg"),
};
