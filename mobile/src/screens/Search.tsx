import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { SearchBar } from "../components/SearchBar";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { LotRow } from "../components/LotRow";
import { PullQuote } from "../components/PullQuote";
import { Chip } from "../components/Chip";
import { Button } from "../components/Button";
import { products } from "../data/products";
import * as tokens from "../theme/tokens";

type SearchProps = NativeStackScreenProps<RootStackParamList, "Search">;

const BROWSE_CATEGORIES: { label: string; category: string }[] = [
  { label: "Home & Living", category: "Home & Living" },
  { label: "Food & Beverage", category: "Food & Beverage" },
  { label: "Fashion & Bags", category: "Fashion & Bags" },
];

const MAX_RESULTS = 8;

/**
 * 3.11 · Search. Per the flow spec: a query that matches a product name shows results
 * as LotRows; anything else — including an empty query — falls through to the same
 * empty-state content SearchEmpty.tsx renders (small, deliberate duplication).
 */
export default function Search({ navigation }: SearchProps) {
  const [query, setQuery] = useState("");
  const trimmed = query.trim();

  const results = useMemo(() => {
    if (!trimmed) return [];
    const q = trimmed.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.meta.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    ).slice(0, MAX_RESULTS);
  }, [trimmed]);

  const hasResults = results.length > 0;

  function handleNav(key: BottomNavKey) {
    if (key === "Registry") navigation.navigate("Home");
    else if (key === "Archive") navigation.navigate("ArchiveGrid");
    else if (key === "Bag") navigation.navigate("Bag");
    else navigation.navigate("Account");
  }

  return (
    <Screen edges={["top"]} keyboard>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onCancel={() => navigation.goBack()}
        placeholder="Search the registry…"
      />

      {hasResults ? (
        <View style={styles.flex}>
          <Text style={styles.groupLbl}>
            {results.length} Found
          </Text>
          <View style={styles.catalogue}>
            {results.map((product, index) => (
              <LotRow
                key={product.id}
                number={String(index + 1).padStart(2, "0")}
                productId={product.id}
                name={product.name}
                meta={product.meta}
                price={product.price}
                onPress={() => navigation.navigate("ProductDetail", { productId: product.id })}
              />
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.empty}>
          <PullQuote quote={"The archive holds\nno record of it."} attribution="— The Registrar" />
          <View style={styles.noteWrap}>
            <Text style={styles.note}>
              {trimmed
                ? `Nothing answers to "${trimmed}." You might consult the rooms instead, or write to the concierge — requests have opened rooms before.`
                : "The registry answers best to a name it knows. You might consult the rooms instead, or write to the concierge — requests have opened rooms before."}
            </Text>
          </View>
          <View style={styles.chipRow}>
            {BROWSE_CATEGORIES.map((c) => (
              <Chip
                key={c.category}
                label={c.label}
                onPress={() => navigation.navigate("Listing", { category: c.category })}
              />
            ))}
          </View>
          <View style={styles.ctaWrap}>
            <Button
              label="Write to the Concierge"
              variant="secondary"
              onPress={() => navigation.navigate("Correspondence")}
            />
          </View>
        </View>
      )}

      <BottomNav active="Archive" onNavigate={handleNav} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  groupLbl: {
    ...tokens.type.eyebrow,
    paddingTop: 26,
    paddingHorizontal: 24,
    paddingBottom: 6,
  },
  catalogue: {
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.hairline,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
  },
  noteWrap: {
    paddingHorizontal: 24,
    marginTop: -10,
  },
  note: {
    ...tokens.type.note,
    maxWidth: 280,
    alignSelf: "center",
    textAlign: "center",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    paddingTop: 26,
    paddingHorizontal: 24,
  },
  ctaWrap: {
    paddingTop: 30,
    paddingHorizontal: 60,
  },
});
