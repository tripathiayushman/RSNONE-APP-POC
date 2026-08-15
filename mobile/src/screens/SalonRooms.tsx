import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { Plate } from "../components/Plate";
import { SectionHeader } from "../components/SectionHeader";
import { LotRow } from "../components/LotRow";
import { Tag } from "../components/Tag";
import { BrandMark } from "../components/BrandMark";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { getProductById } from "../data/products";
import { editorialImages } from "../assets/editorialImages";
import { colors, fonts, type as textType } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "SalonRooms">;

const heldInYourName = [
  {
    number: "01",
    productId: "hand-knotted-wool-runner",
    tag: { label: "Reserved for you", variant: "brass" as const },
  },
  {
    number: "02",
    productId: "ilam-first-flush",
    tag: { label: "Two remain", variant: "rose" as const },
  },
  {
    number: "03",
    productId: "seoul-skincare-edit",
    tag: { label: "Members only", variant: "rose" as const },
  },
];

/**
 * 3.31 The Salon — Private Rooms. The near-black exclusive register: reserved
 * pieces, a countdown to the next private opening, and a line to the concierge.
 */
export default function SalonRooms({ navigation }: Props) {
  const handleNavigate = (key: BottomNavKey) => {
    if (key === "Registry") navigation.navigate("Home");
    else if (key === "Archive") navigation.navigate("ArchiveGrid");
    else if (key === "Bag") navigation.navigate("Bag");
    else navigation.navigate("Account");
  };

  return (
    <Screen salon edges={["top"]}>
      <View style={styles.header}>
        <BrandMark width={96} />
        <Tag label="Salon" variant="brass" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>The Salon · Good Evening, Aarya</Text>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>For those who{"\n"}wait for nothing.</Text>
          <Text style={styles.heroSub}>
            Member-only allocations, held pieces, and prices quoted at the desk.
          </Text>
        </View>

        <Pressable onPress={() => navigation.navigate("Listing")}>
          <Plate
            variant="wide"
            salon
            tag="The Sealed Register"
            plateNo="Forty pieces · members only"
            ctaLine="First Look"
            source={editorialImages["membership-hero"]}
            style={styles.plateWide}
          />
        </Pressable>

        <View style={styles.countdownRow}>
          <Text style={styles.countdownLabel}>Next allocation</Text>
          <Text style={styles.countdownValue}>12 September</Text>
        </View>
        <View style={styles.divider} />

        <SectionHeader title="Held in Your Name" actionLabel="Until 4 Aug" tight />
        <View style={styles.catalogue}>
          {heldInYourName.map((entry) => {
            const product = getProductById(entry.productId);
            if (!product) return null;
            return (
              <LotRow
                key={entry.productId}
                number={entry.number}
                thumb
                productId={product.id}
                name={product.name}
                meta={product.meta}
                price={product.price}
                tag={entry.tag}
                onPress={() => navigation.navigate("ProductDetail", { productId: product.id })}
              />
            );
          })}
        </View>

        <View style={styles.quoteBlock}>
          <Text style={styles.quoteText}>
            &ldquo;Small allocations, named openly,{"\n"}offered to members first.&rdquo;
          </Text>
          <Text style={styles.quoteAttribution}>— The House Standard</Text>
        </View>

        <View style={styles.conciergeRow}>
          <Text style={styles.conciergeLabel}>Your concierge — Ms. Pratima Shakya</Text>
          <Pressable onPress={() => navigation.navigate("Correspondence")} hitSlop={8}>
            <Text style={styles.conciergeCta}>Write</Text>
          </Pressable>
        </View>
      </ScrollView>
      <BottomNav active="Account" onNavigate={handleNavigate} salon />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#2e1d16",
  },
  scrollContent: { paddingBottom: 40 },
  eyebrow: { ...textType.eyebrow, paddingTop: 28, paddingHorizontal: 24 },
  hero: { paddingTop: 14, paddingHorizontal: 24, paddingBottom: 30 },
  heroTitle: {
    fontFamily: fonts.displayLight,
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: 0.3,
    color: colors.cream,
  },
  heroSub: { ...textType.sub, marginTop: 14, maxWidth: 280 },
  plateWide: { height: 250 },
  countdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  countdownLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    color: colors.brass,
  },
  countdownValue: {
    fontFamily: fonts.displayLight,
    fontSize: 26,
    letterSpacing: 2,
    color: colors.cream,
  },
  divider: { height: 1, backgroundColor: colors.hairline, marginHorizontal: 24, marginTop: 18 },
  catalogue: { paddingHorizontal: 24 },
  quoteBlock: {
    marginVertical: 50,
    marginHorizontal: 24,
    paddingVertical: 36,
    borderTopWidth: 1,
    borderTopColor: "#6b4a3a",
    borderBottomWidth: 1,
    borderBottomColor: "#6b4a3a",
    alignItems: "center",
  },
  quoteText: {
    fontFamily: fonts.displayLightItalic,
    fontSize: 20,
    lineHeight: 30,
    color: colors.cream,
    textAlign: "center",
  },
  quoteAttribution: {
    marginTop: 14,
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: colors.creamDim,
  },
  conciergeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 36,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
    paddingTop: 19,
  },
  conciergeLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 16,
    color: colors.cream,
    flex: 1,
    paddingRight: 12,
  },
  conciergeCta: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: colors.brass,
  },
});
