export type OrderStatus = "Processing" | "In Transit" | "Delivered";

export type OrderLineItem = {
  productId: string;
  qty: number;
};

export type OrderTimelineStep = {
  title: string;
  detail: string;
  done: boolean;
};

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderLineItem[];
  total: string;
  /** How it is being settled — the house ships cash on delivery today. */
  payment: string;
  timeline: OrderTimelineStep[];
};

export const orders: Order[] = [
  {
    id: "RSN-2417",
    date: "28 July 2026",
    status: "In Transit",
    items: [
      { productId: "bridle-leather-crossbody", qty: 1 },
      { productId: "pebbled-card-wallet", qty: 1 },
    ],
    total: "Rs. 32,550",
    payment: "Cash on delivery",
    timeline: [
      { title: "Order Placed", detail: "Received at the registry, awaiting collection on delivery.", done: true },
      { title: "Sourced at Origin", detail: "Released from the Walsall workshop.", done: true },
      { title: "Inspected and Sealed", detail: "Checked against the house standard, wax-sealed for travel.", done: true },
      { title: "In Transit", detail: "With the carrier, en route to Kathmandu.", done: true },
      { title: "Delivered", detail: "Awaiting confirmation of receipt.", done: false },
    ],
  },
  {
    id: "RSN-2390",
    date: "2 July 2026",
    status: "Delivered",
    items: [{ productId: "hand-knotted-wool-runner", qty: 1 }],
    total: "Rs. 41,200",
    payment: "Cash on delivery",
    timeline: [
      { title: "Order Placed", detail: "Received at the registry, awaiting collection on delivery.", done: true },
      { title: "Sourced at Origin", detail: "Off the loom in the Kathmandu Valley.", done: true },
      { title: "Inspected and Sealed", detail: "Checked against the house standard, wax-sealed for travel.", done: true },
      { title: "In Transit", detail: "With the carrier, en route to Lalitpur.", done: true },
      { title: "Delivered", detail: "Signed for at Jhamsikhel, Lalitpur.", done: true },
    ],
  },
  {
    id: "RSN-2355",
    date: "14 June 2026",
    status: "Delivered",
    items: [
      { productId: "ilam-first-flush", qty: 2 },
      { productId: "himalayan-wildflower-honey", qty: 1 },
    ],
    total: "Rs. 9,550",
    payment: "Cash on delivery",
    timeline: [
      { title: "Order Placed", detail: "Received at the registry, awaiting collection on delivery.", done: true },
      { title: "Sourced at Origin", detail: "Packed at the garden in Ilam within the month.", done: true },
      { title: "Inspected and Sealed", detail: "Checked against the house standard, wax-sealed for travel.", done: true },
      { title: "In Transit", detail: "With the carrier, en route to Lalitpur.", done: true },
      { title: "Delivered", detail: "Signed for at Jhamsikhel, Lalitpur.", done: true },
    ],
  },
  {
    id: "RSN-2440",
    date: "1 August 2026",
    status: "Processing",
    items: [{ productId: "stone-temperature-kettle", qty: 1 }],
    total: "Rs. 11,000",
    payment: "Cash on delivery",
    timeline: [
      { title: "Order Placed", detail: "Received at the registry, awaiting collection on delivery.", done: true },
      { title: "Sourced at Origin", detail: "Allocated from the Seoul consignment.", done: true },
      { title: "Inspected and Sealed", detail: "Awaiting final inspection.", done: false },
      { title: "In Transit", detail: "Not yet dispatched.", done: false },
      { title: "Delivered", detail: "Not yet dispatched.", done: false },
    ],
  },
];

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}
