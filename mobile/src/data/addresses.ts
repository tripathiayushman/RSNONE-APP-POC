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
    id: "addr-jhamsikhel",
    name: "Aarya Shrestha",
    street: "Jhamsikhel Marg, Ward 3",
    city: "Lalitpur",
    postal: "44700",
    country: "Nepal",
    preferred: true,
  },
  {
    id: "addr-baluwatar",
    name: "Aarya Shrestha — Office",
    street: "Baluwatar, Ward 4",
    city: "Kathmandu",
    postal: "44600",
    country: "Nepal",
  },
  {
    id: "addr-pokhara",
    name: "Aarya Shrestha — Family",
    street: "Lakeside, Ward 6",
    city: "Pokhara",
    postal: "33700",
    country: "Nepal",
  },
];
