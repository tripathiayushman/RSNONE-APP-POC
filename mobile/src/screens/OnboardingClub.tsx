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
 * 3.04 · Onboarding — The Club. Third and last onboarding card, and the one
 * that explains what RSN One actually is: a members' club that grows by
 * introduction and credits its members when it does.
 */
export default function OnboardingClub({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "OnboardingClub">) {
  return (
    <Screen>
      <TopBar variant="default" quiet icons={[{ glyph: "Skip", onPress: () => navigation.navigate("SignIn") }]} />

      <Text style={styles.eyebrow}>The Global Family Club</Text>

      <View style={styles.hero}>
        <Text style={styles.h1}>{"A club, and it grows\nby introduction."}</Text>
        <Text style={styles.sub}>
          Admission is free while we build the first families. Bring one in and the house credits
          your wallet when their admission settles.
        </Text>
      </View>

      <Plate
        variant="hero"
        plateNo="III · The Club"
        source={editorialImages["membership-hero"]}
        style={styles.plate}
      />

      <View style={styles.footer}>
        <Dots count={3} activeIndex={2} style={styles.dots} />
        <Button label="Enter the Registry" onPress={() => navigation.navigate("SignIn")} />
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
    maxWidth: 300,
  },
  plate: { height: 280, marginTop: 26 },
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
