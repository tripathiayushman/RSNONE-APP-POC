import React from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { LotRow } from "../components/LotRow";
import { PullQuote } from "../components/PullQuote";
import { Tag } from "../components/Tag";
import { Button, CtaLine } from "../components/Button";
import { Icon } from "../components/Icon";
import { useBag, useShelf } from "../state/AppState";
import { colors, fonts, type } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "Shelf">;

const NUMBER_WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
];

function pieceCount(n: number): string {
  const word = n <= 10 ? NUMBER_WORDS[n] : String(n);
  return `${word} ${n === 1 ? "Piece" : "Pieces"}`;
}

function twoDigit(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * 3.20 / 3.21 · The Shelf — saved pieces (wishlist). Renders the same empty
 * content ShelfEmpty shows, inline, when the shelf has nothing saved.
 */
export default function Shelf({ navigation }: Props) {
  const shelf = useShelf();
  const bag = useBag();

  const handleNav = (key: BottomNavKey) => {
    if (key === "Registry") navigation.navigate("Home");
    else if (key === "Archive") navigation.navigate("ArchiveGrid");
    else if (key === "Bag") navigation.navigate("Bag");
    else navigation.navigate("Account");
  };

  const isEmpty = shelf.items.length === 0;

  return (
    <Screen>
      <TopBar
        icons={[
          { icon: "search", onPress: () => navigation.navigate("Search") },
          { icon: "heart", active: true },
        ]}
      />

      {isEmpty ? (
        <View style={styles.emptyWrap}>
          <PullQuote quote={"A shelf kept empty\nis a shelf kept ready."} attribution="House Philosophy" />
          <View style={styles.noteWrap}>
            <Text style={styles.note}>
              Touch the small heart on any piece and it will wait here — unhurried, unreserved, and
              yours to consider.
            </Text>
          </View>
          <View style={styles.ctaWrap}>
            <Button
              label="Browse the Archive"
              variant="secondary"
              onPress={() => navigation.navigate("ArchiveGrid")}
            />
          </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.eyebrow}>{`Saved · ${pieceCount(shelf.items.length)}`}</Text>
          <View style={styles.hero}>
            <Text style={styles.h1}>{"Your shelf,\nkept in waiting."}</Text>
          </View>

          <View style={styles.catalogue}>
            {shelf.items.map((product, index) => (
              <LotRow
                key={product.id}
                number={twoDigit(index + 1)}
                thumb
                productId={product.id}
                name={product.name}
                meta={`${product.meta} · ${product.category}`}
                onPress={() => navigation.navigate("ProductDetail", { productId: product.id })}
                rightSlot={
                  <>
                    <Text style={styles.price}>{product.price}</Text>
                    {product.membersOnly ? (
                      <Tag label="Members Only" variant="rose" />
                    ) : (
                      <CtaLine
                        label="Move to Bag"
                        variant="brass"
                        onPress={() => {
                          bag.addItem(product, 1);
                          shelf.toggle(product);
                        }}
                      />
                    )}
                    <Pressable hitSlop={8} onPress={() => shelf.toggle(product)}>
                      <Icon name="heart-filled" size={15} color={colors.brass} />
                    </Pressable>
                  </>
                }
              />
            ))}
          </View>

          <PullQuote quote={"What is saved is not yet\nspoken for."} attribution="The Registrar" />
        </ScrollView>
      )}

      <BottomNav active="Account" onNavigate={handleNav} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1, paddingBottom: 40 },
  eyebrow: { ...type.eyebrow, paddingTop: 28, paddingHorizontal: 24 },
  hero: { paddingTop: 14, paddingHorizontal: 24, paddingBottom: 22 },
  h1: { ...type.displayMd, fontSize: 32 },
  catalogue: { paddingHorizontal: 24 },
  price: {
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    letterSpacing: 0.4,
    color: colors.brass,
  },
  emptyWrap: { flex: 1, justifyContent: "center" },
  noteWrap: { paddingHorizontal: 24 },
  note: {
    ...type.note,
    textAlign: "center",
    maxWidth: 270,
    alignSelf: "center",
  },
  ctaWrap: { paddingHorizontal: 60, paddingTop: 32 },
});
