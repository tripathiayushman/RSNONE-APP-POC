import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "./types";

import Splash from "../screens/Splash";
import OnboardingRegistry from "../screens/OnboardingRegistry";
import OnboardingProvenance from "../screens/OnboardingProvenance";
import OnboardingClub from "../screens/OnboardingClub";
import SignIn from "../screens/SignIn";
import CreateAccount from "../screens/CreateAccount";
import Home from "../screens/Home";
import ArchiveGrid from "../screens/ArchiveGrid";
import ArchiveList from "../screens/ArchiveList";
import Listing from "../screens/Listing";
import FilterSheet from "../screens/FilterSheet";
import Search from "../screens/Search";
import SearchEmpty from "../screens/SearchEmpty";
import ProductDetail from "../screens/ProductDetail";
import Bag from "../screens/Bag";
import BagEmpty from "../screens/BagEmpty";
import CheckoutCarriage from "../screens/CheckoutCarriage";
import CheckoutPayment from "../screens/CheckoutPayment";
import CheckoutReview from "../screens/CheckoutReview";
import OrderConfirmed from "../screens/OrderConfirmed";
import Shelf from "../screens/Shelf";
import ShelfEmpty from "../screens/ShelfEmpty";
import Account from "../screens/Account";
import Membership from "../screens/Membership";
import Wallet from "../screens/Wallet";
import Referrals from "../screens/Referrals";
import OrderHistory from "../screens/OrderHistory";
import OrderDetail from "../screens/OrderDetail";
import Addresses from "../screens/Addresses";
import AddressForm from "../screens/AddressForm";
import PaymentMethods from "../screens/PaymentMethods";
import Correspondence from "../screens/Correspondence";
import CorrespondenceEmpty from "../screens/CorrespondenceEmpty";
import SalonGate from "../screens/SalonGate";
import SalonRooms from "../screens/SalonRooms";
import Settings from "../screens/Settings";

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * The single flat native-stack of all 36 RSN One routes. NavigationContainer lives
 * here (not App.tsx). Every screen builds its own TopBar, so headers are disabled
 * globally. FilterSheet is presented as a transparent modal sliding up from the
 * bottom so it overlays Listing instead of replacing it.
 */
export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="OnboardingRegistry" component={OnboardingRegistry} />
        <Stack.Screen name="OnboardingProvenance" component={OnboardingProvenance} />
        <Stack.Screen name="OnboardingClub" component={OnboardingClub} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ArchiveGrid" component={ArchiveGrid} />
        <Stack.Screen name="ArchiveList" component={ArchiveList} />
        <Stack.Screen name="Listing" component={Listing} />
        <Stack.Screen
          name="FilterSheet"
          component={FilterSheet}
          options={{
            presentation: "transparentModal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="SearchEmpty" component={SearchEmpty} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Bag" component={Bag} />
        <Stack.Screen name="BagEmpty" component={BagEmpty} />
        <Stack.Screen name="CheckoutCarriage" component={CheckoutCarriage} />
        <Stack.Screen name="CheckoutPayment" component={CheckoutPayment} />
        <Stack.Screen name="CheckoutReview" component={CheckoutReview} />
        <Stack.Screen name="OrderConfirmed" component={OrderConfirmed} />
        <Stack.Screen name="Shelf" component={Shelf} />
        <Stack.Screen name="ShelfEmpty" component={ShelfEmpty} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Membership" component={Membership} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="Referrals" component={Referrals} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />
        <Stack.Screen name="OrderDetail" component={OrderDetail} />
        <Stack.Screen name="Addresses" component={Addresses} />
        <Stack.Screen name="AddressForm" component={AddressForm} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
        <Stack.Screen name="Correspondence" component={Correspondence} />
        <Stack.Screen name="CorrespondenceEmpty" component={CorrespondenceEmpty} />
        <Stack.Screen name="SalonGate" component={SalonGate} />
        <Stack.Screen name="SalonRooms" component={SalonRooms} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
