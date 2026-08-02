import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { Plate } from "../components/Plate";
import { Dots } from "../components/Dots";
import { Swatch } from "../components/Swatch";
import { Stepper } from "../components/Stepper";
import { Button } from "../components/Button";
import { Accordion } from "../components/Accordion";
import { PullQuote } from "../components/PullQuote";
import { SectionHeader } from "../components/SectionHeader";
import { ProductCard } from "../components/ProductCard";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { getProductById, products } from "../data/products";
import { useBag, useShelf } from "../state/AppState";
import { colors, fonts, type } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

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
        rightLabel={saved ? "♥" : "♡"}
        onRightPress={() => toggle(product)}
      />
      <ScrollView style={styles.flex} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.plateWrap}>
          <Plate
            variant="hero"
            tag={`${product.plateNo ?? ""} · ${product.meta}`}
            plateNo="View 1 of 4"
            style={styles.plate}
          />
          <View style={styles.dotsOverlay} pointerEvents="none">
            <Dots count={4} activeIndex={0} />
          </View>
        </View>

        <Text style={styles.eyebrow}>
          {product.category} · Lot {String(index + 1).padStart(2, "0")}
        </Text>

        <View style={styles.heroBlock}>
          <Text style={styles.h1}>{product.name}</Text>
          <Text style={styles.price}>{product.price}</Text>
          <Text style={styles.sub}>{product.description}</Text>
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
          <Button label={`Add to Bag — ${product.price}`} onPress={() => { addItem(product, qty); navigation.navigate("Bag"); }} />
          <Text style={styles.note}>Ready to ship · wrapped in the house paper</Text>
        </View>

        <View style={styles.accordionsBlock}>
          <Accordion title="Materials & Craft" defaultOpen>
            {`Crafted from ${product.meta.toLowerCase()}, chosen for how it wears rather than how it photographs. Fittings are cast and finished by hand, one bench, one maker, start to finish.`}
          </Accordion>
          <Accordion title="Provenance & Papers">
            Each piece is issued with a signed certificate of provenance and a registry entry logged under your name at acquisition — the same record you can recall from your Account at any time.
          </Accordion>
          <Accordion title="Care & Keeping">
            Keep away from prolonged direct sun and store within its dust bag when not in use. A soft, dry cloth is enough for the everyday; anything more should go to the house, not a stranger.
          </Accordion>
          <Accordion title="Carriage & Returns" style={styles.lastAccordion}>
            Ships wrapped in the house paper via courier, complimentary within five to seven days. Returns are accepted within fourteen days, unworn and in their original wrapping.
          </Accordion>
        </View>

        <PullQuote quote={"Made once,\nmade properly."} attribution="— Atelier No. 3" />

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
  dotsOverlay: { position: "absolute", right: 20, bottom: 16 },
  eyebrow: { ...type.eyebrow, paddingHorizontal: 24, paddingTop: 28 },
  heroBlock: { paddingHorizontal: 24, paddingTop: 14, paddingBottom: 0 },
  h1: { ...type.displayMd },
  price: { fontFamily: fonts.bodyRegular, fontSize: 18, letterSpacing: 0.4, color: colors.brass, marginTop: 14 },
  sub: { ...type.sub, marginTop: 12 },
  section: { paddingHorizontal: 24, paddingTop: 28 },
  microLabel: { ...type.micro, color: colors.cream, marginBottom: 12 },
  microLabelDim: { color: colors.creamDim },
  ctaBlock: { paddingHorizontal: 24, paddingTop: 30, paddingBottom: 8 },
  note: { ...type.micro, textAlign: "center", marginTop: 14 },
  accordionsBlock: { paddingHorizontal: 24, paddingTop: 26 },
  lastAccordion: { borderBottomWidth: 1, borderBottomColor: colors.hairline },
  pgrid: { flexDirection: "row", gap: 16, paddingHorizontal: 24, paddingBottom: 44 },
});
