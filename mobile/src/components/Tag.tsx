import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import * as tokens from "../theme/tokens";

export type TagVariant = "default" | "brass" | "rose";

export type TagProps = {
  label: string;
  variant?: TagVariant;
  style?: ViewStyle;
};

const BORDER: Record<TagVariant, string> = {
  default: tokens.colors.hairline,
  brass: tokens.colors.brass,
  rose: tokens.colors.roseDeep,
};

const TEXT: Record<TagVariant, string> = {
  default: tokens.colors.creamDim,
  brass: tokens.colors.brass,
  rose: tokens.colors.roseGlow,
};

/** Tiny uppercase square-bordered label. */
export function Tag({ label, variant = "default", style }: TagProps) {
  return (
    <View style={[styles.tag, { borderColor: BORDER[variant] }, style]}>
      <Text style={[styles.label, { color: TEXT[variant] }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignSelf: "flex-start",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  label: {
    fontFamily: tokens.fonts.bodyRegular,
    fontSize: 9,
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
});
