import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { LinkRow } from "../components/LinkRow";
import { Toggle } from "../components/Toggle";
import { Accordion } from "../components/Accordion";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { colors, fonts, type as textType } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

type GroupLabelProps = { children: string };

function GroupLabel({ children }: GroupLabelProps) {
  return <Text style={styles.groupLabel}>{children}</Text>;
}

type PrefRowProps = {
  label: string;
  sub?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

function PrefRow({ label, sub, value, onValueChange }: PrefRowProps) {
  return (
    <View style={[styles.prefRow, sub ? styles.prefRowTight : styles.prefRowRoomy]}>
      <View style={styles.prefLabelWrap}>
        <Text style={styles.prefLabel}>
          {label}
          {sub ? <Text style={styles.prefSubLabel}>{"\n" + sub}</Text> : null}
        </Text>
      </View>
      <Toggle value={value} onValueChange={onValueChange} />
    </View>
  );
}

/**
 * 3.32 Settings — "The Quiet Machinery": account links, correspondence
 * preferences, and the apparatus (device-level toggles + legal reading).
 */
export default function Settings({ navigation }: Props) {
  const [orderMovements, setOrderMovements] = useState(true);
  const [registryOpenings, setRegistryOpenings] = useState(true);
  const [restockNotices, setRestockNotices] = useState(false);
  const [houseLetters, setHouseLetters] = useState(true);
  const [faceId, setFaceId] = useState(true);

  const handleNavigate = (key: BottomNavKey) => {
    if (key === "Registry") navigation.navigate("Home");
    else if (key === "Archive") navigation.navigate("ArchiveGrid");
    else if (key === "Bag") navigation.navigate("Bag");
    else navigation.navigate("Account");
  };

  const handleSignOut = () => {
    navigation.reset({ index: 0, routes: [{ name: "SignIn" }] });
  };

  return (
    <Screen>
      <TopBar variant="sub" title="Settings" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>The Quiet Machinery</Text>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Arranged once,{"\n"}then forgotten.</Text>
        </View>

        <GroupLabel>Account</GroupLabel>
        <View style={styles.catalogue}>
          <LinkRow
            label="Email"
            value="adeline@marchetti.it"
            onPress={() => navigation.navigate("Account")}
          />
          <LinkRow
            label="Password"
            value="changed in May"
            onPress={() => navigation.navigate("Account")}
          />
          <LinkRow
            label="Region & currency"
            value="Italy · USD"
            onPress={() => navigation.navigate("Account")}
          />
        </View>

        <GroupLabel>Correspondence</GroupLabel>
        <View style={styles.catalogue}>
          <PrefRow
            label="Order movements"
            sub="confirmed, at the bench, dispatched, delivered"
            value={orderMovements}
            onValueChange={setOrderMovements}
          />
          <PrefRow
            label="Registry openings"
            sub="four times a year, on the evening"
            value={registryOpenings}
            onValueChange={setRegistryOpenings}
          />
          <PrefRow
            label="Restock notices"
            sub="only for pieces on your shelf"
            value={restockNotices}
            onValueChange={setRestockNotices}
          />
          <PrefRow
            label="Letters from the house"
            sub="rare, and worth opening"
            value={houseLetters}
            onValueChange={setHouseLetters}
          />
        </View>

        <GroupLabel>The Apparatus</GroupLabel>
        <View style={styles.catalogue}>
          <PrefRow label="Face ID at the desk" value={faceId} onValueChange={setFaceId} />
          <Accordion title="Terms of the house">
            Read in full at the desk, or sent by post on request. In short: the house deals
            plainly, and expects the same in return.
          </Accordion>
          <Accordion title="Privacy, plainly stated">
            What the house keeps, it keeps to serve you — your registry, your fittings, your
            standing. It is never sold, and rarely shared.
          </Accordion>
        </View>

        <View style={styles.signOutWrap}>
          <Pressable onPress={handleSignOut} hitSlop={8}>
            <Text style={styles.signOut}>Sign Out</Text>
          </Pressable>
        </View>
        <View style={styles.versionWrap}>
          <Text style={styles.version}>RSN One · v1.0 · MMXXVI</Text>
        </View>
      </ScrollView>
      <BottomNav active="Account" onNavigate={handleNavigate} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 40 },
  eyebrow: { ...textType.eyebrow, paddingTop: 22, paddingHorizontal: 24 },
  hero: { paddingTop: 14, paddingHorizontal: 24, paddingBottom: 10 },
  heroTitle: { ...textType.displayMd },
  groupLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    letterSpacing: 2.4,
    textTransform: "uppercase",
    color: colors.brass,
    paddingTop: 34,
    paddingHorizontal: 24,
    paddingBottom: 6,
  },
  catalogue: { paddingHorizontal: 24 },
  prefRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  prefRowTight: { paddingVertical: 15 },
  prefRowRoomy: { paddingVertical: 19 },
  prefLabelWrap: { flex: 1 },
  prefLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 15,
    color: colors.cream,
  },
  prefSubLabel: {
    fontFamily: fonts.bodyRegularItalic,
    fontSize: 12,
    color: colors.creamDim,
  },
  signOutWrap: { alignItems: "center", paddingTop: 40, paddingBottom: 14, paddingHorizontal: 24 },
  signOut: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.creamDim,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
    paddingBottom: 3,
  },
  versionWrap: { alignItems: "center", paddingBottom: 34 },
  version: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: colors.creamDim,
    opacity: 0.6,
  },
});
