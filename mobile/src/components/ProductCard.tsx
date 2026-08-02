import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Plate } from "./Plate";
import * as tokens from "../theme/tokens";

export type ProductCardProps = {
  name: string;
  meta: string;
  price: string;
  lotTag?: string;
  plateNo?: string;
  onPress?: () => void;
  style?: ViewStyle;
};

/** Grid product card ("pcard") — used in the archive/listing two-column grids. */
export function ProductCard({ name, meta, price, lotTag, plateNo, onPress, style }: ProductCardProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.card, style, pressed && onPress ? styles.pressed : undefined]}
    >
      <Plate variant="card" tag={lotTag} plateNo={plateNo} style={styles.plate} />
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.meta} numberOfLines={1}>
        {meta}
      </Text>
      <Text style={styles.price}>{price}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  pressed: {
    opacity: 0.75,
  },
  plate: {
    width: "100%",
    aspectRatio: 3 / 4,
  },
  name: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 15,
    color: tokens.colors.cream,
    marginTop: 12,
  },
  meta: {
    fontFamily: tokens.fonts.bodyRegularItalic,
    fontSize: 12,
    color: tokens.colors.creamDim,
    marginTop: 3,
  },
  price: {
    fontFamily: tokens.fonts.bodyRegular,
    fontSize: 13,
    letterSpacing: 0.4,
    color: tokens.colors.brass,
    marginTop: 6,
  },
});
