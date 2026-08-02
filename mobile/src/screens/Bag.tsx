import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { LotRow } from "../components/LotRow";
import { Stepper } from "../components/Stepper";
import { KV } from "../components/KV";
import { Button, CtaLine } from "../components/Button";
import { PullQuote } from "../components/PullQuote";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { useBag } from "../state/AppState";
import { colors, fonts, type } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "Bag">;

function handleBottomNav<RouteName extends keyof RootStackParamList>(
  navigation: NativeStackNavigationProp<RootStackParamList, RouteName>,
  key: BottomNavKey
) {
  if (key === "Registry") navigation.navigate("Home");
  else if (key === "Archive") navigation.navigate("ArchiveGrid");
  else if (key === "Bag") navigation.navigate("Bag");
  else navigation.navigate("Account");
}

function formatPrice(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

export default function Bag({ navigation }: Props) {
  const { items, updateQty, removeItem, subtotal } = useBag();
  const [note, setNote] = useState("");
  const [noteApplied, setNoteApplied] = useState(false);

  if (items.length === 0) {
    return (
      <Screen edges={["top"]}>
        <TopBar
          variant="default"
          icons={[
            { glyph: "⚲", onPress: () => navigation.navigate("Search") },
            { glyph: "♡", onPress: () => navigation.navigate("Shelf") },
          ]}
        />
        <Text style={styles.eyebrow}>Your Bag</Text>
        <View style={styles.grow}>
          <PullQuote quote={"An empty bag is a promise\nto your future self."} attribution="— House Philosophy" />
          <View style={styles.emptyNoteWrap}>
            <Text style={styles.emptyNote}>
              Nothing is held for you at the desk. The autumn registry is open, and the rooms are full.
            </Text>
          </View>
          <View style={styles.emptyCtaWrap}>
            <Button variant="secondary" label="Enter the Archive" onPress={() => navigation.navigate("ArchiveGrid")} />
          </View>
        </View>
        <BottomNav active="Bag" onNavigate={(key) => handleBottomNav(navigation, key)} />
      </Screen>
    );
  }

  return (
    <Screen edges={["top"]}>
      <TopBar
        variant="default"
        icons={[
          { glyph: "⚲", onPress: () => navigation.navigate("Search") },
          { glyph: "♡", onPress: () => navigation.navigate("Shelf") },
        ]}
      />
      <ScrollView style={styles.flex} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>
          Your Bag · {items.length} {items.length === 1 ? "Piece" : "Pieces"}
        </Text>
        <View style={styles.heroBlock}>
          <Text style={styles.h1}>Considered, then{"\n"}carried home.</Text>
        </View>

        <View style={styles.catalogue}>
          {items.map((line, i) => (
            <LotRow
              key={line.product.id}
              number={String(i + 1).padStart(2, "0")}
              thumb
              name={line.product.name}
              meta={line.product.meta}
              onPress={() => navigation.navigate("ProductDetail", { productId: line.product.id })}
              rightSlot={
                <View style={styles.bagSide}>
                  <Text style={styles.bagPrice}>{formatPrice(line.product.priceValue * line.qty)}</Text>
                  <Stepper value={line.qty} onChange={(v) => updateQty(line.product.id, v)} />
                  <Pressable onPress={() => removeItem(line.product.id)} hitSlop={8}>
                    <Text style={styles.release}>Release</Text>
                  </Pressable>
                </View>
              }
            />
          ))}
        </View>

        <View style={styles.noteField}>
          <Text style={styles.noteLabel}>A Word from the House</Text>
          <View style={styles.noteControl}>
            <TextInput
              value={note}
              onChangeText={(t) => { setNote(t); setNoteApplied(false); }}
              placeholder="Enter it here, if you hold one"
              placeholderTextColor={colors.creamDim}
              style={styles.noteInput}
            />
            <CtaLine label={noteApplied ? "Applied" : "Apply"} variant="brass" onPress={() => setNoteApplied(true)} />
          </View>
        </View>

        <View style={styles.summary}>
          <KV label="Subtotal" value={formatPrice(subtotal)} />
          <KV label="Carriage" value="Complimentary" />
          <KV label="Duties & taxes" value="Reckoned at the desk" />
          <KV label="Total" value={formatPrice(subtotal)} total />
        </View>

        <View style={styles.ctaBlock}>
          <Button label="Proceed to the Desk" onPress={() => navigation.navigate("CheckoutCarriage")} />
        </View>
        <View style={styles.footNoteWrap}>
          <Text style={styles.footNote}>Each piece leaves the house wrapped in its paper, without exception.</Text>
        </View>
      </ScrollView>
      <BottomNav active="Bag" onNavigate={(key) => handleBottomNav(navigation, key)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  grow: { flex: 1, justifyContent: "center" },
  scrollContent: { paddingBottom: 12 },
  eyebrow: { ...type.eyebrow, paddingHorizontal: 24, paddingTop: 28 },
  heroBlock: { paddingHorizontal: 24, paddingTop: 14, paddingBottom: 22 },
  h1: { ...type.displayMd },
  catalogue: { paddingHorizontal: 24 },
  bagSide: { alignItems: "flex-end", gap: 8 },
  bagPrice: { ...type.price },
  release: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.creamDim,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
    paddingBottom: 2,
  },
  noteField: { paddingHorizontal: 24, paddingTop: 30 },
  noteLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: colors.creamDim,
    marginBottom: 10,
  },
  noteControl: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
    paddingTop: 4,
    paddingBottom: 12,
    minHeight: 34,
    gap: 12,
  },
  noteInput: { flex: 1, fontFamily: fonts.bodyRegularItalic, fontSize: 16, color: colors.cream, padding: 0, margin: 0 },
  summary: { paddingHorizontal: 24, paddingTop: 26 },
  ctaBlock: { paddingHorizontal: 24, paddingTop: 26, paddingBottom: 10 },
  footNoteWrap: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 36 },
  footNote: { ...type.note, textAlign: "center" },
  emptyNoteWrap: { paddingHorizontal: 24 },
  emptyNote: { ...type.note, textAlign: "center", maxWidth: 260, alignSelf: "center" },
  emptyCtaWrap: { paddingHorizontal: 60, paddingTop: 32 },
});
