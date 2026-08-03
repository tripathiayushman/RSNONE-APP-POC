import { NotificationItem } from "./notifications";

export type CorrespondenceItem = NotificationItem;

export const correspondence: CorrespondenceItem[] = [
  {
    id: "corr-1",
    title: "Your sourcing request has been received.",
    meta: "Concierge — Kathmandu",
    time: "1h",
    read: false,
    tag: "CONCIERGE",
  },
  {
    id: "corr-2",
    title: "A note on your crossbody, from Walsall.",
    meta: "Re: strap length, cut to order",
    time: "1d",
    read: false,
  },
  {
    id: "corr-3",
    title: "Certificate of origin attached.",
    meta: "Bridle Leather Crossbody, RSN-2417",
    time: "4d",
    read: true,
    tag: "ORIGIN",
  },
  {
    id: "corr-4",
    title: "Your invitation to the autumn allocation.",
    meta: "12 September, members only",
    time: "1w",
    read: true,
    tag: "INVITATION",
  },
  {
    id: "corr-5",
    title: "Thank you — collected on delivery.",
    meta: "RSN-2390",
    time: "3w",
    read: true,
  },
];
