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
  ImageWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  ItemWhereUniqueInput: { // input type
    id?: number | null; // Int
    name?: string | null; // String
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
  ImageWhereUniqueInput: NexusGenInputs['ImageWhereUniqueInput'];
  ItemWhereUniqueInput: NexusGenInputs['ItemWhereUniqueInput'];
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
  Image: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    item: NexusGenRootTypes['Item'] | null; // Item
    itemId: number | null; // Int
    src: string; // String!
  }
  Item: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    images: NexusGenRootTypes['Image'][]; // [Image!]!
    mainImage: string; // String!
    name: string; // String!
    order: NexusGenRootTypes['Order'][]; // [Order!]!
    partner: NexusGenRootTypes['Partner'] | null; // Partner
    partnerId: number | null; // Int
    price: number; // Int!
    published: boolean; // Boolean!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Mutation: { // field return type
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
    updateItem: NexusGenRootTypes['Item'] | null; // Item
    uploadImage: NexusGenRootTypes['Image'] | null; // Image
    userCancelOrder: NexusGenRootTypes['Order']; // Order!
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
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    orders: NexusGenRootTypes['Order'][]; // [Order!]!
    sns: NexusGenEnums['SnsLogin']; // SnsLogin!
  }
}

export interface NexusGenArgTypes {
  Item: {
    images: { // args
      after?: NexusGenInputs['ImageWhereUniqueInput'] | null; // ImageWhereUniqueInput
      before?: NexusGenInputs['ImageWhereUniqueInput'] | null; // ImageWhereUniqueInput
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
    confirmationOrder: { // args
      orderId: number; // Int!
    }
    createItem: { // args
      images: string[]; // [String!]!
      name: string; // String!
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
    updateItem: { // args
      id: number; // Int!
      images?: string[] | null; // [String!]
      name?: string | null; // String
      price?: number | null; // Int
      published?: boolean | null; // Boolean
    }
    uploadImage: { // args
      image: NexusGenScalars['Upload']; // Upload!
    }
    userCancelOrder: { // args
      orderId: number; // Int!
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

export type NexusGenObjectNames = "Image" | "Item" | "Mutation" | "Order" | "Partner" | "Query" | "User";

export type NexusGenInputNames = "ImageWhereUniqueInput" | "ItemWhereUniqueInput" | "OrderWhereUniqueInput";

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