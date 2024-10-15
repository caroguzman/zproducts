using { testproject as my } from '../db/schema.cds';

@path: '/service/testproject'
@requires: 'authenticated-user'
service testprojectSrv {
  @odata.draft.enabled
  entity Customers as projection on my.Customers;
  @odata.draft.enabled
  entity Products as projection on my.Products;
  @odata.draft.enabled
  entity Purchases as projection on my.Purchases;
  @odata.draft.enabled
  entity Redemptions as projection on my.Redemptions;
}