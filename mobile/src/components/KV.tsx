import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import * as tokens from "../theme/tokens";

export type KVProps = {
  label: string;
  value: string;
  total?: boolean;
  style?: ViewStyle;
};

/** Key/value row for summaries (order totals, checkout review), matching `.kv`. */
export function KV({ label, value, total, style }: KVProps) {
  return (
    <View style={[styles.row, total ? styles.rowTotal : undefined, style]}>
      <Text style={[styles.k, total ? styles.kTotal : undefined]}>{label}</Text>
      <Text style={[styles.v, total ? styles.vTotal : undefined]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingVertical: 11,
  },
  rowTotal: {
    borderTopWidth: 1,
    borderTopColor: tokens.colors.hairline,
    marginTop: 8,
    paddingTop: 16,
  },
  k: {
    fontFamily: tokens.fonts.bodyRegularItalic,
    fontSize: 14,
    color: tokens.colors.creamDim,
  },
  kTotal: {
    fontFamily: tokens.fonts.bodyRegular,
    fontStyle: "normal",
    fontSize: 15,
    color: tokens.colors.cream,
  },
  v: {
    fontFamily: tokens.fonts.bodyRegular,
    fontSize: 14,
    letterSpacing: 0.3,
    color: tokens.colors.cream,
  },
  vTotal: {
    fontFamily: tokens.fonts.displayRegular,
    fontSize: 20,
    color: tokens.colors.brass,
  },
});
