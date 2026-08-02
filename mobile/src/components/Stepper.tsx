import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as tokens from "../theme/tokens";

export type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  style?: ViewStyle;
};

/** Minus / count / plus quantity stepper, matching `.qty`. */
export function Stepper({ value, onChange, min = 1, max = 99, style }: StepperProps) {
  const canDec = value > min;
  const canInc = value < max;

  return (
    <View style={[styles.qty, style]}>
      <LinearGradient
        colors={tokens.gradients.chip.colors}
        start={tokens.gradients.chip.start}
        end={tokens.gradients.chip.end}
        style={StyleSheet.absoluteFill}
      />
      <Pressable
        onPress={() => canDec && onChange(value - 1)}
        disabled={!canDec}
        style={styles.cellFirst}
        hitSlop={4}
      >
        <Text style={[styles.op, !canDec ? styles.opDisabled : undefined]}>{"−"}</Text>
      </Pressable>
      <View style={styles.cell}>
        <Text style={styles.count}>{value}</Text>
      </View>
      <Pressable
        onPress={() => canInc && onChange(value + 1)}
        disabled={!canInc}
        style={styles.cell}
        hitSlop={4}
      >
        <Text style={[styles.op, !canInc ? styles.opDisabled : undefined]}>{"+"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  qty: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: tokens.colors.hairline,
    alignSelf: "flex-start",
    overflow: "hidden",
  },
  cellFirst: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  cell: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderLeftColor: tokens.colors.hairline,
  },
  op: {
    fontFamily: tokens.fonts.bodyRegular,
    fontSize: 14,
    color: tokens.colors.creamDim,
  },
  opDisabled: {
    opacity: 0.35,
  },
  count: {
    fontFamily: tokens.fonts.bodyRegular,
    fontSize: 14,
    color: tokens.colors.cream,
  },
});
