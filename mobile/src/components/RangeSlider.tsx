import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as tokens from "../theme/tokens";

export type RangeSliderProps = {
  lowPercent: number;
  highPercent: number;
  style?: ViewStyle;
};

/** Decorative (non-interactive) range display, matching `.range`. */
export function RangeSlider({ lowPercent, highPercent, style }: RangeSliderProps) {
  return (
    <View style={[styles.range, style]}>
      <View style={styles.rail} />
      <LinearGradient
        colors={tokens.gradients.cta.colors}
        start={tokens.gradients.cta.start}
        end={tokens.gradients.cta.end}
        style={[styles.fill, { left: `${lowPercent}%`, right: `${100 - highPercent}%` }]}
      />
      <LinearGradient
        colors={tokens.gradients.cta.colors}
        start={tokens.gradients.cta.start}
        end={tokens.gradients.cta.end}
        style={[styles.handle, { left: `${lowPercent}%`, marginLeft: -6.5 }]}
      />
      <LinearGradient
        colors={tokens.gradients.cta.colors}
        start={tokens.gradients.cta.start}
        end={tokens.gradients.cta.end}
        style={[styles.handle, { left: `${highPercent}%`, marginLeft: -6.5 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  range: {
    position: "relative",
    height: 26,
    marginVertical: 18,
  },
  rail: {
    position: "absolute",
    top: 12,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: tokens.colors.hairline,
  },
  fill: {
    position: "absolute",
    top: 11.5,
    height: 2,
  },
  handle: {
    position: "absolute",
    top: 6,
    width: 13,
    height: 13,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
});
