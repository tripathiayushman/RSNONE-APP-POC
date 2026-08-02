import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { Plate } from "../components/Plate";
import { PullQuote } from "../components/PullQuote";
import { useShelf } from "../state/AppState";
import { colors, fonts, type } from "../theme/tokens";

/** The six rooms of the house archive, with their piece counts. */
const ROOMS: { name: string; count: number }[] = [
  { name: "Jewelry", count: 24 },
  { name: "Leather Goods", count: 31 },
  { name: "Ready-to-Wear", count: 18 },
  { name: "Fragrance", count: 9 },
  { name: "Timepieces", count: 12 },
  { name: "Objects of the House", count: 14 },
];

const TOTAL_PIECES = ROOMS.reduce((sum, room) => sum + room.count, 0);

export default function ArchiveGrid({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "ArchiveGrid">) {
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
          <Text style={styles.metaText}>{TOTAL_PIECES} pieces in the archive</Text>
          <View style={styles.toggleRow}>
            <Text style={[styles.toggleGlyph, styles.toggleActive]}>⊞</Text>
            <Pressable onPress={() => navigation.navigate("ArchiveList")} hitSlop={8}>
              <Text style={styles.toggleGlyph}>☰</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.grid}>
          {[0, 1, 2].map((rowIndex) => (
            <View key={rowIndex} style={styles.gridRow}>
              {ROOMS.slice(rowIndex * 2, rowIndex * 2 + 2).map((room) => (
                <Pressable
                  key={room.name}
                  style={styles.tile}
                  onPress={() => navigation.navigate("Listing", { category: room.name })}
                >
                  <Plate variant="card" plateNo={room.name} />
                  <Text style={styles.count}>{room.count}</Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>

        <PullQuote
          quote={"A room for everything,\nand everything in its room."}
          attribution="— The Registrar"
        />
      </ScrollView>
      <BottomNav active="Archive" onNavigate={handleNavigate} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 26 },
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
  grid: { paddingHorizontal: 24, paddingBottom: 14, gap: 14 },
  gridRow: { flexDirection: "row", gap: 14 },
  tile: { flex: 1, position: "relative" },
  count: {
    position: "absolute",
    top: 12,
    right: 12,
    fontFamily: fonts.displayRegular,
    fontSize: 12,
    color: colors.brass,
  },
});
