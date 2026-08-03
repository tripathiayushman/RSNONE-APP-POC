import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Screen } from '../components/Screen';
import { KV } from '../components/KV';
import { BrandMark } from '../components/BrandMark';
import { Button } from '../components/Button';
import { useOrders } from '../state/AppState';
import { colors, fonts, type } from '../theme/tokens';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderConfirmed'>;

export default function OrderConfirmed({ navigation }: Props) {
  const { lastOrderId, getById } = useOrders();
  const order = lastOrderId ? getById(lastOrderId) : undefined;
  const orderId = order?.id ?? 'RSN-2441';

  return (
    <Screen>
      <View style={styles.grow}>
        <View style={styles.centerBlock}>
          <LinearGradient
            colors={['transparent', colors.brass]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.divider}
          />
          <Text style={styles.eyebrow}>Order No. {orderId}</Text>
          <Text style={styles.h1}>It is done,{'\n'}and done well.</Text>
          <Text style={styles.sub}>
            Your pieces are being inspected and sealed. Nothing is collected until the parcel is in
            your hands.
          </Text>
        </View>

        <View style={styles.kvBlock}>
          <KV label="Dispatch expected" value="5 – 7 August" style={styles.kvTop} />
          <KV label="Carried to" value="Jhamsikhel, Lalitpur" />
          <KV label="Settlement" value="Cash on delivery" style={styles.kvBottom} />
        </View>

        <View style={styles.actionsBlock}>
          <Button
            variant="secondary"
            label="Follow the Order"
            onPress={() => navigation.navigate('OrderHistory')}
          />
          <Pressable
            onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
            hitSlop={8}
            style={styles.returnWrap}
          >
            <Text style={styles.returnText}>Return to the Registry</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.footer}>
        <BrandMark width={92} muted />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1, flexDirection: 'column', justifyContent: 'center' },
  centerBlock: { alignItems: 'center', paddingHorizontal: 24 },
  divider: { width: 1, height: 56 },
  eyebrow: { ...type.eyebrow, textAlign: 'center', paddingTop: 24 },
  h1: {
    fontFamily: fonts.displayLight,
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: 0.4,
    color: colors.cream,
    textAlign: 'center',
    marginTop: 16,
  },
  sub: {
    ...type.sub,
    textAlign: 'center',
    marginTop: 18,
    maxWidth: 280,
  },
  kvBlock: { paddingHorizontal: 24, paddingTop: 36 },
  kvTop: { borderTopWidth: 1, borderTopColor: colors.hairline, paddingTop: 16 },
  kvBottom: { borderBottomWidth: 1, borderBottomColor: colors.hairline, paddingBottom: 16 },
  actionsBlock: { paddingHorizontal: 60, paddingTop: 36 },
  returnWrap: { alignItems: 'center', marginTop: 22, alignSelf: 'center' },
  returnText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.cream,
    borderBottomWidth: 1,
    borderBottomColor: colors.brass,
    paddingBottom: 3,
  },
  footer: { alignItems: 'center', paddingBottom: 40 },
});
