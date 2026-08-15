import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { PullQuote } from "../components/PullQuote";
import { Button } from "../components/Button";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { type as textType } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "CorrespondenceEmpty">;

/**
 * 3.29 Correspondence — Empty. Directly-navigable empty state; the same content
 * is duplicated inline in Correspondence.tsx when its local letter list reaches zero.
 */
export default function CorrespondenceEmpty({ navigation }: Props) {
  const handleNavigate = (key: BottomNavKey) => {
    if (key === "Registry") navigation.navigate("Home");
    else if (key === "Archive") navigation.navigate("ArchiveGrid");
    else if (key === "Bag") navigation.navigate("Bag");
    else navigation.navigate("Account");
  };

  return (
    <Screen edges={["top"]}>
      <TopBar variant="sub" title="Correspondence" onBack={() => navigation.goBack()} />
      <View style={styles.grow}>
        <PullQuote
          quote={"No letters today. The house\nwrites only when it must."}
          attribution="— Member Services"
        />
        <View style={styles.noteWrap}>
          <Text style={styles.note}>
            When an order moves, a registry opens, or a saved piece returns, word arrives here
            first.
          </Text>
        </View>
        <View style={styles.ctaWrap}>
          <Button
            variant="ghost"
            label="Choose What We May Send"
            onPress={() => navigation.navigate("Settings")}
          />
        </View>
      </View>
      <BottomNav active="Account" onNavigate={handleNavigate} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, justifyContent: "center" },
  noteWrap: { paddingHorizontal: 24 },
  note: {
    ...textType.note,
    textAlign: "center",
    maxWidth: 270,
    alignSelf: "center",
  },
  ctaWrap: { paddingHorizontal: 60, paddingTop: 32 },
});
