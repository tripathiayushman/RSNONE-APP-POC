import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { Field } from "../components/Field";
import { Toggle } from "../components/Toggle";
import { Button } from "../components/Button";
import { addresses } from "../data/addresses";
import * as tokens from "../theme/tokens";

/** 3.26 · Address — Add / Amend. Prefills from data/addresses.ts when an addressId is passed. */
export default function AddressForm({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "AddressForm">) {
  const addressId = route.params?.addressId;
  const existing = addressId ? addresses.find((a) => a.id === addressId) : undefined;

  const [doorName, setDoorName] = useState(existing?.name ?? "");
  const [recipient, setRecipient] = useState(existing ? "A. Marchetti" : "");
  const [street, setStreet] = useState(existing?.street ?? "");
  const [city, setCity] = useState(existing?.city ?? "");
  const [postal, setPostal] = useState(existing?.postal ?? "");
  const [country, setCountry] = useState(existing?.country ?? "");
  const [preferred, setPreferred] = useState(existing?.preferred ?? false);

  return (
    <Screen>
      <TopBar
        variant="sub"
        title={existing ? "Amend Address" : "New Address"}
        onBack={() => navigation.goBack()}
        rightLabel="✕"
        onRightPress={() => navigation.goBack()}
      />
      <View style={styles.form}>
        <Field
          label="Name the Door"
          value={doorName}
          onChangeText={setDoorName}
          placeholder="e.g. Home, The Studio"
        />
        <Field label="Recipient" value={recipient} onChangeText={setRecipient} placeholder="Full name" />
        <Field label="Street" value={street} onChangeText={setStreet} placeholder="Street address" />
        <View style={styles.row}>
          <Field
            label="City"
            value={city}
            onChangeText={setCity}
            placeholder="City"
            style={styles.cityField}
          />
          <Field
            label="Postcode"
            value={postal}
            onChangeText={setPostal}
            placeholder="Postcode"
            style={styles.postField}
          />
        </View>
        <Field label="Country" value={country} onChangeText={setCountry} placeholder="Country" />
        <View style={styles.checkrow}>
          <Toggle value={preferred} onValueChange={setPreferred} />
          <Text style={styles.checkLabel}>Make this the preferred door</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <Button label="Keep This Address" onPress={() => navigation.goBack()} />
        <Pressable onPress={() => navigation.goBack()} style={styles.discardWrap} hitSlop={8}>
          <Text style={styles.discard}>Discard</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: { flex: 1, paddingHorizontal: 24, paddingTop: 6 },
  row: { flexDirection: "row", gap: 24 },
  cityField: { flex: 1.4 },
  postField: { flex: 1 },
  checkrow: { flexDirection: "row", alignItems: "center", gap: 14, paddingVertical: 15, marginTop: 18 },
  checkLabel: { flex: 1, fontFamily: tokens.fonts.bodyRegular, fontSize: 14, color: tokens.colors.cream },
  actions: { paddingHorizontal: 24, paddingBottom: 44 },
  discardWrap: {
    alignSelf: "center",
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.hairline,
    paddingBottom: 3,
  },
  discard: { ...tokens.type.micro },
});
