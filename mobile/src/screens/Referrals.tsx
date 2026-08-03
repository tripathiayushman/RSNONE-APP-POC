import React, { useState } from "react";
import { ScrollView, Share, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { BrandMark } from "../components/BrandMark";
import { SectionHeader } from "../components/SectionHeader";
import { Button } from "../components/Button";
import { Tag, TagVariant } from "../components/Tag";
import { LotRow } from "../components/LotRow";
import {
  activeReferralCount,
  formatCny,
  member,
  pendingRewardsMinor,
  referrals,
  ReferralStatus,
} from "../data/member";
import { colors, fonts, type } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "Referrals">;

const STATUS: Record<ReferralStatus, { label: string; variant: TagVariant }> = {
  active: { label: "Admitted", variant: "brass" },
  pending: { label: "Pending", variant: "default" },
  cancelled: { label: "Lapsed", variant: "default" },
};

/**
 * The invitation register. A member's code, the families admitted on it, and
 * what each has credited to the wallet — the mechanism the club grows by.
 */
export default function Referrals({ navigation }: Props) {
  function handleNavigate(key: BottomNavKey) {
    if (key === "Registry") navigation.navigate("Home");
    else if (key === "Archive") navigation.navigate("ArchiveGrid");
    else if (key === "Bag") navigation.navigate("Bag");
    else navigation.navigate("Account");
  }

  const totalEarned = referrals.reduce((sum, r) => sum + r.rewardMinor, 0);
  const [copied, setCopied] = useState(false);

  const invitation =
    `${member.name} has invited you into RSN One, the Global Family Club. ` +
    `Admission is free while the first families are being admitted — ` +
    `use member code ${member.referralCode} when you join.`;

  async function shareInvitation() {
    try {
      await Share.share({ message: invitation });
    } catch {
      // The share sheet was dismissed — nothing to recover from in a POC.
    }
  }

  function copyCode() {
    // No clipboard dependency in this POC; the label confirms the action.
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Screen edges={["top"]}>
      <TopBar variant="sub" brandTitle onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.eyebrow}>Bring a Family In</Text>
        <View style={styles.hero}>
          <Text style={styles.h1}>The club grows{"\n"}by introduction.</Text>
          <Text style={[type.sub, styles.subWide]}>
            Pass your code on. When their admission settles, the house credits your wallet.
          </Text>
        </View>

        <View style={styles.card}>
          <BrandMark width={120} style={styles.cardMark} />
          <Text style={styles.cardLabel}>Your invitation code</Text>
          <Text style={styles.code}>{member.referralCode}</Text>
          <Text style={styles.cardHolder}>{member.name} · {member.memberNo}</Text>
        </View>

        <View style={styles.ctaWrap}>
          <Button label="Share the Invitation" onPress={shareInvitation} />
          <Button
            label={copied ? "Copied" : "Copy Code"}
            variant="secondary"
            onPress={copyCode}
            style={styles.ctaSecond}
          />
        </View>

        <View style={styles.metricRow}>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{activeReferralCount}</Text>
            <Text style={styles.metricLabel}>Admitted</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{formatCny(totalEarned)}</Text>
            <Text style={styles.metricLabel}>Credited</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{formatCny(pendingRewardsMinor)}</Text>
            <Text style={styles.metricLabel}>Pending</Text>
          </View>
        </View>

        <SectionHeader
          title="Admitted on Your Word"
          actionLabel="Wallet"
          tight
          onAction={() => navigation.navigate("Wallet")}
        />
        <View style={styles.list}>
          {referrals.map((r, index) => (
            <LotRow
              key={r.id}
              number={String(index + 1).padStart(2, "0")}
              name={r.name}
              meta={`Joined ${r.joined}`}
              rightSlot={
                <>
                  <Text style={styles.reward}>
                    {r.rewardMinor > 0 ? formatCny(r.rewardMinor) : "—"}
                  </Text>
                  <Tag label={STATUS[r.status].label} variant={STATUS[r.status].variant} />
                </>
              }
            />
          ))}
        </View>

        <Text style={styles.footnote}>
          A reward settles once the invited family completes admission. Lapsed invitations credit
          nothing, and nothing is ever clawed back from a settled reward.
        </Text>
      </ScrollView>
      <BottomNav active="Account" onNavigate={handleNavigate} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 36 },
  eyebrow: { ...type.eyebrow, paddingTop: 22, paddingHorizontal: 24 },
  hero: { paddingTop: 14, paddingHorizontal: 24, paddingBottom: 26 },
  h1: { ...type.displayMd },
  subWide: { marginTop: 12, maxWidth: 300 },
  card: {
    marginHorizontal: 24,
    paddingVertical: 28,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: colors.brass,
    alignItems: "center",
    backgroundColor: "rgba(201,143,127,0.05)",
  },
  cardMark: { marginBottom: 20 },
  cardLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: colors.creamDim,
  },
  code: {
    fontFamily: fonts.displayLight,
    fontSize: 34,
    letterSpacing: 6,
    color: colors.cream,
    marginTop: 10,
  },
  cardHolder: { ...type.note, marginTop: 10 },
  ctaWrap: { paddingHorizontal: 24, paddingTop: 22 },
  ctaSecond: { marginTop: 12 },
  metricRow: {
    flexDirection: "row",
    alignItems: "stretch",
    marginHorizontal: 24,
    marginTop: 30,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.hairline,
    paddingVertical: 18,
  },
  metric: { flex: 1 },
  metricDivider: { width: 1, backgroundColor: colors.hairline, marginHorizontal: 16 },
  metricValue: {
    fontFamily: fonts.displayRegular,
    fontSize: 20,
    color: colors.brass,
  },
  metricLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: colors.creamDim,
    marginTop: 5,
  },
  list: { paddingHorizontal: 24 },
  reward: {
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    letterSpacing: 0.3,
    color: colors.brass,
    marginBottom: 8,
  },
  footnote: {
    ...type.note,
    textAlign: "center",
    paddingHorizontal: 32,
    paddingTop: 30,
  },
});
