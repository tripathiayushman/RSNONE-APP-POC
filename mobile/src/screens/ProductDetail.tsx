import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { Plate } from "../components/Plate";
import { Swatch } from "../components/Swatch";
import { Stepper } from "../components/Stepper";
import { Button } from "../components/Button";
import { Accordion } from "../components/Accordion";
import { PullQuote } from "../components/PullQuote";
import { SectionHeader } from "../components/SectionHeader";
import { ProductCard } from "../components/ProductCard";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { Tag } from "../components/Tag";
import * as Haptics from "expo-haptics";
import { getProductById, products } from "../data/products";
import { productImages } from "../assets/productImages";
import { useBag, useShelf } from "../state/AppState";
import { colors, fonts, type } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

/** Origin countries represented in the registry, spelled out for the PDP. */
const COUNTRY_NAME: Record<string, string> = {
  NP: "Nepal",
  CN: "China",
  KR: "Korea",
  TH: "Thailand",
  LK: "Sri Lanka",
  GB: "United Kingdom",
  AE: "UAE",
};

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function handleBottomNav<RouteName extends keyof RootStackParamList>(
  navigation: NativeStackNavigationProp<RootStackParamList, RouteName>,
  key: BottomNavKey
) {
  if (key === "Registry") navigation.navigate("Home");
  else if (key === "Archive") navigation.navigate("ArchiveGrid");
  else if (key === "Bag") navigation.navigate("Bag");
  else navigation.navigate("Account");
}

export default function ProductDetail({ navigation, route }: Props) {
  const product = getProductById(route.params.productId) ?? products[0];
  const index = products.findIndex((p) => p.id === product.id);
  const lotLabel = `Lot ${String(index + 1).padStart(2, "0")} of ${products.length}`;

  const { addItem } = useBag();
  const { isSaved, toggle } = useShelf();

  const [swatchId, setSwatchId] = useState<string>(product.swatches?.[0]?.id ?? "");
  const [qty, setQty] = useState(1);

  const selectedSwatch = product.swatches?.find((s) => s.id === swatchId);
  const finishLabel = selectedSwatch ? capitalize(selectedSwatch.colorKey) : "";

  const sameBench = products.filter((p) => p.id !== product.id && p.category === product.category);
  const otherLots = products.filter((p) => p.id !== product.id && p.category !== product.category);
  const related = [...sameBench, ...otherLots].slice(0, 2);

  const saved = isSaved(product.id);

  return (
    <Screen edges={["top"]}>
      <TopBar
        variant="sub"
        title={lotLabel}
        onBack={() => navigation.goBack()}
        rightIcon={saved ? "heart-filled" : "heart"}
        rightActive={saved}
        onRightPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
          toggle(product);
        }}
      />
      <ScrollView style={styles.flex} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.plateWrap}>
          <Plate
            variant="hero"
            tag={`${product.plateNo ?? ""} · ${product.meta}`}
            plateNo={product.lotTag ?? "In the registry"}
            source={productImages[product.id]}
            style={styles.plate}
          />
        </View>

        <Text style={styles.eyebrow}>
          {product.category} · Lot {String(index + 1).padStart(2, "0")}
        </Text>

        <View style={styles.heroBlock}>
          <Text style={styles.h1}>{product.name}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{product.price}</Text>
            {product.membersOnly ? <Tag label="Members Only" variant="brass" /> : null}
          </View>
          <Text style={styles.sub}>{product.description}</Text>
        </View>

        <View style={styles.originRow}>
          <Text style={styles.originLabel}>Sourced at origin</Text>
          <Text style={styles.originValue}>
            {product.origin.place} · {COUNTRY_NAME[product.origin.country] ?? product.origin.country}
          </Text>
        </View>

        {product.swatches ? (
          <View style={styles.section}>
            <Text style={styles.microLabel}>
              Finish — <Text style={styles.microLabelDim}>{finishLabel}</Text>
            </Text>
            <Swatch options={product.swatches} value={swatchId} onChange={setSwatchId} />
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.microLabel}>Quantity</Text>
          <Stepper value={qty} onChange={setQty} />
        </View>

        <View style={styles.ctaBlock}>
          <Button
            label={`Add to Bag — ${product.price}`}
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
              addItem(product, qty);
              navigation.navigate("Bag");
            }}
          />
          <Text style={styles.note}>In stock · sealed before it travels · paid on delivery</Text>
        </View>

        <View style={styles.accordionsBlock}>
          <Accordion title="Materials & Making" defaultOpen>
            {`${capitalize(product.meta)}. Made in ${product.origin.place}, bought from the workshop rather than a middleman, and held to the house standard before it is listed.`}
          </Accordion>
          <Accordion title="Origin & Papers">
            {`Sourced at origin in ${product.origin.place}, ${COUNTRY_NAME[product.origin.country] ?? product.origin.country}. Each piece carries a certificate of origin and a registry entry logged under your name — the same record you can recall from your Account at any time.`}
          </Accordion>
          <Accordion title="RSN Tested">
            Nothing enters the registry untested. Samples are checked against the house standard for what they claim to be, and the report is filed against the record.
          </Accordion>
          <Accordion title="Carriage & Settlement" style={styles.lastAccordion}>
            Wrapped in the house paper and wax-sealed, delivered within five to seven days across the valley. Settled in cash at the door — nothing is collected before the parcel is in your hands. Returns are accepted within fourteen days, unused and in their original wrapping.
          </Accordion>
        </View>

        <PullQuote quote={"Chosen once,\nchosen properly."} attribution="— The House Standard" />

        <SectionHeader
          title="From the Same Bench"
          actionLabel="View All"
          onAction={() => navigation.navigate("Listing", { category: product.category })}
          tight
        />
        <View style={styles.pgrid}>
          {related.map((p) => (
            <ProductCard
              key={p.id}
              productId={p.id}
              name={p.name}
              meta={p.meta}
              price={p.price}
              lotTag={p.lotTag}
              plateNo={p.plateNo}
              onPress={() => navigation.push("ProductDetail", { productId: p.id })}
            />
          ))}
        </View>
      </ScrollView>
      <BottomNav active="Archive" onNavigate={(key) => handleBottomNav(navigation, key)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContent: { paddingBottom: 12 },
  plateWrap: { position: "relative" },
  plate: { marginHorizontal: 0, borderLeftWidth: 0, borderRightWidth: 0 },
  eyebrow: { ...type.eyebrow, paddingHorizontal: 24, paddingTop: 28 },
  heroBlock: { paddingHorizontal: 24, paddingTop: 14, paddingBottom: 0 },
  h1: { ...type.displayMd },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 14, marginTop: 14 },
  price: { fontFamily: fonts.bodyRegular, fontSize: 18, letterSpacing: 0.4, color: colors.brass },
  sub: { ...type.sub, marginTop: 12 },
  originRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginHorizontal: 24,
    marginTop: 22,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  originLabel: { ...type.micro, color: colors.brass },
  originValue: { fontFamily: fonts.bodyRegular, fontSize: 14, color: colors.cream },
  section: { paddingHorizontal: 24, paddingTop: 28 },
  microLabel: { ...type.micro, color: colors.cream, marginBottom: 12 },
  microLabelDim: { color: colors.creamDim },
  ctaBlock: { paddingHorizontal: 24, paddingTop: 30, paddingBottom: 8 },
  note: { ...type.micro, textAlign: "center", marginTop: 14 },
  accordionsBlock: { paddingHorizontal: 24, paddingTop: 26 },
  lastAccordion: { borderBottomWidth: 1, borderBottomColor: colors.hairline },
  pgrid: { flexDirection: "row", gap: 16, paddingHorizontal: 24, paddingBottom: 44 },
});
