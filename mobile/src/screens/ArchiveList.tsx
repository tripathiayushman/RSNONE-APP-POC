import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { LotRow } from "../components/LotRow";
import { editorialImages } from "../assets/editorialImages";
import { useShelf } from "../state/AppState";
import { colors, fonts, type } from "../theme/tokens";

/** The six rooms of the house archive, in list form — same content as ArchiveGrid. */
const ROOMS: { number: string; name: string; description: string }[] = [
  { number: "I", name: "Jewelry", description: "Signets, chains, and stones — 24 pieces" },
  { number: "II", name: "Leather Goods", description: "Cut, stitched, and burnished — 31 pieces" },
  { number: "III", name: "Ready-to-Wear", description: "Cloth of the great mills — 18 pieces" },
  { number: "IV", name: "Fragrance", description: "Extraits, poured by hand — 9 pieces" },
  { number: "V", name: "Timepieces", description: "Swiss lever escapements — 12 pieces" },
  { number: "VI", name: "Objects of the House", description: "For desk, bar, and shelf — 14 pieces" },
];

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
          { glyph: "⚲", onPress: () => navigation.navigate("Search") },
          { glyph: "♡", active: shelf.items.length > 0, onPress: () => navigation.navigate("Shelf") },
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
          <Text style={styles.metaText}>108 pieces in the archive</Text>
          <View style={styles.toggleRow}>
            <Pressable onPress={() => navigation.navigate("ArchiveGrid")} hitSlop={8}>
              <Text style={styles.toggleGlyph}>⊞</Text>
            </Pressable>
            <Text style={[styles.toggleGlyph, styles.toggleActive]}>☰</Text>
          </View>
        </View>

        <View style={styles.catalogue}>
          {ROOMS.map((room) => (
            <LotRow
              key={room.name}
              number={room.number}
              thumb
              source={editorialImages[`category:${room.name}`]}
              name={room.name}
              meta={room.description}
              onPress={() => navigation.navigate("Listing", { category: room.name })}
              rightSlot={<Text style={styles.chev}>→</Text>}
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
  toggleGlyph: { fontSize: 14, color: colors.creamDim },
  toggleActive: { color: colors.brass },
  catalogue: { paddingHorizontal: 24 },
  chev: { fontSize: 14, color: colors.creamDim },
});
