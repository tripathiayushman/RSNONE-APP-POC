import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { SectionHeader } from "../components/SectionHeader";
import { Button } from "../components/Button";
import {
  formatCny,
  pendingRewardsMinor,
  walletBalanceMinor,
  walletTransactions,
  WALLET_TRANSACTION_LABEL,
} from "../data/member";
import { colors, fonts, type } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "Wallet">;

/**
 * The member wallet — where referral rewards, leadership and community bonuses
 * settle, and where they are spent back into orders. Held in the house currency
 * (CNY), which is what the club settles with its suppliers in; order prices
 * stay in NPR.
 */
export default function Wallet({ navigation }: Props) {
  function handleNavigate(key: BottomNavKey) {
    if (key === "Registry") navigation.navigate("Home");
    else if (key === "Archive") navigation.navigate("ArchiveGrid");
    else if (key === "Bag") navigation.navigate("Bag");
    else navigation.navigate("Account");
  }

  const earned = walletTransactions
    .filter((t) => t.amountMinor > 0)
    .reduce((sum, t) => sum + t.amountMinor, 0);

  return (
    <Screen edges={["top"]}>
      <TopBar variant="sub" brandTitle onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.eyebrow}>The House Ledger</Text>

        <View style={styles.balanceBlock}>
          <Text style={styles.balanceLabel}>Available balance</Text>
          <Text style={styles.balance}>{formatCny(walletBalanceMinor)}</Text>
          <Text style={styles.balanceNote}>
            Held in the house currency. Applied against an order at the desk.
          </Text>
        </View>

        <View style={styles.metricRow}>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{formatCny(pendingRewardsMinor)}</Text>
            <Text style={styles.metricLabel}>Pending</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{formatCny(earned)}</Text>
            <Text style={styles.metricLabel}>Earned to date</Text>
          </View>
        </View>

        <SectionHeader title="Statement" actionLabel="All" tight />
        <View style={styles.ledger}>
          {walletTransactions.map((tx) => {
            const credit = tx.amountMinor >= 0;
            return (
              <View key={tx.id} style={styles.txRow}>
                <View style={styles.txInfo}>
                  <Text style={styles.txKind}>{WALLET_TRANSACTION_LABEL[tx.kind]}</Text>
                  <Text style={styles.txDetail} numberOfLines={1}>
                    {tx.detail}
                  </Text>
                </View>
                <View style={styles.txSide}>
                  <Text style={[styles.txAmount, credit ? styles.txCredit : styles.txDebit]}>
                    {credit ? "+" : ""}
                    {formatCny(tx.amountMinor)}
                  </Text>
                  <Text style={styles.txDate}>{tx.date}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.ctaWrap}>
          <Button
            label="Invite a Family"
            onPress={() => navigation.navigate("Referrals")}
          />
          <Button label="Withdraw" variant="ghost" disabled style={styles.ctaSecond} />
        </View>

        <Text style={styles.footnote}>
          Withdrawals open once the club's payment rails are live. Until then the balance is spent
          against orders.
        </Text>
      </ScrollView>
      <BottomNav active="Account" onNavigate={handleNavigate} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 36 },
  eyebrow: { ...type.eyebrow, paddingTop: 22, paddingHorizontal: 24 },
  balanceBlock: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 26 },
  balanceLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    color: colors.creamDim,
  },
  balance: {
    fontFamily: fonts.displayLight,
    fontSize: 46,
    lineHeight: 52,
    letterSpacing: 0.5,
    color: colors.cream,
    marginTop: 8,
  },
  balanceNote: { ...type.note, marginTop: 6, maxWidth: 290 },
  metricRow: {
    flexDirection: "row",
    alignItems: "stretch",
    marginHorizontal: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.hairline,
    paddingVertical: 18,
  },
  metric: { flex: 1 },
  metricDivider: { width: 1, backgroundColor: colors.hairline, marginHorizontal: 20 },
  metricValue: {
    fontFamily: fonts.displayRegular,
    fontSize: 22,
    color: colors.brass,
  },
  metricLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: colors.creamDim,
    marginTop: 5,
  },
  ledger: { paddingHorizontal: 24 },
  txRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  txInfo: { flex: 1, minWidth: 0 },
  txKind: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: colors.cream,
    marginBottom: 3,
  },
  txDetail: {
    fontFamily: fonts.bodyRegularItalic,
    fontSize: 12,
    color: colors.creamDim,
  },
  txSide: { alignItems: "flex-end", flexShrink: 0 },
  txAmount: {
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    letterSpacing: 0.3,
  },
  txCredit: { color: colors.brass },
  txDebit: { color: colors.creamDim },
  txDate: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.creamDim,
    marginTop: 5,
  },
  ctaWrap: { paddingHorizontal: 24, paddingTop: 30 },
  ctaSecond: { marginTop: 12 },
  footnote: {
    ...type.note,
    textAlign: "center",
    paddingHorizontal: 32,
    paddingTop: 22,
  },
});
