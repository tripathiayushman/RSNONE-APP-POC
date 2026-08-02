import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { Panel } from "../components/Panel";
import { Button } from "../components/Button";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { addresses } from "../data/addresses";
import * as tokens from "../theme/tokens";

/** 3.25 · Addresses — the member's registered doors, one marked preferred. */
export default function Addresses({ navigation }: NativeStackScreenProps<RootStackParamList, "Addresses">) {
  function handleNavigate(key: BottomNavKey) {
    if (key === "Registry") navigation.navigate("Home");
    else if (key === "Archive") navigation.navigate("ArchiveGrid");
    else if (key === "Bag") navigation.navigate("Bag");
    else navigation.navigate("Account");
  }

  return (
    <Screen edges={["top"]}>
      <TopBar variant="sub" title="Addresses" onBack={() => navigation.goBack()} />
      <View style={styles.body}>
        <Text style={styles.eyebrow}>Where the House May Call</Text>
        <View style={styles.hero}>
          <Text style={styles.h1}>Two doors,{"\n"}both known.</Text>
        </View>
        <View style={styles.panels}>
          {addresses.map((addr) => (
            <Panel
              key={addr.id}
              selected={addr.preferred}
              header={addr.name}
              tag={addr.preferred ? { label: "Preferred", variant: "brass" } : undefined}
              body={`${addr.street}\n${addr.city} ${addr.postal}, ${addr.country}`}
              actions={
                addr.preferred
                  ? [
                      { label: "Amend", onPress: () => navigation.navigate("AddressForm", { addressId: addr.id }) },
                      { label: "Remove" },
                    ]
                  : [
                      { label: "Amend", onPress: () => navigation.navigate("AddressForm", { addressId: addr.id }) },
                      { label: "Make Preferred" },
                    ]
              }
            />
          ))}
        </View>
        <View style={styles.newAddressWrap}>
          <Button variant="ghost" label="+  New Address" onPress={() => navigation.navigate("AddressForm")} />
        </View>
        <View style={styles.noteWrap}>
          <Text style={styles.note}>
            Carriage is arranged to the preferred door unless you say otherwise at the desk.
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
  newAddressWrap: { paddingHorizontal: 24, paddingTop: 18 },
  noteWrap: { marginTop: "auto", paddingHorizontal: 24, paddingBottom: 32 },
  note: { ...tokens.type.note, textAlign: "center" },
});
