import { NotificationItem } from "./notifications";

export type CorrespondenceItem = NotificationItem;

export const correspondence: CorrespondenceItem[] = [
  {
    id: "corr-1",
    title: "Your fitting request has been received.",
    meta: "Salon — Rome",
    time: "1h",
    read: false,
    tag: "SALON",
  },
  {
    id: "corr-2",
    title: "A note from the Atelier regarding your Attaché.",
    meta: "Re: strap length adjustment",
    time: "1d",
    read: false,
  },
  {
    id: "corr-3",
    title: "Certificate of provenance attached.",
    meta: "The Bordeaux Tote, RSN-2417",
    time: "4d",
    read: true,
    tag: "PROVENANCE",
  },
  {
    id: "corr-4",
    title: "Your invitation to the Autumn viewing.",
    meta: "12 September, by appointment",
    time: "1w",
    read: true,
    tag: "INVITATION",
  },
  {
    id: "corr-5",
    title: "Thank you for your recent order.",
    meta: "RSN-2390",
    time: "3w",
    read: true,
  },
];
