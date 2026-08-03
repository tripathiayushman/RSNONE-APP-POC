import React, { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { BrandMark } from "../components/BrandMark";
import { colors, fonts, type } from "../theme/tokens";

const ADVANCE_DELAY_MS = 2400;

/**
 * 3.01 · Splash — auto-branded title screen. Advances to OnboardingRegistry
 * either on a timer or on tap, whichever comes first.
 */
export default function Splash({ navigation }: NativeStackScreenProps<RootStackParamList, "Splash">) {
  const advanced = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      advance();
    }, ADVANCE_DELAY_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function advance() {
    if (advanced.current) return;
    advanced.current = true;
    navigation.replace("OnboardingRegistry");
  }

  return (
    <Screen>
      <Pressable style={styles.fill} onPress={advance}>
        <View style={styles.grow}>
          <LinearGradient
            colors={["transparent", colors.brass]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.line}
          />
          <Text style={styles.eyebrow}>Kathmandu · The Global Family Club</Text>
          <BrandMark width={244} style={styles.mark} />
          <Text style={styles.sub}>
            Sourced at origin, priced without theatre, sealed before it travels.
          </Text>
          <LinearGradient
            colors={[colors.brass, "transparent"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={[styles.line, styles.lineBottom]}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.micro}>By Introduction</Text>
        </View>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  grow: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  line: { width: 1, height: 64 },
  lineBottom: { marginTop: 26 },
  eyebrow: {
    ...type.eyebrow,
    marginTop: 26,
    textAlign: "center",
  },
  mark: { marginTop: 22 },
  sub: {
    ...type.sub,
    marginTop: 20,
    maxWidth: 260,
    textAlign: "center",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    alignItems: "center",
  },
  micro: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 2.2,
    textTransform: "uppercase",
    color: colors.creamDim,
  },
});
