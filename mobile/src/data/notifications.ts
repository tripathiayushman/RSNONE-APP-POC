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
    title: "Your Minaudière has left the bench.",
    meta: "The Meridian Minaudière, RSN-2417",
    time: "2h",
    read: false,
    tag: "DISPATCH",
  },
  {
    id: "notif-2",
    title: "A fitting has been reserved on your behalf.",
    meta: "Salon — Rome, 14 August",
    time: "Yesterday",
    read: false,
    tag: "SALON",
  },
  {
    id: "notif-3",
    title: "Your Attaché has been delivered.",
    meta: "Signed for at 14 Via dei Coronari",
    time: "3d",
    read: true,
  },
  {
    id: "notif-4",
    title: "The Bordeaux Tote is ready for collection.",
    meta: "Prepared at the leather goods bench",
    time: "5d",
    read: true,
    tag: "READY",
  },
  {
    id: "notif-5",
    title: "A note from the Atelier regarding your Signet.",
    meta: "Engraving proof attached for approval",
    time: "1w",
    read: true,
  },
  {
    id: "notif-6",
    title: "Your registry membership has been renewed.",
    meta: "Valid through August 2027",
    time: "2w",
    read: true,
  },
];
