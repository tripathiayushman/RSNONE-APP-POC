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
  timeline: OrderTimelineStep[];
};

export const orders: Order[] = [
  {
    id: "RSN-2417",
    date: "28 July 2026",
    status: "In Transit",
    items: [
      { productId: "bordeaux-tote", qty: 1 },
      { productId: "marchetti-card-case", qty: 1 },
    ],
    total: "$5,740",
    timeline: [
      { title: "Order Placed", detail: "Received at the registry, payment confirmed.", done: true },
      { title: "Confirmed at Atelier", detail: "Assigned to the leather goods bench.", done: true },
      { title: "Prepared for Dispatch", detail: "Inspected, boxed, and sealed for travel.", done: true },
      { title: "In Transit", detail: "With the carrier, en route to Rome.", done: true },
      { title: "Delivered", detail: "Awaiting confirmation of receipt.", done: false },
    ],
  },
  {
    id: "RSN-2390",
    date: "2 July 2026",
    status: "Delivered",
    items: [{ productId: "attache-slim", qty: 1 }],
    total: "$5,200",
    timeline: [
      { title: "Order Placed", detail: "Received at the registry, payment confirmed.", done: true },
      { title: "Confirmed at Atelier", detail: "Assigned to the leather goods bench.", done: true },
      { title: "Prepared for Dispatch", detail: "Inspected, boxed, and sealed for travel.", done: true },
      { title: "In Transit", detail: "With the carrier, en route to Rome.", done: true },
      { title: "Delivered", detail: "Signed for at 14 Via dei Coronari.", done: true },
    ],
  },
  {
    id: "RSN-2355",
    date: "14 June 2026",
    status: "Delivered",
    items: [
      { productId: "vetiver-minuit", qty: 2 },
      { productId: "ambre-imperiale", qty: 1 },
    ],
    total: "$1,040",
    timeline: [
      { title: "Order Placed", detail: "Received at the registry, payment confirmed.", done: true },
      { title: "Confirmed at Atelier", detail: "Assigned to the fragrance bench.", done: true },
      { title: "Prepared for Dispatch", detail: "Inspected, boxed, and sealed for travel.", done: true },
      { title: "In Transit", detail: "With the carrier, en route to Rome.", done: true },
      { title: "Delivered", detail: "Signed for at 14 Via dei Coronari.", done: true },
    ],
  },
  {
    id: "RSN-2440",
    date: "1 August 2026",
    status: "Processing",
    items: [{ productId: "corsair-weekender", qty: 1 }],
    total: "$6,400",
    timeline: [
      { title: "Order Placed", detail: "Received at the registry, payment confirmed.", done: true },
      { title: "Confirmed at Atelier", detail: "Assigned to the leather goods bench.", done: true },
      { title: "Prepared for Dispatch", detail: "Awaiting final inspection.", done: false },
      { title: "In Transit", detail: "Not yet dispatched.", done: false },
      { title: "Delivered", detail: "Not yet dispatched.", done: false },
    ],
  },
];

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}
