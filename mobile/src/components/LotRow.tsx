import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Plate } from "./Plate";
import * as tokens from "../theme/tokens";

export type LotRowTagVariant = "brass" | "quiet" | "rose";

export type LotRowTag = {
  label: string;
  variant: LotRowTagVariant;
};

export type LotRowProps = {
  number: string;
  thumb?: boolean;
  name: string;
  meta: string;
  price?: string;
  tag?: LotRowTag;
  onPress?: () => void;
  rightSlot?: React.ReactNode;
  style?: ViewStyle;
};

const TAG_COLOR: Record<LotRowTagVariant, string> = {
  brass: tokens.colors.brass,
  quiet: tokens.colors.creamDim,
  rose: tokens.colors.roseGlow,
};

/**
 * The house-signature numbered row. Reused across catalogue, bag, wishlist and orders.
 */
export function LotRow({ number, thumb, name, meta, price, tag, onPress, rightSlot, style }: LotRowProps) {
  const showSide = !!rightSlot || !!price || !!tag;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.row, style, pressed && onPress ? styles.pressed : undefined]}
    >
      <Text style={styles.num}>{number}</Text>
      {thumb ? <Plate variant="thumb" /> : null}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {meta}
        </Text>
      </View>
      {showSide ? (
        <View style={styles.side}>
          {rightSlot ? (
            rightSlot
          ) : (
            <>
              {price ? <Text style={styles.price}>{price}</Text> : null}
              {tag ? (
                <View style={[styles.tagBox, { borderColor: TAG_COLOR[tag.variant] }]}>
                  <Text style={[styles.tagText, { color: TAG_COLOR[tag.variant] }]}>{tag.label}</Text>
                </View>
              ) : null}
            </>
          )}
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.hairline,
  },
  pressed: {
    opacity: 0.7,
  },
  num: {
    fontFamily: tokens.fonts.displayRegular,
    fontSize: 13,
    color: tokens.colors.brass,
    width: 28,
    flexShrink: 0,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 17,
    color: tokens.colors.cream,
    marginBottom: 4,
  },
  meta: {
    fontFamily: tokens.fonts.bodyRegularItalic,
    fontSize: 12,
    color: tokens.colors.creamDim,
  },
  side: {
    alignItems: "flex-end",
    gap: 8,
    flexShrink: 0,
  },
  price: {
    fontFamily: tokens.fonts.bodyRegular,
    fontSize: 14,
    letterSpacing: 0.4,
    color: tokens.colors.brass,
  },
  tagBox: {
    borderWidth: 1,
    borderColor: tokens.colors.hairline,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    fontFamily: tokens.fonts.bodyRegular,
    fontSize: 9,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: tokens.colors.creamDim,
  },
});
