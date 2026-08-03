import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { Plate } from "../components/Plate";
import { KV } from "../components/KV";
import { Tag } from "../components/Tag";
import { Button } from "../components/Button";
import { SectionHeader } from "../components/SectionHeader";
import { PullQuote } from "../components/PullQuote";
import { editorialImages } from "../assets/editorialImages";
import { member, activeReferralCount } from "../data/member";
import { colors, fonts, type } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "Membership">;

/** What admission to the club actually gives a member. */
const PRIVILEGES: { number: string; title: string; body: string }[] = [
  {
    number: "I",
    title: "Member pricing",
    body: "The house buys at origin and passes the difference on. Prices you see are the prices members pay — there is no list price above them.",
  },
  {
    number: "II",
    title: "The sealed register",
    body: "Allocations too small to list openly — one garden, one loom, one season — are offered to members first and quietly.",
  },
  {
    number: "III",
    title: "Referral rewards",
    body: "Bring a family into the club and the house credits your wallet when their admission settles.",
  },
  {
    number: "IV",
    title: "A concierge",
    body: "A named person at the desk who will source what the registry does not yet carry.",
  },
];

/**
 * The member's standing in the Global Family Club — admission, what it grants,
 * and the terms. Admission is open and free while the club builds its first
 * families; there is no gateway to charge against yet.
 */
export default function Membership({ navigation }: Props) {
  function handleNavigate(key: BottomNavKey) {
    if (key === "Registry") navigation.navigate("Home");
    else if (key === "Archive") navigation.navigate("ArchiveGrid");
    else if (key === "Bag") navigation.navigate("Bag");
    else navigation.navigate("Account");
  }

  return (
    <Screen edges={["top"]}>
      <TopBar variant="sub" brandTitle onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.eyebrow}>The Global Family Club</Text>
        <View style={styles.hero}>
          <Text style={styles.h1}>Admitted, and{"\n"}in good standing.</Text>
        </View>

        <Plate
          variant="wide"
          plateNo={member.memberNo}
          ctaLine={member.tier}
          source={editorialImages["membership-hero"]}
        />

        <View style={styles.standingRow}>
          <Tag label="Active" variant="brass" />
          <Text style={styles.standingNote}>{member.duesNote}</Text>
        </View>

        <View style={styles.kvWrap}>
          <KV label="Member" value={member.name} />
          <KV label="Member number" value={member.memberNo} />
          <KV label="Standing" value={member.tier} />
          <KV label="Admitted" value="14 June 2026" />
          <KV label="Families brought in" value={`${activeReferralCount}`} />
          <KV label="Concierge" value={member.concierge} />
          <KV label="Founding membership" value="Rs. 4,999 a year" />
          <KV label="Charged today" value="Waived — admission is open" total />
        </View>

        <SectionHeader title="What Admission Grants" />
        <View style={styles.privileges}>
          {PRIVILEGES.map((p) => (
            <View key={p.number} style={styles.privilege}>
              <Text style={styles.privilegeNum}>{p.number}</Text>
              <View style={styles.privilegeBody}>
                <Text style={styles.privilegeTitle}>{p.title}</Text>
                <Text style={styles.privilegeText}>{p.body}</Text>
              </View>
            </View>
          ))}
        </View>

        <PullQuote
          quote={"A club is its families,\nnot its catalogue."}
          attribution="— The Founding Note"
        />

        <View style={styles.ctaWrap}>
          <Button
            label="Invite a Family"
            onPress={() => navigation.navigate("Referrals")}
          />
          <Button
            label="View the Wallet"
            variant="secondary"
            onPress={() => navigation.navigate("Wallet")}
            style={styles.ctaSecond}
          />
        </View>

        <Text style={styles.footnote}>
          Admission is free while the club is building its first families. Members will be written to
          before that ever changes.
        </Text>
      </ScrollView>
      <BottomNav active="Account" onNavigate={handleNavigate} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 36 },
  eyebrow: { ...type.eyebrow, paddingTop: 22, paddingHorizontal: 24 },
  hero: { paddingTop: 14, paddingHorizontal: 24, paddingBottom: 24 },
  h1: { ...type.displayMd },
  standingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  standingNote: { ...type.note, flex: 1 },
  kvWrap: {
    paddingHorizontal: 24,
    paddingTop: 22,
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  privileges: { paddingHorizontal: 24, gap: 26 },
  privilege: { flexDirection: "row", gap: 16 },
  privilegeNum: {
    fontFamily: fonts.displayRegular,
    fontSize: 13,
    color: colors.brass,
    width: 26,
    paddingTop: 3,
  },
  privilegeBody: { flex: 1 },
  privilegeTitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 16,
    color: colors.cream,
    marginBottom: 5,
  },
  privilegeText: { ...type.bodyDim, fontSize: 14, lineHeight: 22 },
  ctaWrap: { paddingHorizontal: 24, paddingTop: 8 },
  ctaSecond: { marginTop: 12 },
  footnote: {
    ...type.note,
    textAlign: "center",
    paddingHorizontal: 32,
    paddingTop: 26,
  },
});
