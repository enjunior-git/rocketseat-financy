import { Field, GraphQLISODateTime, ID, ObjectType, registerEnumType } from "type-graphql";
import { TransactionType } from "../../generated/prisma/enums.js";
import { CategoryModel } from "./category.model.js";

registerEnumType(TransactionType, {
  name: "TransactionType",
});

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  description!: string;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => Number)
  amount!: number;

  @Field(() => String)
  categoryId!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => CategoryModel, { nullable: true })
  category?: CategoryModel | null;

  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
