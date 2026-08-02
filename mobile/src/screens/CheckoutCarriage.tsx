import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { Steps } from "../components/Steps";
import { Panel } from "../components/Panel";
import { Button } from "../components/Button";
import { Radio } from "../components/SelectControls";
import { addresses } from "../data/addresses";
import { colors, fonts, type } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "CheckoutCarriage">;

type CarriageMethod = "courier" | "express";

type CarriageRowProps = {
  active: boolean;
  label: string;
  subLabel: string;
  price: string;
  onPress: () => void;
  last?: boolean;
};

/** Local radio row for the "Manner of Carriage" list — no shared component covers this exact shape. */
function CarriageRow({ active, label, subLabel, price, onPress, last }: CarriageRowProps) {
  return (
    <Pressable onPress={onPress} style={[styles.radioRow, last ? styles.radioRowLast : undefined]}>
      <Radio value={active} onPress={onPress} />
      <View style={styles.radioLabelWrap}>
        <Text style={styles.radioLabel}>{label}</Text>
        <Text style={styles.radioSubLabel}>{subLabel}</Text>
      </View>
      <Text style={styles.radioPrice}>{price}</Text>
    </Pressable>
  );
}

export default function CheckoutCarriage({ navigation }: Props) {
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses.find((a) => a.preferred)?.id ?? addresses[0].id
  );
  const [carriageMethod, setCarriageMethod] = useState<CarriageMethod>("courier");

  return (
    <Screen>
      <TopBar variant="sub" title="The Desk" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Steps
          steps={[
            { number: "01", label: "Carriage" },
            { number: "02", label: "Payment" },
            { number: "03", label: "Review" },
          ]}
          currentIndex={0}
        />

        <View style={styles.heroBlock}>
          <Text style={styles.h1}>Where shall{"\n"}it be sent?</Text>
        </View>

        <View style={styles.px24}>
          {addresses.map((addr, i) => (
            <Panel
              key={addr.id}
              selected={addr.id === selectedAddressId}
              radio
              onPress={() => setSelectedAddressId(addr.id)}
              header={addr.name}
              tag={addr.preferred ? { label: "Preferred", variant: "brass" } : undefined}
              body={`${addr.street}\n${addr.city} ${addr.postal}, ${addr.country}`}
              actions={[{ label: "Amend", onPress: () => navigation.navigate("AddressForm", { addressId: addr.id }) }]}
              style={i > 0 ? styles.panelSpacing : undefined}
            />
          ))}
        </View>

        <View style={styles.newAddressWrap}>
          <Button variant="ghost" label="＋  New Address" onPress={() => navigation.navigate("AddressForm", undefined)} />
        </View>

        <Text style={styles.groupLbl}>Manner of Carriage</Text>
        <View style={styles.px24}>
          <CarriageRow
            active={carriageMethod === "courier"}
            label="House courier"
            subLabel="Three to five days · signed for · complimentary"
            price="—"
            onPress={() => setCarriageMethod("courier")}
          />
          <CarriageRow
            active={carriageMethod === "express"}
            label="Express"
            subLabel="One to two days, by air"
            price="$60"
            onPress={() => setCarriageMethod("express")}
            last
          />
        </View>

        <View style={styles.ctaBlock}>
          <Button label="Continue to Payment" onPress={() => navigation.navigate("CheckoutPayment")} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 12 },
  heroBlock: { paddingHorizontal: 24, paddingTop: 30, paddingBottom: 24 },
  h1: { ...type.displayMd },
  px24: { paddingHorizontal: 24 },
  panelSpacing: { marginTop: 14 },
  newAddressWrap: { paddingHorizontal: 24, paddingTop: 16 },
  groupLbl: { ...type.eyebrow, paddingTop: 34, paddingHorizontal: 24, paddingBottom: 6 },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  radioRowLast: { borderBottomWidth: 1, borderBottomColor: colors.hairline },
  radioLabelWrap: { flex: 1 },
  radioLabel: { fontFamily: fonts.bodyRegular, fontSize: 15, color: colors.cream },
  radioSubLabel: { fontFamily: fonts.bodyRegularItalic, fontSize: 12, color: colors.creamDim, marginTop: 3 },
  radioPrice: { ...type.price },
  ctaBlock: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 },
});
