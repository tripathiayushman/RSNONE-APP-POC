import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { Button } from "../components/Button";
import { PullQuote } from "../components/PullQuote";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { type } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "BagEmpty">;

function handleBottomNav<RouteName extends keyof RootStackParamList>(
  navigation: NativeStackNavigationProp<RootStackParamList, RouteName>,
  key: BottomNavKey
) {
  if (key === "Registry") navigation.navigate("Home");
  else if (key === "Archive") navigation.navigate("ArchiveGrid");
  else if (key === "Bag") navigation.navigate("Bag");
  else navigation.navigate("Account");
}

/**
 * Directly-navigable empty-bag route. Bag.tsx renders this same visual inline
 * when useBag().items is empty — small, deliberate duplication between the two files.
 */
export default function BagEmpty({ navigation }: Props) {
  return (
    <Screen edges={["top"]}>
      <TopBar
        variant="default"
        icons={[
          { icon: "search", onPress: () => navigation.navigate("Search") },
          { icon: "heart", onPress: () => navigation.navigate("Shelf") },
        ]}
      />
      <Text style={styles.eyebrow}>Your Bag</Text>
      <View style={styles.grow}>
        <PullQuote quote={"An empty bag is a promise\nto your future self."} attribution="— House Philosophy" />
        <View style={styles.noteWrap}>
          <Text style={styles.note}>
            Nothing is held for you at the desk. The registry is open, and all six rooms are stocked.
          </Text>
        </View>
        <View style={styles.ctaWrap}>
          <Button variant="secondary" label="Enter the Archive" onPress={() => navigation.navigate("ArchiveGrid")} />
        </View>
      </View>
      <BottomNav active="Bag" onNavigate={(key) => handleBottomNav(navigation, key)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, justifyContent: "center" },
  eyebrow: { ...type.eyebrow, paddingHorizontal: 24, paddingTop: 28 },
  noteWrap: { paddingHorizontal: 24 },
  note: { ...type.note, textAlign: "center", maxWidth: 260, alignSelf: "center" },
  ctaWrap: { paddingHorizontal: 60, paddingTop: 32 },
});
