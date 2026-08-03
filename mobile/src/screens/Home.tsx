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
import { categories, getProductById } from "../data/products";
import { editorialImages } from "../assets/editorialImages";
import { useShelf } from "../state/AppState";
import { colors, fonts, type } from "../theme/tokens";

/** Newest admissions to the registry, surfaced on the home page. */
const RECENTLY_ACQUIRED_IDS = [
  "bridle-leather-crossbody",
  "ilam-first-flush",
  "cordless-brass-lamp",
];

/** Four of the six rooms, by category slug — the rest live in the Archive. */
const FEATURED_ROOM_SLUGS = ["home-living", "food-beverage", "fashion-bags", "beauty-care"];

/**
 * The three claims only a members' club can make — copy taken verbatim from the
 * storefront's "The standard" band so the app tells the same story as the site.
 */
const STANDARDS: { n: string; title: string; body: string; image: string }[] = [
  {
    n: "01",
    title: "Sourced at origin",
    body: "Bought direct from the house that makes it. One honest bridge in place of five hidden hands — the maker's price plus one small margin, named in the open.",
    image: "standard-origin",
  },
  {
    n: "02",
    title: "Sealed and verified",
    body: "Every object is checked and sealed by the club before it leaves the corridor. Authenticity is the baseline, never a badge.",
    image: "standard-sealed",
  },
  {
    n: "03",
    title: "Priced plainly, held flat",
    body: "The landed factory price, the same all year. Member pricing sits beneath everything, and the saving is named in full.",
    image: "standard-priced",
  },
];

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

  const featuredRooms = FEATURED_ROOM_SLUGS.map((slug) =>
    categories.find((c) => c.slug === slug)
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));

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
        <Text style={styles.eyebrow}>The Standing Registry</Text>
        <View style={styles.hero}>
          <Text style={styles.h1}>
            Objects worth{"\n"}keeping.
          </Text>
          <Text style={[type.sub, styles.subWide]}>
            A members' catalogue, sourced at origin — chosen, not merchandised.
          </Text>
        </View>

        <Pressable onPress={() => navigation.navigate("ArchiveGrid")}>
          <Plate
            variant="hero"
            plateNo="The House Standard"
            ctaLine="Enter the Registry"
            source={editorialImages["home-hero"]}
          />
        </Pressable>

        <SectionHeader
          title="Newly Admitted"
          actionLabel="View All"
          onAction={() => navigation.navigate("ArchiveGrid")}
        />
        <View style={styles.catalogue}>
          {recentlyAcquired.map((product, index) => (
            <LotRow
              key={product.id}
              number={String(index + 1).padStart(2, "0")}
              thumb
              productId={product.id}
              name={product.name}
              meta={product.meta}
              price={product.price}
              onPress={() => navigation.navigate("ProductDetail", { productId: product.id })}
            />
          ))}
        </View>

        <SectionHeader title="Held to, on every order." tight />
        <View style={styles.standards}>
          {STANDARDS.map((s) => (
            <View key={s.n} style={styles.standard}>
              <Plate variant="wide" plateNo={s.title} source={editorialImages[s.image]} style={styles.standardPlate} />
              <View style={styles.standardText}>
                <Text style={styles.standardNum}>{s.n}</Text>
                <View style={styles.standardBody}>
                  <Text style={styles.standardTitle}>{s.title}</Text>
                  <Text style={styles.standardCopy}>{s.body}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <PullQuote
          quote={"The club exists for\nobjects like this."}
          attribution="— The Founding Note"
        />

        <SectionHeader title="The Rooms" actionLabel="Browse" tight onAction={() => navigation.navigate("ArchiveGrid")} />
        <View style={styles.grid}>
          {[0, 1].map((rowIndex) => (
            <View key={rowIndex} style={styles.gridRow}>
              {featuredRooms.slice(rowIndex * 2, rowIndex * 2 + 2).map((room) => (
                <Pressable
                  key={room.slug}
                  style={styles.tile}
                  onPress={() => navigation.navigate("Listing", { category: room.name })}
                >
                  <Plate variant="card" plateNo={room.name} source={editorialImages[`category:${room.slug}`]} />
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
  standards: { gap: 30 },
  standard: {},
  standardPlate: { height: 190 },
  standardText: { flexDirection: "row", gap: 16, paddingHorizontal: 24, paddingTop: 14 },
  standardNum: {
    fontFamily: fonts.displayRegular,
    fontSize: 13,
    color: colors.brass,
    width: 26,
    paddingTop: 3,
  },
  standardBody: { flex: 1 },
  standardTitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 16,
    color: colors.cream,
    marginBottom: 5,
  },
  standardCopy: { ...type.bodyDim, fontSize: 14, lineHeight: 22 },
  grid: { paddingHorizontal: 24, paddingBottom: 40, gap: 14 },
  gridRow: { flexDirection: "row", gap: 14 },
  tile: { flex: 1 },
});
