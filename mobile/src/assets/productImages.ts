import { ImageSourcePropType } from "react-native";

/**
 * Maps a Product.id (see src/data/products.ts) to its bundled photograph.
 * These are the house's real product photographs, copied from the production
 * storefront (rsn-one/apps/web/public/storefront/products/).
 *
 * Plate falls back to its gradient placeholder for any id with no entry here,
 * so a missing photo degrades quietly rather than breaking a screen.
 */
export const productImages: Partial<Record<string, ImageSourcePropType>> = {
  // Home & Living
  "jingdezhen-tea-service": require("../../assets/products/jingdezhen-tea-service.jpg"),
  "lambswool-throw-ecru": require("../../assets/products/lambswool-throw-ecru.jpg"),
  "cedar-vetiver-diffuser": require("../../assets/products/cedar-vetiver-diffuser.jpg"),
  "evening-candle-ritual": require("../../assets/products/evening-candle-ritual.jpg"),
  "hand-knotted-wool-runner": require("../../assets/products/hand-knotted-wool-runner.jpg"),
  "stoneware-dinner-service": require("../../assets/products/stoneware-dinner-service.jpg"),

  // Beauty & Care
  "seoul-skincare-edit": require("../../assets/products/seoul-skincare-edit.jpg"),
  "camellia-facial-oil": require("../../assets/products/camellia-facial-oil.jpg"),
  "beech-bristle-brush": require("../../assets/products/beech-bristle-brush.jpg"),
  "mulberry-silk-pillowcase": require("../../assets/products/mulberry-silk-pillowcase.jpg"),
  "rice-enzyme-cleansing-powder": require("../../assets/products/rice-enzyme-cleansing-powder.jpg"),

  // Mom & Baby
  "muslin-swaddle-set": require("../../assets/products/muslin-swaddle-set.jpg"),
  "beechwood-rattle-set": require("../../assets/products/beechwood-rattle-set.jpg"),
  "merino-first-blanket": require("../../assets/products/merino-first-blanket.jpg"),
  "bamboo-feeding-set": require("../../assets/products/bamboo-feeding-set.jpg"),
  "organic-sleep-suits": require("../../assets/products/organic-sleep-suits.jpg"),

  // Food & Beverage
  "ilam-first-flush": require("../../assets/products/ilam-first-flush.jpg"),
  "jasmine-rice-new-crop": require("../../assets/products/jasmine-rice-new-crop.jpg"),
  "kandy-spice-index": require("../../assets/products/kandy-spice-index.jpg"),
  "himalayan-wildflower-honey": require("../../assets/products/himalayan-wildflower-honey.jpg"),
  "ceylon-breakfast-tin": require("../../assets/products/ceylon-breakfast-tin.jpg"),

  // Fashion & Bags
  "suzhou-silk-scarf": require("../../assets/products/suzhou-silk-scarf.jpg"),
  "bridle-leather-crossbody": require("../../assets/products/bridle-leather-crossbody.jpg"),
  "cashmere-travel-wrap": require("../../assets/products/cashmere-travel-wrap.jpg"),
  "pebbled-card-wallet": require("../../assets/products/pebbled-card-wallet.jpg"),
  "cashmere-beanie": require("../../assets/products/cashmere-beanie.jpg"),

  // Electronics
  "stone-temperature-kettle": require("../../assets/products/stone-temperature-kettle.jpg"),
  "cordless-brass-lamp": require("../../assets/products/cordless-brass-lamp.jpg"),
  "quiet-tower-purifier": require("../../assets/products/quiet-tower-purifier.jpg"),
  "sunrise-alarm-clock": require("../../assets/products/sunrise-alarm-clock.jpg"),
  "quiet-stone-humidifier": require("../../assets/products/quiet-stone-humidifier.jpg"),
};
