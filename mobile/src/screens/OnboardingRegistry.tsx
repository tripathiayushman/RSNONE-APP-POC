import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { Plate } from "../components/Plate";
import { Dots } from "../components/Dots";
import { Button } from "../components/Button";
import { editorialImages } from "../assets/editorialImages";
import { colors, fonts, type } from "../theme/tokens";

/**
 * 3.02 · Onboarding — The Registry. First of two onboarding cards. Skip in
 * the topbar (and the "Skip the tour" line) jump straight to SignIn; the
 * primary action continues to the second onboarding card.
 */
export default function OnboardingRegistry({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "OnboardingRegistry">) {
  return (
    <Screen>
      <TopBar variant="default" quiet icons={[{ glyph: "Skip", onPress: () => navigation.navigate("SignIn") }]} />

      <Text style={styles.eyebrow}>The Registry</Text>

      <View style={styles.hero}>
        <Text style={styles.h1}>{"A catalogue,\nnot a feed."}</Text>
        <Text style={styles.sub}>
          Each season the house admits a small number of pieces to the registry. Nothing more.
        </Text>
      </View>

      <Plate
        variant="hero"
        plateNo="Plate No. 001 · The Reading Room"
        source={editorialImages["onboarding-reading-room"]}
        style={styles.plate}
      />

      <View style={styles.footer}>
        <Dots count={2} activeIndex={0} style={styles.dots} />
        <Button label="Continue" onPress={() => navigation.navigate("OnboardingProvenance")} />
        <Pressable onPress={() => navigation.navigate("SignIn")} hitSlop={8}>
          <Text style={styles.skip}>Skip the tour</Text>
        </Pressable>
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
  },
  h1: { ...type.heroH1 },
  sub: {
    ...type.sub,
    marginTop: 14,
    maxWidth: 280,
  },
  plate: { height: 300, marginTop: 26 },
  footer: {
    marginTop: "auto",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  dots: { alignSelf: "center", marginBottom: 26 },
  skip: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: colors.creamDim,
    textAlign: "center",
    marginTop: 18,
  },
});
