/**
 * The signed-in member, their standing in the club, and the two ledgers that
 * make RSN One a family club rather than a shop: referrals and the wallet.
 *
 * Shapes mirror the production member portal (rsn-one/apps/web/src/app/member/
 * wallet, referrals) so this POC demonstrates the real model.
 */

export type ReferralStatus = "pending" | "active" | "cancelled";

export type Referral = {
  id: string;
  name: string;
  joined: string;
  status: ReferralStatus;
  /** Reward earned from this referral, in fen (1/100 CNY). */
  rewardMinor: number;
};

export type WalletTransactionKind =
  | "reward_release"
  | "leadership_bonus"
  | "community_bonus"
  | "purchase"
  | "voucher"
  | "withdraw"
  | "adjustment";

export type WalletTransaction = {
  id: string;
  kind: WalletTransactionKind;
  detail: string;
  date: string;
  /** Signed amount in fen (1/100 CNY). Negative for spend and withdrawals. */
  amountMinor: number;
};

export const member = {
  name: "Aarya Shrestha",
  initials: "AS",
  memberNo: "GFC-00412",
  since: "Admitted 14 June 2026 · Lalitpur",
  tier: "Founding Member",
  /** Admission is open and free while the club is building its first families. */
  duesNote: "No dues while admission is open",
  referralCode: "AARYA412",
  concierge: "Ms. Pratima Shakya",
};

export const referrals: Referral[] = [
  { id: "ref-1", name: "Sabina Gurung", joined: "2 Aug 2026", status: "active", rewardMinor: 12000 },
  { id: "ref-2", name: "Nabin Thapa", joined: "24 Jul 2026", status: "active", rewardMinor: 12000 },
  { id: "ref-3", name: "Rukmini Joshi", joined: "19 Jul 2026", status: "active", rewardMinor: 9000 },
  { id: "ref-4", name: "Dipesh Rai", joined: "11 Jul 2026", status: "pending", rewardMinor: 0 },
  { id: "ref-5", name: "Manisha K.C.", joined: "3 Jul 2026", status: "active", rewardMinor: 9000 },
  { id: "ref-6", name: "Bikash Lama", joined: "28 Jun 2026", status: "cancelled", rewardMinor: 0 },
];

export const walletTransactions: WalletTransaction[] = [
  {
    id: "tx-1",
    kind: "reward_release",
    detail: "Sabina Gurung — admission settled",
    date: "2 Aug 2026",
    amountMinor: 12000,
  },
  {
    id: "tx-2",
    kind: "leadership_bonus",
    detail: "Third family admitted this quarter",
    date: "28 Jul 2026",
    amountMinor: 5000,
  },
  {
    id: "tx-3",
    kind: "reward_release",
    detail: "Nabin Thapa — admission settled",
    date: "24 Jul 2026",
    amountMinor: 12000,
  },
  {
    id: "tx-4",
    kind: "purchase",
    detail: "Applied to order RSN-2390",
    date: "20 Jul 2026",
    amountMinor: -18000,
  },
  {
    id: "tx-5",
    kind: "reward_release",
    detail: "Rukmini Joshi — admission settled",
    date: "19 Jul 2026",
    amountMinor: 9000,
  },
  {
    id: "tx-6",
    kind: "community_bonus",
    detail: "Valley circle, June standing",
    date: "1 Jul 2026",
    amountMinor: 3500,
  },
  {
    id: "tx-7",
    kind: "voucher",
    detail: "Issued to Manisha K.C.",
    date: "28 Jun 2026",
    amountMinor: -4000,
  },
];

export const WALLET_TRANSACTION_LABEL: Record<WalletTransactionKind, string> = {
  reward_release: "Referral reward",
  leadership_bonus: "Leadership bonus",
  community_bonus: "Community bonus",
  purchase: "Applied to an order",
  voucher: "Voucher issued",
  withdraw: "Withdrawn",
  adjustment: "Adjustment",
};

/** Settled balance — everything already released into the wallet. */
export const walletBalanceMinor = walletTransactions.reduce((sum, t) => sum + t.amountMinor, 0);

/** Rewards earned but not yet released, held against the referring member. */
export const pendingRewardsMinor = 9000;

export const activeReferralCount = referrals.filter((r) => r.status === "active").length;

/**
 * Wallet and rewards are held in the house currency (CNY), the currency the
 * club settles with its suppliers in — order prices remain in NPR.
 */
export function formatCny(minor: number): string {
  const major = minor / 100;
  const sign = major < 0 ? "−" : "";
  return `${sign}¥${Math.abs(major).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
