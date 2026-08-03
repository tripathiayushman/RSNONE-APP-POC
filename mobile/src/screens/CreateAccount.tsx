import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { Field } from "../components/Field";
import { Button, CtaLine } from "../components/Button";
import { Checkbox } from "../components/SelectControls";
import { colors, fonts, type } from "../theme/tokens";

export default function CreateAccount({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "CreateAccount">) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [subscribed, setSubscribed] = useState(true);

  function handleCreateAccount() {
    // No backend — this is a mock signup. Land the newly "registered" member
    // straight on the Registry home and clear the auth stack behind them.
    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  }

  return (
    <Screen>
      <TopBar variant="sub" title="Join the Club" onBack={() => navigation.goBack()} quiet />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContent}>
        <Text style={styles.eyebrow}>Admission</Text>
        <View style={styles.hero}>
          <Text style={styles.h1}>
            Introduce{"\n"}yourself.
          </Text>
          <Text style={type.sub}>
            Admission to the club is free while we build the first families. No card is asked for.
          </Text>
        </View>

        <View style={styles.form}>
          <Field
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="As it should appear on your papers"
            autoCapitalize="words"
          />
          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@—"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Field
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Twelve characters, at least"
            secureTextEntry
            autoCapitalize="none"
          />
          <Field
            label="Who Introduced You — Optional"
            value={referralCode}
            onChangeText={setReferralCode}
            placeholder="Their member code, if you have it"
            autoCapitalize="characters"
          />

          <Pressable
            onPress={() => setSubscribed((v) => !v)}
            style={styles.checkRow}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: subscribed }}
          >
            <Checkbox value={subscribed} />
            <Text style={styles.checkLabel}>
              Send me the seasonal registry — a letter, four times a year.
            </Text>
          </Pressable>
        </View>

        <View style={styles.ctaWrap}>
          <Button label="Create Account" onPress={handleCreateAccount} />
        </View>

        <View style={styles.footer}>
          <Text style={type.note}>Already known to us?</Text>
          <CtaLine label="Sign In" variant="brass" onPress={() => navigation.navigate("SignIn")} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1, paddingBottom: 44 },
  eyebrow: { ...type.eyebrow, paddingTop: 28, paddingHorizontal: 24 },
  hero: { paddingTop: 14, paddingHorizontal: 24, paddingBottom: 6 },
  h1: {
    fontFamily: fonts.displayLight,
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: 0.4,
    color: colors.cream,
  },
  form: { paddingHorizontal: 24 },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 15,
    marginTop: 14,
  },
  checkLabel: { ...type.note, flex: 1 },
  ctaWrap: { paddingHorizontal: 24, paddingTop: 22 },
  footer: {
    marginTop: "auto",
    paddingTop: 34,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
