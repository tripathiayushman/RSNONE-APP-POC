import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { Field } from "../components/Field";
import { Button, CtaLine } from "../components/Button";
import { colors, fonts, type } from "../theme/tokens";

/**
 * 3.04 · Sign In. Mock login only — there is no backend, so any email and
 * password combination succeeds. Sign In (and the two social buttons, which
 * stand in for OAuth in this POC) all reset the stack onto Home so the login
 * screens fall out of the back-history.
 */
export default function SignIn({ navigation }: NativeStackScreenProps<RootStackParamList, "SignIn">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function enterHouse() {
    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  }

  return (
    <Screen>
      <TopBar variant="default" quiet icons={[]} />

      <Text style={styles.eyebrow}>Welcome Back</Text>

      <View style={styles.hero}>
        <Text style={styles.h1}>{"The house keeps\nyour place."}</Text>
      </View>

      <View style={styles.form}>
        <Field
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="aarya.shrestha@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordWrap}>
          <Field
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <Pressable style={styles.showToggle} onPress={() => setShowPassword((s) => !s)} hitSlop={8}>
            <Text style={styles.showToggleText}>{showPassword ? "Hide" : "Show"}</Text>
          </Pressable>
        </View>

        <Text style={styles.fieldNote}>Misplaced your password? →</Text>
      </View>

      <View style={styles.primaryWrap}>
        <Button label="Sign In" onPress={enterHouse} />
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or continue with</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.btnRow}>
        <Button label="Apple" variant="ghost" onPress={enterHouse} style={styles.btnRowItem} />
        <Button label="Google" variant="ghost" onPress={enterHouse} style={styles.btnRowItem} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerNote}>New to the house?</Text>
        <CtaLine label="Create an Account" variant="brass" onPress={() => navigation.navigate("CreateAccount")} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    ...type.eyebrow,
    marginTop: 28,
    paddingHorizontal: 24,
  },
  hero: {
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 30,
  },
  h1: { ...type.heroH1, fontSize: 40, lineHeight: 44 },
  form: { paddingHorizontal: 24 },
  passwordWrap: { position: "relative" },
  showToggle: {
    position: "absolute",
    right: 0,
    top: 46,
    height: 34,
    justifyContent: "center",
  },
  showToggleText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.creamDim,
  },
  fieldNote: {
    fontFamily: fonts.bodyRegularItalic,
    fontSize: 12,
    color: colors.creamDim,
    textAlign: "right",
    marginTop: 10,
  },
  primaryWrap: { paddingHorizontal: 24, paddingTop: 34 },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.hairline },
  dividerText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    color: colors.creamDim,
  },
  btnRow: { flexDirection: "row", gap: 12, paddingHorizontal: 24 },
  btnRowItem: { flex: 1 },
  footer: {
    marginTop: "auto",
    paddingHorizontal: 24,
    paddingBottom: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  footerNote: {
    fontFamily: fonts.bodyRegularItalic,
    fontSize: 13,
    color: colors.creamDim,
  },
});
