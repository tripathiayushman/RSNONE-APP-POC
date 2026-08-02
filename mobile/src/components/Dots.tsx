import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import * as tokens from "../theme/tokens";

export type DotsProps = {
  count: number;
  activeIndex: number;
  style?: ViewStyle;
};

/** Row of tiny pager dots. */
export function Dots({ count, activeIndex, style }: DotsProps) {
  return (
    <View style={[styles.row, style]}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={[styles.dot, i === activeIndex ? styles.dotOn : undefined]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 5,
    height: 5,
    borderWidth: 1,
    borderColor: tokens.colors.creamDim,
  },
  dotOn: {
    backgroundColor: tokens.colors.brass,
    borderColor: tokens.colors.brass,
  },
});
