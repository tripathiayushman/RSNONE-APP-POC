import React from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as tokens from "../theme/tokens";

export type SelectControlProps = {
  value: boolean;
  onPress?: () => void;
  style?: ViewStyle;
};

/**
 * Shared 16x16 square control used by both Checkbox and Radio — the house style
 * draws every selection control as a square, "radio" is purely semantic here.
 */
function SquareControl({ value, onPress, style, role }: SelectControlProps & { role: "checkbox" | "radio" }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[styles.box, value ? styles.boxOn : undefined, style]}
      accessibilityRole={role}
      accessibilityState={{ checked: value, selected: value }}
    >
      {value ? (
        <LinearGradient
          colors={tokens.gradients.cta.colors}
          start={tokens.gradients.cta.start}
          end={tokens.gradients.cta.end}
          style={styles.inner}
        />
      ) : null}
    </Pressable>
  );
}

export function Checkbox(props: SelectControlProps) {
  return <SquareControl {...props} role="checkbox" />;
}

export function Radio(props: SelectControlProps) {
  return <SquareControl {...props} role="radio" />;
}

const styles = StyleSheet.create({
  box: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: tokens.colors.hairline,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  boxOn: {
    borderColor: tokens.colors.brass,
  },
  inner: {
    width: 8,
    height: 8,
  },
});
