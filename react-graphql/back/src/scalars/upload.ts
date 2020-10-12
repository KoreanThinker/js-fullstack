import { asNexusMethod, scalarType } from "@nexus/schema";
import { GraphQLUpload } from "apollo-server-express";
import { GraphQLScalarType } from "graphql";

export const Upload = asNexusMethod(GraphQLUpload as GraphQLScalarType, 'upload')