import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { Chip } from "../components/Chip";
import { RangeSlider } from "../components/RangeSlider";
import { Button } from "../components/Button";
import { originFilters, availabilityFilters, priceRangeDefault } from "../data/filters";
import { formatNpr, products } from "../data/products";
import * as tokens from "../theme/tokens";

type FilterSheetProps = NativeStackScreenProps<RootStackParamList, "FilterSheet">;

// Default selection mirrors Listing's starting "Refine · 2" chips (Nepal / In Stock).
const DEFAULT_ORIGINS = ["np"];
const DEFAULT_AVAILABILITY = ["in-stock"];

/**
 * 3.10 · Refine — Filter Sheet. A MODAL: a dark scrim over whatever screen is behind it
 * (Listing), with a bottom sheet panel floating above it. Deliberately not wrapped in
 * <Screen> — the navigator is expected to present this route as a transparent overlay.
 */
export default function FilterSheet({ navigation }: FilterSheetProps) {
  const insets = useSafeAreaInsets();
  const [origins, setOrigins] = useState<Set<string>>(new Set(DEFAULT_ORIGINS));
  const [availability, setAvailability] = useState<Set<string>>(new Set(DEFAULT_AVAILABILITY));

  const minPrice = useMemo(() => Math.min(...products.map((p) => p.priceValue)), []);
  const maxPrice = useMemo(() => Math.max(...products.map((p) => p.priceValue)), []);

  // Decorative result count — the sheet doesn't apply its selection to the
  // Listing in this POC, so this is a plausible figure that moves with the chips.
  const resultCount = useMemo(() => {
    const activeCount = origins.size + availability.size;
    return Math.max(1, products.length - activeCount * 2);
  }, [origins, availability]);

  function toggle(set: Set<string>, setSet: (next: Set<string>) => void, id: string) {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSet(next);
  }

  function clearAll() {
    setOrigins(new Set());
    setAvailability(new Set());
  }

  return (
    <View style={styles.root}>
      <Pressable
        style={styles.scrim}
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
        accessibilityLabel="Dismiss filters"
      />
      <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 20) + 14 }]}>
        <LinearGradient
          colors={tokens.gradients.sheet.colors}
          start={tokens.gradients.sheet.start}
          end={tokens.gradients.sheet.end}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.grab} />
        <View style={styles.headRow}>
          <Text style={styles.h3}>Refine</Text>
          <Pressable onPress={clearAll} hitSlop={8}>
            <Text style={styles.clearAll}>Clear All</Text>
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <Text style={[styles.groupLbl, styles.groupLblFirst]}>Price</Text>
          <RangeSlider lowPercent={priceRangeDefault.lowPercent} highPercent={priceRangeDefault.highPercent} />
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>{formatNpr(minPrice)}</Text>
            <Text style={styles.priceLabel}>{formatNpr(maxPrice)}</Text>
          </View>

          <Text style={styles.groupLbl}>Origin</Text>
          <View style={styles.chipWrap}>
            {originFilters.map((f) => (
              <Chip
                key={f.id}
                label={f.label}
                active={origins.has(f.id)}
                onPress={() => toggle(origins, setOrigins, f.id)}
              />
            ))}
          </View>

          <Text style={styles.groupLbl}>Availability</Text>
          <View style={styles.chipWrap}>
            {availabilityFilters.map((f) => (
              <Chip
                key={f.id}
                label={f.label}
                active={availability.has(f.id)}
                onPress={() => toggle(availability, setAvailability, f.id)}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.actions}>
          <Button label="Close" variant="ghost" onPress={() => navigation.goBack()} style={styles.closeBtn} />
          <Button
            label={`Show ${resultCount} Pieces`}
            variant="primary"
            onPress={() => navigation.goBack()}
            style={styles.applyBtn}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(10,5,3,0.68)",
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: "82%",
    borderTopWidth: 1,
    borderTopColor: tokens.colors.brass,
    paddingHorizontal: 24,
    paddingTop: 10,
    // Solid bg under the opaque sheet gradient so iOS can use a fast shadow path.
    backgroundColor: "#26160f",
    ...tokens.shadows.sheet,
  },
  grab: {
    width: 26,
    height: 2,
    backgroundColor: tokens.colors.brass,
    opacity: 0.8,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 22,
  },
  headRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 4,
  },
  h3: {
    fontFamily: tokens.fonts.displayRegular,
    fontSize: 24,
    color: tokens.colors.cream,
  },
  clearAll: {
    fontFamily: tokens.fonts.bodyRegular,
    fontSize: 11,
    letterSpacing: 1.1,
    textTransform: "uppercase",
    color: tokens.colors.creamDim,
  },
  groupLbl: {
    ...tokens.type.eyebrow,
    paddingTop: 26,
    paddingBottom: 8,
  },
  groupLblFirst: {
    paddingTop: 22,
    paddingBottom: 2,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -6,
  },
  priceLabel: {
    fontFamily: tokens.fonts.bodyRegularItalic,
    fontSize: 13,
    color: tokens.colors.creamDim,
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 26,
  },
  closeBtn: {
    flex: 1,
  },
  applyBtn: {
    flex: 2,
  },
});
