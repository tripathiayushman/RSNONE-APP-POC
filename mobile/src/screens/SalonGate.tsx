import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { Field } from "../components/Field";
import { Button } from "../components/Button";
import * as tokens from "../theme/tokens";

/**
 * 3.30 · The Salon — Gate. The private, near-black register entry. This POC never
 * validates the invitation reference — the primary action always succeeds.
 */
export default function SalonGate({ navigation }: NativeStackScreenProps<RootStackParamList, "SalonGate">) {
  const [code, setCode] = useState("");

  return (
    <Screen salon>
      <View style={styles.center}>
        <View style={styles.intro}>
          <LinearGradient
            colors={["transparent", tokens.colors.brass]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.vline}
          />
          <Text style={styles.eyebrow}>The Salon</Text>
          <Text style={styles.h1}>By invitation,{"\n"}and quietly.</Text>
          <Text style={styles.sub}>
            The Salon admits collectors of the house by invitation only. Standing is reviewed each season, without
            ceremony.
          </Text>
        </View>
        <View style={styles.form}>
          <Field
            label="Invitation Reference"
            value={code}
            onChangeText={setCode}
            placeholder="RSN–S · ————"
            autoCapitalize="characters"
          />
        </View>
        <View style={styles.actions}>
          <Button label="Present Invitation" onPress={() => navigation.navigate("SalonRooms")} />
          <Text style={styles.enquire}>Enquire After Standing</Text>
        </View>
      </View>
      <Text style={styles.footer}>Seventy-One Members · MMXXVI</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center" },
  intro: { alignItems: "center", paddingHorizontal: 24 },
  vline: { width: 1, height: 72 },
  eyebrow: { ...tokens.type.eyebrow, paddingTop: 28, textAlign: "center" },
  h1: {
    fontFamily: tokens.fonts.displayLight,
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: 0.4,
    color: tokens.colors.cream,
    textAlign: "center",
    marginTop: 16,
  },
  sub: { ...tokens.type.sub, textAlign: "center", marginTop: 18, maxWidth: 270, alignSelf: "center" },
  form: { paddingTop: 30, paddingHorizontal: 24 },
  actions: { paddingTop: 30, paddingHorizontal: 24 },
  enquire: {
    ...tokens.type.micro,
    alignSelf: "center",
    marginTop: 22,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.hairline,
    paddingBottom: 3,
  },
  footer: {
    ...tokens.type.micro,
    letterSpacing: 2.4,
    textAlign: "center",
    paddingBottom: 24,
  },
});
