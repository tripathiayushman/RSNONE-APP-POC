import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { NotificationRow } from "../components/NotificationRow";
import { PullQuote } from "../components/PullQuote";
import { Button } from "../components/Button";
import { BottomNav, BottomNavKey } from "../components/BottomNav";
import { Plate } from "../components/Plate";
import { correspondence as seedCorrespondence, CorrespondenceItem } from "../data/correspondence";
import { member } from "../data/member";
import { editorialImages } from "../assets/editorialImages";
import { colors, fonts, type as textType } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "Correspondence">;

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six"];

function numberWord(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

type Bucket = "Today" | "This Week" | "Earlier";

function bucketFor(time: string): Bucket {
  if (time.endsWith("h")) return "Today";
  if (time.endsWith("d")) return "This Week";
  return "Earlier";
}

const BUCKET_ORDER: Bucket[] = ["Today", "This Week", "Earlier"];

/**
 * 3.28 Correspondence — a scrolling letter list grouped by recency, sourced from
 * data/correspondence.ts. Tapping a letter marks it read via local state; clearing
 * every letter reveals the same empty content CorrespondenceEmpty shows on its own route.
 */
export default function Correspondence({ navigation }: Props) {
  const [items, setItems] = useState<CorrespondenceItem[]>(seedCorrespondence);

  const unreadCount = useMemo(() => items.filter((i) => !i.read).length, [items]);

  const groups = useMemo(() => {
    const map: Record<Bucket, CorrespondenceItem[]> = { Today: [], "This Week": [], Earlier: [] };
    items.forEach((item) => map[bucketFor(item.time)].push(item));
    return map;
  }, [items]);

  const markRead = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, read: true } : i)));
  };

  const markAllRead = () => {
    setItems((prev) => prev.map((i) => ({ ...i, read: true })));
  };

  const clearAll = () => {
    setItems([]);
  };

  const handleNavigate = (key: BottomNavKey) => {
    if (key === "Registry") navigation.navigate("Home");
    else if (key === "Archive") navigation.navigate("ArchiveGrid");
    else if (key === "Bag") navigation.navigate("Bag");
    else navigation.navigate("Account");
  };

  if (items.length === 0) {
    return (
      <Screen>
        <TopBar variant="sub" title="Correspondence" onBack={() => navigation.goBack()} />
        <View style={styles.grow}>
          <PullQuote
            quote={"No letters today. The house\nwrites only when it must."}
            attribution="— Member Services"
          />
          <View style={styles.emptyNoteWrap}>
            <Text style={styles.emptyNote}>
              When an order moves, a registry opens, or a saved piece returns, word arrives here
              first.
            </Text>
          </View>
          <View style={styles.emptyCtaWrap}>
            <Button
              variant="ghost"
              label="Choose What We May Send"
              onPress={() => navigation.navigate("Settings")}
            />
          </View>
        </View>
        <BottomNav active="Account" onNavigate={handleNavigate} />
      </Screen>
    );
  }

  const totalWord = capitalize(numberWord(items.length));
  const totalNoun = items.length === 1 ? "letter" : "letters";
  const unreadPhrase =
    unreadCount === 0 ? "all read" : `${numberWord(unreadCount)} unread`;

  return (
    <Screen>
      <TopBar variant="sub" title="Correspondence" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>Letters from the House</Text>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            {totalWord} {totalNoun},{"\n"}
            {unreadPhrase}.
          </Text>
        </View>

        <Plate
          variant="wide"
          plateNo={`Your concierge · ${member.concierge}`}
          ctaLine="Write"
          source={editorialImages["concierge"]}
        />

        {BUCKET_ORDER.map((bucket) =>
          groups[bucket].length > 0 ? (
            <View key={bucket}>
              <Text style={styles.groupLabel}>{bucket}</Text>
              <View style={styles.catalogue}>
                {groups[bucket].map((item) => (
                  <NotificationRow
                    key={item.id}
                    title={item.title}
                    meta={item.meta}
                    time={item.time}
                    read={item.read}
                    tag={item.tag}
                    onPress={() => markRead(item.id)}
                  />
                ))}
              </View>
            </View>
          ) : null
        )}

        <View style={styles.footerLinks}>
          <Pressable onPress={markAllRead} hitSlop={8}>
            <Text style={styles.footerLink}>Mark All Read</Text>
          </Pressable>
          <Text style={styles.footerDivider}>·</Text>
          <Pressable onPress={clearAll} hitSlop={8}>
            <Text style={styles.footerLink}>Clear All</Text>
          </Pressable>
        </View>
      </ScrollView>
      <BottomNav active="Account" onNavigate={handleNavigate} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, justifyContent: "center" },
  emptyNoteWrap: { paddingHorizontal: 24 },
  emptyNote: {
    ...textType.note,
    textAlign: "center",
    maxWidth: 270,
    alignSelf: "center",
  },
  emptyCtaWrap: { paddingHorizontal: 60, paddingTop: 32 },
  scrollContent: { paddingBottom: 40 },
  eyebrow: {
    ...textType.eyebrow,
    paddingTop: 22,
    paddingHorizontal: 24,
  },
  hero: { paddingTop: 14, paddingHorizontal: 24, paddingBottom: 16 },
  heroTitle: { ...textType.displayMd },
  groupLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    letterSpacing: 2.4,
    textTransform: "uppercase",
    color: colors.brass,
    paddingTop: 34,
    paddingHorizontal: 24,
    paddingBottom: 6,
  },
  catalogue: { paddingHorizontal: 24 },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  footerLink: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.creamDim,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
    paddingBottom: 3,
  },
  footerDivider: { color: colors.creamDim, fontSize: 10 },
});
