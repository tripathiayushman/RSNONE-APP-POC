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

type Method = {
  id: string;
  title: string;
  body: string;
  tag?: { label: string; variant?: "default" | "brass" | "rose" };
  preferred?: boolean;
  actions?: { label: string }[];
};

// The club takes no card numbers — settlement happens at the door or by
// arrangement with the desk. This screen states the terms rather than
// pretending to hold a wallet of cards.
const methods: Method[] = [
  {
    id: "cod",
    title: "Cash on delivery",
    body: "Counted at the door, against the sealed parcel. Available everywhere the house delivers.",
    tag: { label: "Preferred", variant: "brass" },
    preferred: true,
    actions: [{ label: "Terms" }],
  },
  {
    id: "transfer",
    title: "Bank transfer",
    body: "Arranged with the desk before dispatch. Suited to larger orders and standing accounts.",
    actions: [{ label: "Request Details" }],
  },
  {
    id: "card",
    title: "Card",
    body: "Not yet accepted. The gateway opens later this year; members will be written to first.",
    tag: { label: "Soon" },
  },
];

/** 3.27 · Payment — the manner of settlement, read-only for this POC. */
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
          <Text style={styles.h1}>Settled at the door,{"\n"}not before.</Text>
        </View>
        <View style={styles.panels}>
          {methods.map((method) => (
            <Panel
              key={method.id}
              selected={method.preferred}
              header={method.title}
              tag={method.tag}
              body={method.body}
              actions={method.actions}
            />
          ))}
        </View>
        <View style={styles.newCardWrap}>
          <Button label="+  Add a Card" disabled />
        </View>
        <View style={styles.noteWrap}>
          <Text style={styles.note}>
            The house holds no card numbers. Nothing is collected until the parcel is in your hands.
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
