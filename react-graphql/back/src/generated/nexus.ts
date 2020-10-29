/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as Context from "../context"
import { core } from "@nexus/schema"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    upload<FieldName extends string>(fieldName: FieldName, opts?: core.ScalarInputFieldConfig<core.GetGen3<"inputTypes", TypeName, FieldName>>): void // "Upload";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    upload<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Upload";
  }
}
declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    model: NexusPrisma<TypeName, 'model'>
    crud: any
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CartItemWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  ImageWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  ItemWhereUniqueInput: { // input type
    id?: number | null; // Int
    name?: string | null; // String
  }
  OptionItemInput: { // input type
    name: string; // String!
    price: number; // Int!
  }
  OptionItemWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  OptionWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  OptionsInput: { // input type
    optionItems: NexusGenInputs['OptionItemInput'][]; // [OptionItemInput!]!
  }
  OrderWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
}

export interface NexusGenEnums {
  ItemState: "canceled" | "confirmation" | "deliveryCompleted" | "deliveryProgress" | "receiptCompleted" | "receiving"
  SnsLogin: "em" | "fa" | "go" | "ka" | "na"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
  Upload: any
}

export interface NexusGenRootTypes {
  CartItem: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    itemId: number; // Int!
    quantity: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Image: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    itemId?: number | null; // Int
    src: string; // String!
  }
  Item: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    name: string; // String!
    partnerId?: number | null; // Int
    price: number; // Int!
    published: boolean; // Boolean!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Mutation: {};
  Option: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    itemId: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  OptionItem: { // root type
    id: number; // Int!
    name: string; // String!
    optionId: number; // Int!
    price: number; // Int!
  }
  Order: { // root type
    buyerId?: number | null; // Int
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    itemId?: number | null; // Int
    itemState: NexusGenEnums['ItemState']; // ItemState!
    partnerId?: number | null; // Int
    price: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    waybillNumber?: string | null; // String
  }
  Partner: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    profit: number; // Int!
  }
  Query: {};
  User: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    sns: NexusGenEnums['SnsLogin']; // SnsLogin!
  }
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  CartItemWhereUniqueInput: NexusGenInputs['CartItemWhereUniqueInput'];
  ImageWhereUniqueInput: NexusGenInputs['ImageWhereUniqueInput'];
  ItemWhereUniqueInput: NexusGenInputs['ItemWhereUniqueInput'];
  OptionItemInput: NexusGenInputs['OptionItemInput'];
  OptionItemWhereUniqueInput: NexusGenInputs['OptionItemWhereUniqueInput'];
  OptionWhereUniqueInput: NexusGenInputs['OptionWhereUniqueInput'];
  OptionsInput: NexusGenInputs['OptionsInput'];
  OrderWhereUniqueInput: NexusGenInputs['OrderWhereUniqueInput'];
  ItemState: NexusGenEnums['ItemState'];
  SnsLogin: NexusGenEnums['SnsLogin'];
  String: NexusGenScalars['String'];
  Int: NexusGenScalars['Int'];
  Float: NexusGenScalars['Float'];
  Boolean: NexusGenScalars['Boolean'];
  ID: NexusGenScalars['ID'];
  DateTime: NexusGenScalars['DateTime'];
  Upload: NexusGenScalars['Upload'];
}

export interface NexusGenFieldTypes {
  CartItem: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    currentOptions: NexusGenRootTypes['OptionItem'][]; // [OptionItem!]!
    id: number; // Int!
    item: NexusGenRootTypes['Item']; // Item!
    itemId: number; // Int!
    quantity: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Image: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    item: NexusGenRootTypes['Item'] | null; // Item
    itemId: number | null; // Int
    src: string; // String!
  }
  Item: { // field return type
    CartItem: NexusGenRootTypes['CartItem'][]; // [CartItem!]!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    images: NexusGenRootTypes['Image'][]; // [Image!]!
    mainImage: string; // String!
    name: string; // String!
    options: NexusGenRootTypes['Option'][]; // [Option!]!
    order: NexusGenRootTypes['Order'][]; // [Order!]!
    partner: NexusGenRootTypes['Partner'] | null; // Partner
    partnerId: number | null; // Int
    price: number; // Int!
    published: boolean; // Boolean!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Mutation: { // field return type
    addCart: NexusGenRootTypes['CartItem']; // CartItem!
    confirmationOrder: NexusGenRootTypes['Order']; // Order!
    createItem: NexusGenRootTypes['Item'] | null; // Item
    createOrder: NexusGenRootTypes['Order']; // Order!
    deleteItem: number | null; // Int
    deliveryCompletedOrder: NexusGenRootTypes['Order']; // Order!
    deliveryOrder: NexusGenRootTypes['Order']; // Order!
    partnerCancelOrder: NexusGenRootTypes['Order']; // Order!
    partnerLogin: NexusGenRootTypes['Partner']; // Partner!
    partnerLogout: boolean; // Boolean!
    partnerSignup: NexusGenRootTypes['Partner']; // Partner!
    receiveOrder: NexusGenRootTypes['Order']; // Order!
    removeCart: NexusGenRootTypes['CartItem'] | null; // CartItem
    updateItem: NexusGenRootTypes['Item'] | null; // Item
    uploadImage: NexusGenRootTypes['Image'] | null; // Image
    userCancelOrder: NexusGenRootTypes['Order']; // Order!
    userFacebookLogin: NexusGenRootTypes['User']; // User!
    userKakaoLogin: NexusGenRootTypes['User']; // User!
    userLogin: NexusGenRootTypes['User']; // User!
    userLogout: NexusGenRootTypes['User'] | null; // User
  }
  Option: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    item: NexusGenRootTypes['Item']; // Item!
    itemId: number; // Int!
    optionItems: NexusGenRootTypes['OptionItem'][]; // [OptionItem!]!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  OptionItem: { // field return type
    cartItems: NexusGenRootTypes['CartItem'][]; // [CartItem!]!
    id: number; // Int!
    name: string; // String!
    option: NexusGenRootTypes['Option']; // Option!
    optionId: number; // Int!
    price: number; // Int!
  }
  Order: { // field return type
    buyer: NexusGenRootTypes['User'] | null; // User
    buyerId: number | null; // Int
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    item: NexusGenRootTypes['Item'] | null; // Item
    itemId: number | null; // Int
    itemState: NexusGenEnums['ItemState']; // ItemState!
    partner: NexusGenRootTypes['Partner'] | null; // Partner
    partnerId: number | null; // Int
    price: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    waybillNumber: string | null; // String
  }
  Partner: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    id: number; // Int!
    items: NexusGenRootTypes['Item'][]; // [Item!]!
    name: string; // String!
    orders: NexusGenRootTypes['Order'][]; // [Order!]!
    profit: number; // Int!
  }
  Query: { // field return type
    image: NexusGenRootTypes['Image'] | null; // Image
    iPartner: NexusGenRootTypes['Partner'] | null; // Partner
    isPartnerLoggedIn: boolean; // Boolean!
    item: NexusGenRootTypes['Item'] | null; // Item
    items: NexusGenRootTypes['Item'][] | null; // [Item!]
    iUser: NexusGenRootTypes['User'] | null; // User
    myItems: NexusGenRootTypes['Item'][] | null; // [Item!]
    newOrder: NexusGenRootTypes['Order'][]; // [Order!]!
    order: NexusGenRootTypes['Order'] | null; // Order
    partner: NexusGenRootTypes['Partner'] | null; // Partner
    user: NexusGenRootTypes['User'] | null; // User
  }
  User: { // field return type
    cart: NexusGenRootTypes['CartItem'][]; // [CartItem!]!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    orders: NexusGenRootTypes['Order'][]; // [Order!]!
    sns: NexusGenEnums['SnsLogin']; // SnsLogin!
  }
}

export interface NexusGenArgTypes {
  CartItem: {
    currentOptions: { // args
      after?: NexusGenInputs['OptionItemWhereUniqueInput'] | null; // OptionItemWhereUniqueInput
      before?: NexusGenInputs['OptionItemWhereUniqueInput'] | null; // OptionItemWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Item: {
    CartItem: { // args
      after?: NexusGenInputs['CartItemWhereUniqueInput'] | null; // CartItemWhereUniqueInput
      before?: NexusGenInputs['CartItemWhereUniqueInput'] | null; // CartItemWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    images: { // args
      after?: NexusGenInputs['ImageWhereUniqueInput'] | null; // ImageWhereUniqueInput
      before?: NexusGenInputs['ImageWhereUniqueInput'] | null; // ImageWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    options: { // args
      after?: NexusGenInputs['OptionWhereUniqueInput'] | null; // OptionWhereUniqueInput
      before?: NexusGenInputs['OptionWhereUniqueInput'] | null; // OptionWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    order: { // args
      after?: NexusGenInputs['OrderWhereUniqueInput'] | null; // OrderWhereUniqueInput
      before?: NexusGenInputs['OrderWhereUniqueInput'] | null; // OrderWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Mutation: {
    addCart: { // args
      itemId: number; // Int!
      optionItemIds: number[]; // [Int!]!
      quantity: number; // Int!
    }
    confirmationOrder: { // args
      orderId: number; // Int!
    }
    createItem: { // args
      images: string[]; // [String!]!
      name: string; // String!
      options: NexusGenInputs['OptionsInput'][]; // [OptionsInput!]!
      price: number; // Int!
    }
    createOrder: { // args
      itemId: number; // Int!
      price: number; // Int!
    }
    deleteItem: { // args
      id: number; // Int!
    }
    deliveryCompletedOrder: { // args
      orderId: number; // Int!
    }
    deliveryOrder: { // args
      orderId: number; // Int!
      waybillNumber: string; // String!
    }
    partnerCancelOrder: { // args
      orderId: number; // Int!
    }
    partnerLogin: { // args
      email: string; // String!
      password: string; // String!
    }
    partnerSignup: { // args
      email: string; // String!
      name: string; // String!
      password: string; // String!
    }
    receiveOrder: { // args
      orderId: number; // Int!
    }
    removeCart: { // args
      cartItemIds: number[]; // [Int!]!
    }
    updateItem: { // args
      id: number; // Int!
      images?: number[] | null; // [Int!]
      name?: string | null; // String
      options?: NexusGenInputs['OptionsInput'][] | null; // [OptionsInput!]
      price?: number | null; // Int
      published?: boolean | null; // Boolean
    }
    uploadImage: { // args
      image: NexusGenScalars['Upload']; // Upload!
    }
    userCancelOrder: { // args
      orderId: number; // Int!
    }
    userFacebookLogin: { // args
      token: string; // String!
    }
    userKakaoLogin: { // args
      token: string; // String!
    }
    userLogin: { // args
      email: string; // String!
      password: string; // String!
    }
  }
  Option: {
    optionItems: { // args
      after?: NexusGenInputs['OptionItemWhereUniqueInput'] | null; // OptionItemWhereUniqueInput
      before?: NexusGenInputs['OptionItemWhereUniqueInput'] | null; // OptionItemWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  OptionItem: {
    cartItems: { // args
      after?: NexusGenInputs['CartItemWhereUniqueInput'] | null; // CartItemWhereUniqueInput
      before?: NexusGenInputs['CartItemWhereUniqueInput'] | null; // CartItemWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Partner: {
    items: { // args
      after?: NexusGenInputs['ItemWhereUniqueInput'] | null; // ItemWhereUniqueInput
      before?: NexusGenInputs['ItemWhereUniqueInput'] | null; // ItemWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    orders: { // args
      after?: NexusGenInputs['OrderWhereUniqueInput'] | null; // OrderWhereUniqueInput
      before?: NexusGenInputs['OrderWhereUniqueInput'] | null; // OrderWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Query: {
    image: { // args
      id: number; // Int!
    }
    item: { // args
      id: number; // Int!
    }
    order: { // args
      id: number; // Int!
    }
    partner: { // args
      id: number; // Int!
    }
    user: { // args
      id: number; // Int!
    }
  }
  User: {
    cart: { // args
      after?: NexusGenInputs['CartItemWhereUniqueInput'] | null; // CartItemWhereUniqueInput
      before?: NexusGenInputs['CartItemWhereUniqueInput'] | null; // CartItemWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    orders: { // args
      after?: NexusGenInputs['OrderWhereUniqueInput'] | null; // OrderWhereUniqueInput
      before?: NexusGenInputs['OrderWhereUniqueInput'] | null; // OrderWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "CartItem" | "Image" | "Item" | "Mutation" | "Option" | "OptionItem" | "Order" | "Partner" | "Query" | "User";

export type NexusGenInputNames = "CartItemWhereUniqueInput" | "ImageWhereUniqueInput" | "ItemWhereUniqueInput" | "OptionItemInput" | "OptionItemWhereUniqueInput" | "OptionWhereUniqueInput" | "OptionsInput" | "OrderWhereUniqueInput";

export type NexusGenEnumNames = "ItemState" | "SnsLogin";

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "DateTime" | "Float" | "ID" | "Int" | "String" | "Upload";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: Context.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}