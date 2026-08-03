import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { PullQuote } from "../components/PullQuote";
import { Button } from "../components/Button";
import { type } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "ShelfEmpty">;

/** 3.21 · The Shelf — Empty, a directly-navigable route (also mirrored inline by Shelf.tsx). */
export default function ShelfEmpty({ navigation }: Props) {
  const handleNav = (key: BottomNavKey) => {
    if (key === "Registry") navigation.navigate("Home");
    else if (key === "Archive") navigation.navigate("ArchiveGrid");
    else if (key === "Bag") navigation.navigate("Bag");
    else navigation.navigate("Account");
  };

  return (
    <Screen>
      <TopBar
        icons={[
          { icon: "search", onPress: () => navigation.navigate("Search") },
          { icon: "heart", active: true },
        ]}
      />
      <Text style={styles.eyebrow}>Saved</Text>

      <View style={styles.grow}>
        <PullQuote quote={"A shelf kept empty\nis a shelf kept ready."} attribution="House Philosophy" />
        <View style={styles.noteWrap}>
          <Text style={styles.note}>
            Touch the small heart on any piece and it will wait here — unhurried, unreserved, and
            yours to consider.
          </Text>
        </View>
        <View style={styles.ctaWrap}>
          <Button
            label="Browse the Archive"
            variant="secondary"
            onPress={() => navigation.navigate("ArchiveGrid")}
          />
        </View>
      </View>

      <BottomNav active="Account" onNavigate={handleNav} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  eyebrow: { ...type.eyebrow, paddingTop: 28, paddingHorizontal: 24 },
  grow: { flex: 1, flexDirection: "column", justifyContent: "center" },
  noteWrap: { paddingHorizontal: 24 },
  note: {
    ...type.note,
    textAlign: "center",
    maxWidth: 270,
    alignSelf: "center",
  },
  ctaWrap: { paddingHorizontal: 60, paddingTop: 32 },
});
