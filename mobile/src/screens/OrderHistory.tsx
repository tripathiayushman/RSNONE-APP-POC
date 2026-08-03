import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { LotRow, LotRowTagVariant } from "../components/LotRow";
import { PullQuote } from "../components/PullQuote";
import { OrderStatus } from "../data/orders";
import { useOrders } from "../state/AppState";
import { getProductById } from "../data/products";
import { type } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "OrderHistory">;

const NUMBER_WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
];

function numberWord(n: number): string {
  return n <= 10 ? NUMBER_WORDS[n] : String(n);
}

function twoDigit(n: number): string {
  return String(n).padStart(2, "0");
}

const STATUS_TAG: Record<OrderStatus, LotRowTagVariant> = {
  Processing: "brass",
  "In Transit": "brass",
  Delivered: "quiet",
};

/** 3.23 · Acquisitions — Order History, including anything placed this session. */
export default function OrderHistory({ navigation }: Props) {
  const { items: orders } = useOrders();

  const handleNav = (key: BottomNavKey) => {
    if (key === "Registry") navigation.navigate("Home");
    else if (key === "Archive") navigation.navigate("ArchiveGrid");
    else if (key === "Bag") navigation.navigate("Bag");
    else navigation.navigate("Account");
  };

  return (
    <Screen>
      <TopBar variant="sub" title="Acquisitions" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>Your Records · Since June 2026</Text>
        <View style={styles.hero}>
          <Text style={styles.h1}>{`${numberWord(orders.length)} entries,\nnone regretted.`}</Text>
        </View>

        <View style={styles.catalogue}>
          {orders.map((order, index) => {
            const pieceTotal = order.items.reduce((sum, line) => sum + line.qty, 0);
            const productNames = order.items
              .map((line) => getProductById(line.productId)?.name)
              .filter((name): name is string => Boolean(name))
              .join(" · ");

            return (
              <LotRow
                key={order.id}
                number={twoDigit(index + 1)}
                name={`Order ${order.id}`}
                meta={`Placed ${order.date} · ${pieceTotal} piece${pieceTotal === 1 ? "" : "s"} · ${productNames}`}
                price={order.total}
                tag={{ label: order.status, variant: STATUS_TAG[order.status] }}
                onPress={() => navigation.navigate("OrderDetail", { orderId: order.id })}
              />
            );
          })}
        </View>

        <PullQuote
          quote={"An acquisition is a decision\nyou make only once."}
          attribution="House Philosophy"
        />
      </ScrollView>

      <BottomNav active="Account" onNavigate={handleNav} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1, paddingBottom: 40 },
  eyebrow: { ...type.eyebrow, paddingTop: 22, paddingHorizontal: 24 },
  hero: { paddingTop: 14, paddingHorizontal: 24, paddingBottom: 22 },
  h1: { ...type.displayMd, fontSize: 32 },
  catalogue: { paddingHorizontal: 24 },
});
