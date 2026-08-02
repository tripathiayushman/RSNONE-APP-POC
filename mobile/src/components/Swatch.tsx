import React from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as tokens from "../theme/tokens";

export type SwatchColorKey = "walnut" | "oxblood" | "noir" | "saddle";

export type SwatchOption = {
  id: string;
  colorKey: SwatchColorKey;
};

export type SwatchProps = {
  options: SwatchOption[];
  value: string;
  onChange: (id: string) => void;
  style?: ViewStyle;
};

const SWATCH_GRADIENTS: Record<SwatchColorKey, readonly [string, string]> = {
  walnut: ["#4a3025", "#241511"],
  oxblood: ["#5c2620", "#2a100d"],
  noir: ["#2a2422", "#0c0908"],
  saddle: ["#6b4a2e", "#33200f"],
};

/** Row of finish-color swatches, active one gets a brass outline offset. */
export function Swatch({ options, value, onChange, style }: SwatchProps) {
  return (
    <View style={[styles.row, style]}>
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <Pressable
            key={opt.id}
            onPress={() => onChange(opt.id)}
            style={[styles.wrapper, active ? styles.wrapperActive : undefined]}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <LinearGradient
              colors={SWATCH_GRADIENTS[opt.colorKey]}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 0.8, y: 1 }}
              style={styles.sw}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 14,
  },
  wrapper: {
    padding: 3,
    borderWidth: 1,
    borderColor: "transparent",
  },
  wrapperActive: {
    borderColor: tokens.colors.brass,
  },
  sw: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: tokens.colors.hairline,
  },
});
