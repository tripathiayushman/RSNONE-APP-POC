import { ImageSourcePropType } from "react-native";

/**
 * Non-product editorial/atmosphere photos and the six archive "room" tiles
 * (see IMAGE-BRIEF.md at the repo root for the full manifest/specs).
 * Empty until real photography/renders exist — Plate falls back to its
 * gradient placeholder for any key with no entry here.
 *
 * To wire in a generated image:
 *   1. Save the file to mobile/assets/editorial/<key>.jpg
 *   2. Add one line below: "<key>": require("../../assets/editorial/<key>.jpg"),
 */
export const editorialImages: Partial<Record<string, ImageSourcePropType>> = {
  // "onboarding-reading-room": require("../../assets/editorial/onboarding-reading-room.jpg"),
};
