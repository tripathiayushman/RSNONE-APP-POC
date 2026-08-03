// Fixed navigation contract for RSN One — a single flat native-stack of all 36 screens.
// The bottom nav in the mockup is styled markup inside a screen, not a separate tab
// navigator, so screens simply navigation.navigate() between flat route names.
export type RootStackParamList = {
  Splash: undefined;
  OnboardingRegistry: undefined;
  OnboardingProvenance: undefined;
  OnboardingClub: undefined;
  SignIn: undefined;
  CreateAccount: undefined;
  Home: undefined;
  ArchiveGrid: undefined;
  ArchiveList: undefined;
  Listing: { category?: string } | undefined;
  FilterSheet: undefined;
  Search: undefined;
  SearchEmpty: undefined;
  ProductDetail: { productId: string };
  Bag: undefined;
  BagEmpty: undefined;
  CheckoutCarriage: undefined;
  CheckoutPayment: undefined;
  CheckoutReview: undefined;
  OrderConfirmed: undefined;
  Shelf: undefined;
  ShelfEmpty: undefined;
  Account: undefined;
  Membership: undefined;
  Wallet: undefined;
  Referrals: undefined;
  OrderHistory: undefined;
  OrderDetail: { orderId: string };
  Addresses: undefined;
  AddressForm: { addressId?: string } | undefined;
  PaymentMethods: undefined;
  Correspondence: undefined;
  CorrespondenceEmpty: undefined;
  SalonGate: undefined;
  SalonRooms: undefined;
  Settings: undefined;
};
