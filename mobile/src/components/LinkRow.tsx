import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import * as tokens from "../theme/tokens";

export type LinkRowTagVariant = "brass" | "quiet" | "rose";

export type LinkRowTag = {
  label: string;
  variant: LinkRowTagVariant;
};

export type LinkRowProps = {
  label: string;
  value?: string;
  number?: string;
  tag?: LinkRowTag;
  onPress?: () => void;
  style?: ViewStyle;
};

const TAG_COLOR: Record<LinkRowTagVariant, string> = {
  brass: tokens.colors.brass,
  quiet: tokens.colors.creamDim,
  rose: tokens.colors.roseGlow,
};

/** Settings / account navigation row, matching `.linkrow`. */
export function LinkRow({ label, value, number, tag, onPress, style }: LinkRowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.row, style, pressed && onPress ? styles.pressed : undefined]}
    >
      {number ? <Text style={styles.num}>{number}</Text> : null}
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
      {value ? (
        <Text style={styles.value} numberOfLines={1}>
          {value}
        </Text>
      ) : null}
      {tag ? (
        <View style={[styles.tagBox, { borderColor: TAG_COLOR[tag.variant] }]}>
          <Text style={[styles.tagText, { color: TAG_COLOR[tag.variant] }]}>{tag.label}</Text>
        </View>
      ) : null}
      {onPress ? <Text style={styles.chev}>{"›"}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 19,
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
  label: {
    flex: 1,
    fontFamily: tokens.fonts.bodyRegular,
    fontSize: 16,
    color: tokens.colors.cream,
  },
  value: {
    fontFamily: tokens.fonts.bodyRegularItalic,
    fontSize: 13,
    color: tokens.colors.creamDim,
  },
  chev: {
    color: tokens.colors.creamDim,
    fontSize: 14,
  },
  tagBox: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    fontFamily: tokens.fonts.bodyRegular,
    fontSize: 9,
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
});
