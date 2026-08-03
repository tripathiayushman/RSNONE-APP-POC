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
 * 3.03 · Onboarding — Provenance. Second and last onboarding card. Skip and
 * the primary action both land on SignIn — this is the end of the tour.
 */
export default function OnboardingProvenance({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "OnboardingProvenance">) {
  return (
    <Screen>
      <TopBar variant="default" quiet icons={[{ label: "Skip", onPress: () => navigation.navigate("SignIn") }]} />

      <Text style={styles.eyebrow}>Origin</Text>

      <View style={styles.hero}>
        <Text style={styles.h1}>{"Bought at origin,\nsealed before it travels."}</Text>
        <Text style={styles.sub}>
          The house buys from the workshop, not the middleman — and passes the difference to members.
        </Text>
      </View>

      <Plate
        variant="hero"
        plateNo="II · Origin"
        source={editorialImages["provenance"]}
        style={styles.plate}
      />

      <View style={styles.footer}>
        <Dots count={3} activeIndex={1} style={styles.dots} />
        <Button label="Continue" onPress={() => navigation.navigate("OnboardingClub")} />
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
  h1: { ...type.heroH1, fontSize: 36, lineHeight: 40 },
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
