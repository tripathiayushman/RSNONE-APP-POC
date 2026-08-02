import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { Panel } from "../components/Panel";
import { Button } from "../components/Button";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import * as tokens from "../theme/tokens";

type Card = {
  id: string;
  brand: string;
  last4: string;
  holder: string;
  expiry: string;
  preferred?: boolean;
};

// No dedicated data/payments.ts exists for this POC — the house holds no card
// numbers (see the footer note below), so these two cards are mocked in-file.
const cards: Card[] = [
  {
    id: "amex-4417",
    brand: "American Express",
    last4: "4417",
    holder: "A. Marchetti",
    expiry: "08/28",
    preferred: true,
  },
  { id: "visa-8802", brand: "Visa", last4: "8802", holder: "A. Marchetti", expiry: "06/27" },
];

/** 3.27 · Payment Methods — read-only for this POC; the house settles, it does not store. */
export default function PaymentMethods({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "PaymentMethods">) {
  function handleNavigate(key: BottomNavKey) {
    if (key === "Registry") navigation.navigate("Home");
    else if (key === "Archive") navigation.navigate("ArchiveGrid");
    else if (key === "Bag") navigation.navigate("Bag");
    else navigation.navigate("Account");
  }

  return (
    <Screen edges={["top"]}>
      <TopBar variant="sub" title="Payment" onBack={() => navigation.goBack()} />
      <View style={styles.body}>
        <Text style={styles.eyebrow}>Manner of Settlement</Text>
        <View style={styles.hero}>
          <Text style={styles.h1}>Settled quietly,{"\n"}as arranged.</Text>
        </View>
        <View style={styles.panels}>
          {cards.map((card) => (
            <Panel
              key={card.id}
              selected={card.preferred}
              header={`${card.brand} ···· ${card.last4}`}
              tag={card.preferred ? { label: "Preferred", variant: "brass" } : undefined}
              body={`${card.holder} · expires ${card.expiry}`}
              actions={card.preferred ? [{ label: "Amend" }, { label: "Remove" }] : [{ label: "Amend" }, { label: "Make Preferred" }]}
            />
          ))}
        </View>
        <View style={styles.newCardWrap}>
          <Button label="+  New Card" disabled />
        </View>
        <View style={styles.noteWrap}>
          <Text style={styles.note}>
            The house holds no card numbers; our bank does. Wire and cheque remain welcome, by arrangement.
          </Text>
        </View>
      </View>
      <BottomNav active="Account" onNavigate={handleNavigate} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1 },
  eyebrow: { ...tokens.type.eyebrow, paddingTop: 22, paddingHorizontal: 24 },
  hero: { paddingTop: 14, paddingHorizontal: 24, paddingBottom: 24 },
  h1: { ...tokens.type.displayMd },
  panels: { paddingHorizontal: 24, gap: 16 },
  newCardWrap: { paddingHorizontal: 24, paddingTop: 18 },
  noteWrap: { marginTop: "auto", paddingHorizontal: 24, paddingBottom: 32 },
  note: { ...tokens.type.note, textAlign: "center" },
});
