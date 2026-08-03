export type NotificationItem = {
  id: string;
  title: string;
  meta?: string;
  time: string;
  read?: boolean;
  tag?: string;
};

export const notifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Your crossbody has been sealed for travel.",
    meta: "Bridle Leather Crossbody, RSN-2417",
    time: "2h",
    read: false,
    tag: "DISPATCH",
  },
  {
    id: "notif-2",
    title: "Referral reward credited to your wallet.",
    meta: "Sabina Gurung joined on your invitation",
    time: "Yesterday",
    read: false,
    tag: "REWARD",
  },
  {
    id: "notif-3",
    title: "Your wool runner has been delivered.",
    meta: "Signed for at Jhamsikhel, Lalitpur",
    time: "3d",
    read: true,
  },
  {
    id: "notif-4",
    title: "Ilam First Flush is back, one garden only.",
    meta: "Members-only allocation, low stock",
    time: "5d",
    read: true,
    tag: "MEMBERS",
  },
  {
    id: "notif-5",
    title: "The Seoul Skincare Edit passed RSN Tested.",
    meta: "Lab report attached to the record",
    time: "1w",
    read: true,
  },
  {
    id: "notif-6",
    title: "Your membership in the Global Family Club is active.",
    meta: "Admitted 14 June 2026 · No dues while admission is open",
    time: "2w",
    read: true,
  },
];
