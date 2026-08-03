import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { SearchBar } from "../components/SearchBar";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { PullQuote } from "../components/PullQuote";
import { Chip } from "../components/Chip";
import { Button } from "../components/Button";
import * as tokens from "../theme/tokens";

type SearchEmptyProps = NativeStackScreenProps<RootStackParamList, "SearchEmpty">;

const BROWSE_CATEGORIES: { label: string; category: string }[] = [
  { label: "Home & Living", category: "Home & Living" },
  { label: "Food & Beverage", category: "Food & Beverage" },
  { label: "Fashion & Bags", category: "Fashion & Bags" },
];

/**
 * 3.12 · Search — No Results. Its own directly-navigable route with the designed
 * empty message and a CTA back to browsing. Search.tsx renders this same content
 * inline for its no-match / empty-query state — small, expected duplication.
 */
export default function SearchEmpty({ navigation }: SearchEmptyProps) {
  const [query, setQuery] = useState("");

  function handleNav(key: BottomNavKey) {
    if (key === "Registry") navigation.navigate("Home");
    else if (key === "Archive") navigation.navigate("ArchiveGrid");
    else if (key === "Bag") navigation.navigate("Bag");
    else navigation.navigate("Account");
  }

  return (
    <Screen edges={["top"]}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onCancel={() => navigation.goBack()}
        placeholder="Search the registry…"
      />

      <View style={styles.grow}>
        <PullQuote quote={"The archive holds\nno record of it."} attribution="— The Registrar" />
        <View style={styles.noteWrap}>
          <Text style={styles.note}>
            Nothing answers to it here. You might consult the rooms instead, or write to the
            concierge — requests have opened rooms before.
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

      <BottomNav active="Archive" onNavigate={handleNav} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: {
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
