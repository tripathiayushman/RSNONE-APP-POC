import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/tokens";

/**
 * The house icon set. Every icon in the app comes from here.
 *
 * The mockups used bare Unicode glyphs (⚲ ♡ ⊞ ☰ ⊜ ▾), which render
 * inconsistently across Android OEM fonts and tofu outright on some devices.
 * Feather is a hairline set that matches the app's 1px rules and thin serifs,
 * and it ships with Expo — no extra native dependency. The one filled icon
 * (a saved heart) comes from Ionicons, since Feather is outline-only.
 */
export type IconName =
  | "search"
  | "heart"
  | "heart-filled"
  | "grid"
  | "list"
  | "filter"
  | "back"
  | "forward"
  | "close"
  | "plus"
  | "minus"
  | "check"
  | "chevron-down"
  | "chevron-right"
  | "bag"
  | "user"
  | "registry"
  | "archive"
  | "share"
  | "copy"
  | "wallet"
  | "gift"
  | "lock"
  | "mail";

const FEATHER: Partial<Record<IconName, React.ComponentProps<typeof Feather>["name"]>> = {
  search: "search",
  heart: "heart",
  grid: "grid",
  list: "list",
  filter: "sliders",
  back: "arrow-left",
  forward: "arrow-right",
  close: "x",
  plus: "plus",
  minus: "minus",
  check: "check",
  "chevron-down": "chevron-down",
  "chevron-right": "chevron-right",
  bag: "shopping-bag",
  user: "user",
  registry: "book-open",
  archive: "grid",
  share: "share-2",
  copy: "copy",
  wallet: "credit-card",
  gift: "gift",
  lock: "lock",
  mail: "mail",
};

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export function Icon({ name, size = 18, color = colors.creamDim, style }: IconProps) {
  if (name === "heart-filled") {
    return <Ionicons name="heart" size={size} color={color} style={style} />;
  }
  return <Feather name={FEATHER[name] ?? "circle"} size={size} color={color} style={style} />;
}
