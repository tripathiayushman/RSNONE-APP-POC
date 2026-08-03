import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { ProductCard } from "../components/ProductCard";
import { Chip } from "../components/Chip";
import { products, Product } from "../data/products";
import { availabilityFilters, originFilters } from "../data/filters";
import * as tokens from "../theme/tokens";

type ListingProps = NativeStackScreenProps<RootStackParamList, "Listing">;

const SORT_OPTIONS = ["Latest", "Price: Low", "Price: High"] as const;

// Default active refinements — mirrors the mockup's "Refine · 2" starting state.
// Labels must match the chips in data/filters.ts, so take them from there.
const DEFAULT_FILTERS = [originFilters[0].label, availabilityFilters[0].label];

const PAGE_SIZE = 6;

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

/** 3.09 · Listing — the product grid for a single Archive category. */
export default function Listing({ navigation, route }: ListingProps) {
  const category = route.params?.category;
  const [activeFilters, setActiveFilters] = useState<string[]>(DEFAULT_FILTERS);
  const [sortIndex, setSortIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const baseList = useMemo(() => {
    const matched = category ? products.filter((p) => p.category === category) : products;
    return matched.length > 0 ? matched : products;
  }, [category]);

  const sortedList = useMemo(() => {
    const list = [...baseList];
    if (sortIndex === 1) list.sort((a, b) => a.priceValue - b.priceValue);
    if (sortIndex === 2) list.sort((a, b) => b.priceValue - a.priceValue);
    return list;
  }, [baseList, sortIndex]);

  const visible = showAll ? sortedList : sortedList.slice(0, PAGE_SIZE);
  const remaining = sortedList.length - visible.length;

  const title = category ?? "The Archive";

  function removeFilter(label: string) {
    setActiveFilters((prev) => prev.filter((f) => f !== label));
  }

  function cycleSort() {
    setSortIndex((i) => (i + 1) % SORT_OPTIONS.length);
  }

  function handleNav(key: BottomNavKey) {
    if (key === "Registry") navigation.navigate("Home");
    else if (key === "Archive") navigation.navigate("ArchiveGrid");
    else if (key === "Bag") navigation.navigate("Bag");
    else navigation.navigate("Account");
  }

  return (
    <Screen edges={["top"]}>
      <TopBar
        variant="sub"
        title={title}
        onBack={() => navigation.goBack()}
        rightLabel="♡"
        onRightPress={() => navigation.navigate("Shelf")}
      />
      <ScrollView style={styles.flex} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>The Registry · 2026</Text>
        <View style={styles.hero}>
          <Text style={tokens.type.displayMd}>{title}</Text>
          <Text style={[tokens.type.sub, styles.heroSub]}>
            {sortedList.length} {sortedList.length === 1 ? "piece" : "pieces"}, each bought at origin.
          </Text>
        </View>

        <View style={styles.chiprow}>
          <Chip label={`⊜ Refine · ${activeFilters.length}`} onPress={() => navigation.navigate("FilterSheet")} />
          {activeFilters.map((label) => (
            <Chip
              key={label}
              label={label}
              active
              onPress={() => navigation.navigate("FilterSheet")}
              onRemove={() => removeFilter(label)}
            />
          ))}
          <Chip label={`Sort — ${SORT_OPTIONS[sortIndex]} ▾`} onPress={cycleSort} />
        </View>

        <View style={styles.grid}>
          {chunk(visible, 2).map((row, rowIndex) => (
            <View key={rowIndex} style={styles.gridRow}>
              {row.map((product: Product, cellIndex) => {
                const index = rowIndex * 2 + cellIndex;
                return (
                  <ProductCard
                    key={product.id}
                    productId={product.id}
                    name={product.name}
                    meta={product.meta}
                    price={product.price}
                    lotTag={`Lot ${String(index + 1).padStart(2, "0")}`}
                    onPress={() => navigation.navigate("ProductDetail", { productId: product.id })}
                    style={styles.gridCell}
                  />
                );
              })}
              {row.length === 1 ? <View style={styles.gridCell} /> : null}
            </View>
          ))}
        </View>

        {remaining > 0 ? (
          <View style={styles.tcenter}>
            <Pressable onPress={() => setShowAll(true)} hitSlop={8}>
              <Text style={styles.showMore}>Show the remaining {remaining}</Text>
            </Pressable>
          </View>
        ) : null}
      </ScrollView>
      <BottomNav active="Archive" onNavigate={handleNav} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContent: { paddingBottom: 24 },
  eyebrow: {
    ...tokens.type.eyebrow,
    paddingTop: 22,
    paddingHorizontal: 24,
  },
  hero: {
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 18,
  },
  heroSub: {
    marginTop: 8,
  },
  chiprow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingHorizontal: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.hairline,
  },
  grid: {
    paddingHorizontal: 24,
    paddingTop: 26,
  },
  gridRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 26,
  },
  gridCell: {
    flex: 1,
  },
  tcenter: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  showMore: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: tokens.colors.brass,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.brass,
    paddingBottom: 3,
  },
});
