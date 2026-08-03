import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { LotRow } from "../components/LotRow";
import { Icon } from "../components/Icon";
import { editorialImages } from "../assets/editorialImages";
import { categories, countByCategory, products } from "../data/products";
import { useShelf } from "../state/AppState";
import { colors, fonts, type } from "../theme/tokens";

const NUMERALS = ["I", "II", "III", "IV", "V", "VI"];

/** The six rooms in list form — same source of truth as ArchiveGrid. */
const ROOMS = categories.map((c, i) => ({
  number: NUMERALS[i] ?? String(i + 1),
  slug: c.slug,
  name: c.name,
  description: `${c.subtitle} — ${countByCategory(c.name)} pieces`,
}));

export default function ArchiveList({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "ArchiveList">) {
  const shelf = useShelf();

  function handleNavigate(key: BottomNavKey) {
    if (key === "Registry") navigation.navigate("Home");
    if (key === "Archive") return;
    if (key === "Bag") navigation.navigate("Bag");
    if (key === "Account") navigation.navigate("Account");
  }

  return (
    <Screen edges={["top"]}>
      <TopBar
        icons={[
          { icon: "search", onPress: () => navigation.navigate("Search") },
          { icon: "heart", active: shelf.items.length > 0, onPress: () => navigation.navigate("Shelf") },
        ]}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.eyebrow}>The Archive</Text>
        <View style={styles.hero}>
          <Text style={styles.h1}>
            Six rooms, every{"\n"}piece catalogued.
          </Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{products.length} pieces in the archive</Text>
          <View style={styles.toggleRow}>
            <Pressable onPress={() => navigation.navigate("ArchiveGrid")} hitSlop={8}>
              <Icon name="grid" size={17} />
            </Pressable>
            <Icon name="list" size={17} color={colors.brass} />
          </View>
        </View>

        <View style={styles.catalogue}>
          {ROOMS.map((room) => (
            <LotRow
              key={room.slug}
              number={room.number}
              thumb
              source={editorialImages[`category:${room.slug}`]}
              name={room.name}
              meta={room.description}
              onPress={() => navigation.navigate("Listing", { category: room.name })}
              rightSlot={<Icon name="chevron-right" size={16} />}
            />
          ))}
        </View>
      </ScrollView>
      <BottomNav active="Archive" onNavigate={handleNavigate} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 20 },
  eyebrow: { ...type.eyebrow, paddingTop: 28, paddingHorizontal: 24 },
  hero: { paddingTop: 14, paddingHorizontal: 24, paddingBottom: 24 },
  h1: {
    fontFamily: fonts.displayLight,
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: 0.3,
    color: colors.cream,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  metaText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    color: colors.creamDim,
  },
  toggleRow: { flexDirection: "row", gap: 14 },
  catalogue: { paddingHorizontal: 24 },
});
