import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { Plate } from "../components/Plate";
import { SectionHeader } from "../components/SectionHeader";
import { LotRow } from "../components/LotRow";
import { PullQuote } from "../components/PullQuote";
import { getProductById } from "../data/products";
import { useShelf } from "../state/AppState";
import { colors, fonts, type } from "../theme/tokens";

/** Curated "Recently Acquired" picks for the Registry home. */
const RECENTLY_ACQUIRED_IDS = ["bordeaux-tote", "signet-yellow", "corsair-weekender"];

/** The four rooms surfaced on the home page — a subset of the full six-room Archive. */
const FEATURED_ROOMS = ["Jewelry", "Leather Goods", "Ready-to-Wear", "Fragrance"];

export default function Home({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Home">) {
  const shelf = useShelf();

  function handleNavigate(key: BottomNavKey) {
    if (key === "Registry") return;
    if (key === "Archive") navigation.navigate("ArchiveGrid");
    if (key === "Bag") navigation.navigate("Bag");
    if (key === "Account") navigation.navigate("Account");
  }

  const recentlyAcquired = RECENTLY_ACQUIRED_IDS.map((id) => getProductById(id)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );

  return (
    <Screen edges={["top"]}>
      <TopBar
        icons={[
          { glyph: "⚲", onPress: () => navigation.navigate("Search") },
          { glyph: "♡", active: shelf.items.length > 0, onPress: () => navigation.navigate("Shelf") },
          { glyph: "⊞", onPress: () => navigation.navigate("ArchiveGrid") },
        ]}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.eyebrow}>The Autumn Registry</Text>
        <View style={styles.hero}>
          <Text style={styles.h1}>
            Objects worth{"\n"}keeping.
          </Text>
          <Text style={[type.sub, styles.subWide]}>
            A private catalogue of heritage leather, gold, and cloth — chosen, not manufactured.
          </Text>
        </View>

        <Pressable onPress={() => navigation.navigate("ArchiveGrid")}>
          <Plate variant="hero" plateNo="Plate No. 014" ctaLine="Enter Collection" />
        </Pressable>

        <SectionHeader
          title="Recently Acquired"
          actionLabel="View All"
          onAction={() => navigation.navigate("ArchiveGrid")}
        />
        <View style={styles.catalogue}>
          {recentlyAcquired.map((product, index) => (
            <LotRow
              key={product.id}
              number={String(index + 1).padStart(2, "0")}
              thumb
              name={product.name}
              meta={product.meta}
              price={product.price}
              onPress={() => navigation.navigate("ProductDetail", { productId: product.id })}
            />
          ))}
        </View>

        <PullQuote quote="Buy the best and you only cry once." attribution="— House Philosophy" />

        <SectionHeader title="The Archive" actionLabel="Browse" tight onAction={() => navigation.navigate("ArchiveGrid")} />
        <View style={styles.grid}>
          {[0, 1].map((rowIndex) => (
            <View key={rowIndex} style={styles.gridRow}>
              {FEATURED_ROOMS.slice(rowIndex * 2, rowIndex * 2 + 2).map((room) => (
                <Pressable
                  key={room}
                  style={styles.tile}
                  onPress={() => navigation.navigate("Listing", { category: room })}
                >
                  <Plate variant="card" plateNo={room} />
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomNav active="Registry" onNavigate={handleNavigate} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 40 },
  eyebrow: { ...type.eyebrow, paddingTop: 28, paddingHorizontal: 24 },
  hero: { paddingTop: 14, paddingHorizontal: 24, paddingBottom: 30 },
  h1: {
    fontFamily: fonts.displayLight,
    fontSize: 44,
    lineHeight: 48,
    letterSpacing: 0.4,
    color: colors.cream,
  },
  subWide: { maxWidth: 280 },
  catalogue: { paddingHorizontal: 24 },
  grid: { paddingHorizontal: 24, paddingBottom: 40, gap: 14 },
  gridRow: { flexDirection: "row", gap: 14 },
  tile: { flex: 1 },
});
