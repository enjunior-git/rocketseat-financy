import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { TransactionModel } from "./transaction.model.js";

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  description!: string;

  @Field(() => String)
  icon!: string;

  @Field(() => String)
  colour!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => [TransactionModel], { nullable: true })
  transactions?: TransactionModel[] | null;

  @Field(() => Number)
  transactionsAmount?: number;

  @Field(() => Number)
  totalExpensesAmount?: number;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
