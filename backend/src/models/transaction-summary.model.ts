import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class CategoryTransactionSummaryModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  colour!: string;

  @Field(() => Number)
  transactionsAmount!: number;

  @Field(() => Number)
  totalExpensesAmount!: number;
}

@ObjectType()
export class TransactionSummaryModel {
  @Field(() => Number)
  totalIncomeMonthly!: number;

  @Field(() => Number)
  totalExpensesMonthly!: number;

  @Field(() => Number)
  totalBalance!: number;

  @Field(() => [CategoryTransactionSummaryModel])
  categories!: CategoryTransactionSummaryModel[];

  @Field(() => Number)
  totalCategoriesAmount!: number;

  @Field(() => Number)
  totalTransactionsAmount!: number;

  @Field(() => CategoryTransactionSummaryModel, { nullable: true })
  mostUsedCategory!: CategoryTransactionSummaryModel | null;
}
