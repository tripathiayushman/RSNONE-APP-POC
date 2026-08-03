import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Screen } from '../components/Screen';
import { TopBar } from '../components/TopBar';
import { BottomNav, BottomNavKey } from '../components/BottomNav';
import { LinkRow } from '../components/LinkRow';
import { Tag } from '../components/Tag';
import { PullQuote } from '../components/PullQuote';
import { Plate } from '../components/Plate';
import { colors, fonts } from '../theme/tokens';
import { useOrders, useShelf } from '../state/AppState';
import { addresses } from '../data/addresses';
import { correspondence } from '../data/correspondence';
import {
  activeReferralCount,
  formatCny,
  member,
  walletBalanceMinor,
} from '../data/member';

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

export default function Account({ navigation }: Props) {
  const shelf = useShelf();
  const { items: orders } = useOrders();
  const unreadCorrespondence = correspondence.filter((c) => !c.read).length;
  const addressCities = addresses.slice(0, 2).map((a) => a.city).join(' · ');

  const handleNavigate = (key: BottomNavKey) => {
    if (key === 'Registry') navigation.navigate('Home');
    else if (key === 'Archive') navigation.navigate('ArchiveGrid');
    else if (key === 'Bag') navigation.navigate('Bag');
    // Account is already the active tab — no-op.
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TopBar icons={[{ glyph: '⚲', onPress: () => navigation.navigate('Search') }]} />

        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Plate variant="sq" style={styles.avatarPlate} />
            <View style={styles.avatarInitialsWrap}>
              <Text style={styles.avatarInitials}>{member.initials}</Text>
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{member.name}</Text>
            <Text style={styles.profileMeta}>{member.since}</Text>
            <View style={styles.profileTagWrap}>
              <Tag label={member.tier} variant="brass" />
            </View>
          </View>
        </View>

        <Text style={styles.groupLbl}>Your Membership</Text>
        <View>
          <LinkRow
            number="01"
            label="Membership"
            value={member.memberNo}
            onPress={() => navigation.navigate('Membership')}
          />
          <LinkRow
            number="02"
            label="Wallet"
            value={formatCny(walletBalanceMinor)}
            onPress={() => navigation.navigate('Wallet')}
          />
          <LinkRow
            number="03"
            label="Invitations"
            value={`${activeReferralCount} admitted`}
            tag={{ label: member.referralCode, variant: 'brass' }}
            onPress={() => navigation.navigate('Referrals')}
          />
        </View>

        <Text style={styles.groupLbl}>Your Records</Text>
        <View>
          <LinkRow
            number="01"
            label="Acquisitions"
            value={`${orders.length} orders`}
            onPress={() => navigation.navigate('OrderHistory')}
          />
          <LinkRow
            number="02"
            label="The Shelf"
            value={`${shelf.items.length} saved`}
            onPress={() => navigation.navigate('Shelf')}
          />
          <LinkRow
            number="03"
            label="Correspondence"
            tag={unreadCorrespondence > 0 ? { label: `${unreadCorrespondence} New`, variant: 'brass' } : undefined}
            onPress={() => navigation.navigate('Correspondence')}
          />
          <LinkRow
            number="04"
            label="Addresses"
            value={addressCities}
            onPress={() => navigation.navigate('Addresses')}
          />
          <LinkRow
            number="05"
            label="Payment"
            value="Cash on delivery"
            onPress={() => navigation.navigate('PaymentMethods')}
          />
        </View>

        <Text style={styles.groupLbl}>The House</Text>
        <View>
          <LinkRow
            label="The Salon"
            tag={{ label: 'Members Only', variant: 'brass' }}
            onPress={() => navigation.navigate('SalonGate')}
          />
          <LinkRow label={`Write to ${member.concierge}`} onPress={() => navigation.navigate('Correspondence')} />
          <LinkRow label="Settings" onPress={() => navigation.navigate('Settings')} />
        </View>

        <PullQuote quote={'The house remembers,\nso you needn’t.'} attribution="Member Services" />

        <Pressable
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] })}
          hitSlop={8}
          style={styles.signOutWrap}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
      </ScrollView>

      <BottomNav active="Account" onNavigate={handleNavigate} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingTop: 30,
    paddingHorizontal: 24,
  },
  avatar: { width: 64, height: 64 },
  avatarPlate: { width: 64, height: 64 },
  avatarInitialsWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontFamily: fonts.displayLight,
    fontSize: 24,
    letterSpacing: 1.9,
    color: colors.cream,
  },
  profileInfo: { flex: 1 },
  profileName: {
    fontFamily: fonts.displayRegular,
    fontSize: 24,
    color: colors.cream,
  },
  profileMeta: {
    fontFamily: fonts.bodyRegularItalic,
    fontSize: 13,
    lineHeight: 21,
    color: colors.creamDim,
    marginTop: 3,
  },
  profileTagWrap: { marginTop: 8, alignItems: 'flex-start' },
  groupLbl: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    color: colors.brass,
    paddingTop: 34,
    paddingBottom: 6,
    paddingHorizontal: 24,
  },
  signOutWrap: { alignItems: 'center', paddingBottom: 30, marginTop: 20 },
  signOutText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.creamDim,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
    paddingBottom: 3,
  },
});
