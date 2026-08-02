import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as tokens from "../theme/tokens";

export type ToggleProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: ViewStyle;
};

const KNOB_OFF_COLORS = ["#6b584a", "#463629"] as const;

/** 40x22 square-cornered toggle track with a sliding square knob. */
export function Toggle({ value, onValueChange, style }: ToggleProps) {
  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      style={[styles.track, value ? styles.trackOn : undefined, style]}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
    >
      <LinearGradient
        colors={value ? tokens.gradients.cta.colors : KNOB_OFF_COLORS}
        start={value ? tokens.gradients.cta.start : { x: 0.15, y: 0 }}
        end={value ? tokens.gradients.cta.end : { x: 0.85, y: 1 }}
        style={[styles.knob, value ? styles.knobOn : undefined]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 40,
    height: 22,
    borderWidth: 1,
    borderColor: tokens.colors.hairline,
    padding: 3,
    flexDirection: "row",
    flexShrink: 0,
  },
  trackOn: {
    borderColor: tokens.colors.brass,
  },
  knob: {
    width: 14,
    height: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 3,
  },
  knobOn: {
    marginLeft: "auto",
  },
});
