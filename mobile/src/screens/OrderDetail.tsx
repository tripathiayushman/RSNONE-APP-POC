import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { LotRow } from "../components/LotRow";
import { Timeline } from "../components/Timeline";
import { KV } from "../components/KV";
import { Button } from "../components/Button";
import { getOrderById, OrderStatus } from "../data/orders";
import { getProductById } from "../data/products";
import { type } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "OrderDetail">;

function twoDigit(n: number): string {
  return String(n).padStart(2, "0");
}

function toCurrency(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

function parseCurrency(value: string): number {
  const digits = value.replace(/[^0-9]/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

const HERO_COPY: Record<OrderStatus, string> = {
  Processing: "Patience — it is\nbeing made.",
  "In Transit": "In transit, and closer\nwith every hour.",
  Delivered: "Delivered, and now\nyours to keep.",
};

/** 3.24 · Order Detail — route.params.orderId looked up in data/orders.ts. */
export default function OrderDetail({ navigation, route }: Props) {
  const order = getOrderById(route.params.orderId);

  const handleNav = (key: BottomNavKey) => {
    if (key === "Registry") navigation.navigate("Home");
    else if (key === "Archive") navigation.navigate("ArchiveGrid");
    else if (key === "Bag") navigation.navigate("Bag");
    else navigation.navigate("Account");
  };

  if (!order) {
    return (
      <Screen>
        <TopBar variant="sub" title="Order" onBack={() => navigation.goBack()} />
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>This order could not be found in the registry.</Text>
        </View>
        <BottomNav active="Account" onNavigate={handleNav} />
      </Screen>
    );
  }

  const subtotal = order.items.reduce((sum, line) => {
    const product = getProductById(line.productId);
    return sum + (product ? product.priceValue * line.qty : 0);
  }, 0);
  const total = parseCurrency(order.total);
  const duties = total - subtotal;

  return (
    <Screen>
      <TopBar variant="sub" title={`Order ${order.id}`} onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>{`Placed ${order.date} · ${order.status}`}</Text>
        <View style={styles.hero}>
          <Text style={styles.h1}>{HERO_COPY[order.status]}</Text>
        </View>

        <View style={styles.timelineWrap}>
          <Timeline items={order.timeline} />
        </View>

        <Text style={styles.groupLbl}>The Pieces</Text>
        <View style={styles.catalogue}>
          {order.items.map((line, index) => {
            const product = getProductById(line.productId);
            if (!product) return null;
            return (
              <LotRow
                key={`${line.productId}-${index}`}
                number={twoDigit(index + 1)}
                thumb
                productId={product.id}
                name={product.name}
                meta={line.qty > 1 ? `${product.meta} · Qty ${line.qty}` : product.meta}
                price={toCurrency(product.priceValue * line.qty)}
                onPress={() => navigation.navigate("ProductDetail", { productId: product.id })}
              />
            );
          })}
        </View>

        <View style={styles.kvWrap}>
          <KV label="Carriage" value="House courier · complimentary" />
          <KV label="Settled by" value={`Amex ···· ${order.id.slice(-4)}`} />
          <KV label="Duties & taxes" value={duties > 0 ? toCurrency(duties) : "Included"} />
          <KV label="Total" value={order.total} total />
        </View>

        <View style={styles.btnRow}>
          <Button label="Invoice, PDF" variant="ghost" style={styles.btnFlex} />
          <Button
            label="Write to the Concierge"
            variant="secondary"
            onPress={() => navigation.navigate("Correspondence")}
            style={styles.btnFlex}
          />
        </View>
      </ScrollView>

      <BottomNav active="Account" onNavigate={handleNav} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1, paddingBottom: 40 },
  eyebrow: { ...type.eyebrow, paddingTop: 22, paddingHorizontal: 24 },
  hero: { paddingTop: 14, paddingHorizontal: 24, paddingBottom: 10 },
  h1: { ...type.displayMd, fontSize: 32 },
  timelineWrap: { paddingHorizontal: 24, paddingTop: 16 },
  groupLbl: { ...type.eyebrow, paddingTop: 20, paddingHorizontal: 24, paddingBottom: 6 },
  catalogue: { paddingHorizontal: 24 },
  kvWrap: { paddingHorizontal: 24, paddingTop: 14 },
  btnRow: { flexDirection: "row", gap: 12, paddingHorizontal: 24, paddingTop: 28 },
  btnFlex: { flex: 1 },
  notFound: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 },
  notFoundText: { ...type.bodyDim, textAlign: "center" },
});
