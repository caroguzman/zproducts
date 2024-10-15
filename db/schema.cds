namespace testproject;
using { cuid } from '@sap/cds/common';

entity Customers : cuid {
  name: String;
  email: String;
  customerNumber: Integer;
  totalPurchaseValue: Integer;
  totalRewardPoints: Integer;
  totalRedeemedRewardPoints: Integer;
}

entity Products : cuid {
  name: String;
  description: String;
  price: Integer;
}

entity Purchases : cuid {
  purchaseValue: Integer;
  rewardPoints: Integer;
  selectedProduct: Association to Products;
  customer: Association to Customers;
}

entity Redemptions : cuid {
  redeemedAmount: Integer;
  customer: Association to Customers;
}

