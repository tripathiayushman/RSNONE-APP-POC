export type Address = {
  id: string;
  name: string;
  street: string;
  city: string;
  postal: string;
  country: string;
  preferred?: boolean;
};

export const addresses: Address[] = [
  {
    id: "addr-rome",
    name: "A. Marchetti",
    street: "14 Via dei Coronari",
    city: "Rome",
    postal: "00186",
    country: "Italy",
    preferred: true,
  },
  {
    id: "addr-paris",
    name: "A. Marchetti — Atelier",
    street: "22 Rue Cambon",
    city: "Paris",
    postal: "75001",
    country: "France",
  },
  {
    id: "addr-london",
    name: "A. Marchetti — Residence",
    street: "88 Mount Street",
    city: "London",
    postal: "W1K 2SF",
    country: "United Kingdom",
  },
];
