import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as tokens from "../theme/tokens";

export type ChipProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
  onRemove?: () => void;
  style?: ViewStyle;
};

/** Small uppercase square chip used in refine sheets / filter rows. */
export function Chip({ label, active, onPress, onRemove, style }: ChipProps) {
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={style}>
      <View style={[styles.chip, active ? styles.chipActive : undefined]}>
        <LinearGradient
          colors={tokens.gradients.chip.colors}
          start={tokens.gradients.chip.start}
          end={tokens.gradients.chip.end}
          style={StyleSheet.absoluteFill}
        />
        <Text style={[styles.label, active ? styles.labelActive : undefined]}>{label}</Text>
        {onRemove ? (
          <Pressable onPress={onRemove} hitSlop={8} style={styles.remove}>
            <Text style={[styles.removeGlyph, active ? styles.labelActive : undefined]}>{"×"}</Text>
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: tokens.colors.hairline,
    paddingHorizontal: 12,
    paddingVertical: 8,
    overflow: "hidden",
  },
  chipActive: {
    borderColor: tokens.colors.brass,
  },
  label: {
    fontFamily: tokens.fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: tokens.colors.creamDim,
  },
  labelActive: {
    color: tokens.colors.brass,
  },
  remove: {
    marginLeft: 8,
  },
  removeGlyph: {
    fontSize: 12,
    color: tokens.colors.creamDim,
  },
});
